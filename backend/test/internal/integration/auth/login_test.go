package auth_test

import (
	"context"
	"encoding/json"
	"finaway/internal/helper"
	"finaway/test/helpertest"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type loginData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var testUser = loginData{
	Email:    "johndoe@test.com",
	Password: "secret",
}

func InsertTestUser(db *mongo.Database) string {
	pwdHash, _ := helper.HashPassword(testUser.Password)
	user, _ := db.Collection("users").InsertOne(
		context.Background(),
		map[string]string{
			"email":    testUser.Email,
			"password": pwdHash,
		},
	)

	return user.InsertedID.(primitive.ObjectID).Hex()
}

func TestLogin_Successful(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	insertedID := InsertTestUser(db)

	jsonBody, _ := json.Marshal(testUser)
	body := strings.NewReader(string(jsonBody))
	request := httptest.NewRequest(http.MethodPost, "/api/auth/login", body)
	request.Header.Add("Content-Type", "application/json")

	resp, err := router.Test(request)
	helper.PanicIfError(err)

	webResp := helpertest.ReadBody(resp)

	assert.Equal(t, http.StatusOK, resp.StatusCode)
	assert.Equal(t, insertedID, webResp.Data.(map[string]interface{})["user"].(map[string]interface{})["_id"])
	assert.Equal(t, testUser.Email, webResp.Data.(map[string]interface{})["user"].(map[string]interface{})["email"])

	assert.Contains(t, webResp.Data, "access_token")
	assert.Contains(t, webResp.Data, "refresh_token")

	accessToken := webResp.Data.(map[string]interface{})["access_token"].(string)
	refreshToken := webResp.Data.(map[string]interface{})["refresh_token"].(string)

	accessTokenPayload, _ := helper.Verify(accessToken)
	refreshTokenPayload, _ := helper.Verify(refreshToken)

	assert.True(t, helper.IsAccessToken(accessTokenPayload))
	assert.True(t, helper.IsRefreshToken(refreshTokenPayload))

	assert.Equal(t, insertedID, accessTokenPayload.ID)
	assert.Equal(t, insertedID, refreshTokenPayload.ID)
}

func TestLogin_ValidationError(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	InsertTestUser(db)

	tests := []struct {
		Message        string
		Email          string
		Password       string
		ShouldContains []string
	}{
		{
			Message:        "empty email",
			Email:          "",
			Password:       testUser.Password,
			ShouldContains: []string{"email"},
		},
		{
			Message:        "empty password",
			Email:          testUser.Email,
			Password:       "",
			ShouldContains: []string{"password"},
		},
		{
			Message:        "empty email & password",
			Email:          "",
			Password:       "",
			ShouldContains: []string{"email", "password"},
		},
		{
			Message:        "invalid email format",
			Email:          "wrongemail",
			Password:       testUser.Password,
			ShouldContains: []string{"email"},
		},
		{
			Message:        "wrong password",
			Email:          testUser.Email,
			Password:       "wrong",
			ShouldContains: []string{"email"},
		},
	}

	for _, test := range tests {
		t.Run(test.Message, func(t *testing.T) {
			jsonBody, _ := json.Marshal(map[string]string{
				"email":    test.Email,
				"password": test.Password,
			})
			body := strings.NewReader(string(jsonBody))
			request := httptest.NewRequest(http.MethodPost, "/api/auth/login", body)
			request.Header.Add("Content-Type", "application/json")

			resp, err := router.Test(request)
			helper.PanicIfError(err)

			webResp := helpertest.ReadBody(resp)

			assert.Equal(t, http.StatusBadRequest, resp.StatusCode)

			for _, errKey := range test.ShouldContains {
				assert.Contains(t, webResp.Errors, errKey)
			}
		})
	}
}

func TestLogin_TooManyRequest(t *testing.T) {
	// TODO: add test
}
