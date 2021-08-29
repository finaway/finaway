package detail_test

import (
	"context"
	"finaway/internal/helper"
	"finaway/internal/repository"
	"finaway/test/helpertest"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var testUser = struct {
	Email    string
	Password string
}{
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

func TestProfileDetail_Successful(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	insertedID := InsertTestUser(db)
	userObjID, _ := primitive.ObjectIDFromHex(insertedID)

	userRepo := repository.NewUserRepository(db)
	var accessToken string

	user, err := userRepo.FindOneById(context.Background(), userObjID)
	helper.PanicIfError(err)

	accessToken = helper.GenerateAccessToken(user)

	request := httptest.NewRequest(http.MethodGet, "/api/profile", nil)
	request.Header.Add("Content-Type", "application/json")
	request.Header.Add("Authorization", fmt.Sprintf("Bearer %s", accessToken))

	resp, err := router.Test(request)
	helper.PanicIfError(err)

	webResp := helpertest.ReadBody(resp)

	assert.Equal(t, http.StatusOK, resp.StatusCode)
	assert.Equal(t, insertedID, webResp.Data.(map[string]interface{})["_id"])
	assert.Equal(t, testUser.Email, webResp.Data.(map[string]interface{})["email"])
}

func TestProfileDetail_Unauthorized(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	request := httptest.NewRequest(http.MethodGet, "/api/profile", nil)
	request.Header.Add("Content-Type", "application/json")

	resp, err := router.Test(request)
	helper.PanicIfError(err)

	webResp := helpertest.ReadBody(resp)

	assert.Equal(t, http.StatusUnauthorized, webResp.Code)
}

func TestProfileDetail_TooManyRequest(t *testing.T) {
	// TODO: add test
}
