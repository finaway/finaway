package auth_test

import (
	"encoding/json"
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"finaway/test/datatest"
	"finaway/test/helpertest"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLogin_Successful(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	wg := sync.WaitGroup{}

	for _, user := range datatest.Users {
		wg.Add(1)
		go func(user domain.User) {
			defer wg.Done()

			jsonBody, _ := json.Marshal(map[string]string{
				"email":    user.Email,
				"password": strings.ToLower(user.Name),
			})
			body := strings.NewReader(string(jsonBody))
			request := httptest.NewRequest(http.MethodPost, "/api/auth/login", body)
			request.Header.Add("Content-Type", "application/json")

			resp, err := router.Test(request)
			helper.PanicIfError(err)

			webResp := helpertest.ReadBody(resp)

			assert.Equal(t, http.StatusOK, resp.StatusCode)
			assert.Equal(t, user.ID.Hex(), webResp.Data.(map[string]interface{})["user"].(map[string]interface{})["_id"])
			assert.Equal(t, user.Email, webResp.Data.(map[string]interface{})["user"].(map[string]interface{})["email"])

			assert.Contains(t, webResp.Data, "access_token")
			assert.Contains(t, webResp.Data, "refresh_token")

			accessToken := webResp.Data.(map[string]interface{})["access_token"].(string)
			refreshToken := webResp.Data.(map[string]interface{})["refresh_token"].(string)

			accessTokenPayload, _ := helper.Verify(accessToken)
			refreshTokenPayload, _ := helper.Verify(refreshToken)

			assert.True(t, helper.IsAccessToken(accessTokenPayload))
			assert.True(t, helper.IsRefreshToken(refreshTokenPayload))

			assert.Equal(t, user.ID, accessTokenPayload.ID)
			assert.Equal(t, user.ID, refreshTokenPayload.ID)
		}(user)
	}

	wg.Wait()
}

func TestLogin_ValidationError(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	testUser := datatest.Users[0]

	type testSample struct {
		message        string
		email          string
		password       string
		shouldContains []string
	}

	tests := []testSample{
		{
			message:        "empty email",
			email:          "",
			password:       strings.ToLower(testUser.Name),
			shouldContains: []string{"email"},
		},
		{
			message:        "empty password",
			email:          testUser.Email,
			password:       "",
			shouldContains: []string{"password"},
		},
		{
			message:        "empty email & password",
			email:          "",
			password:       "",
			shouldContains: []string{"email", "password"},
		},
		{
			message:        "invalid email format",
			email:          "wrongemail",
			password:       strings.ToLower(testUser.Name),
			shouldContains: []string{"email"},
		},
		{
			message:        "wrong password",
			email:          testUser.Email,
			password:       "wrong",
			shouldContains: []string{"email"},
		},
	}

	wg := sync.WaitGroup{}

	for _, test := range tests {
		wg.Add(1)
		go func(test testSample) {
			defer wg.Done()
			t.Run(test.message, func(t *testing.T) {
				jsonBody, _ := json.Marshal(map[string]string{
					"email":    test.email,
					"password": strings.ToLower(test.password),
				})
				body := strings.NewReader(string(jsonBody))
				request := httptest.NewRequest(http.MethodPost, "/api/auth/login", body)
				request.Header.Add("Content-Type", "application/json")

				resp, err := router.Test(request)
				helper.PanicIfError(err)

				webResp := helpertest.ReadBody(resp)

				assert.Equal(t, http.StatusBadRequest, resp.StatusCode)

				for _, errKey := range test.shouldContains {
					assert.Contains(t, webResp.Errors, errKey)
				}
			})
		}(test)
	}

	wg.Wait()
}

func TestLogin_TooManyRequest(t *testing.T) {
	// TODO: add test
}
