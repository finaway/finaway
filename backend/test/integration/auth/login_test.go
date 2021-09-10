package auth_test

import (
	"encoding/json"
	"finaway/internal/model/domain"
	"finaway/internal/util/errorutil"
	"finaway/internal/util/jwtutil"
	"finaway/test/datatest"
	"finaway/test/helpertest"
	"fmt"
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
	users := datatest.GetUsers()

	for _, user := range users {
		wg.Add(1)
		go func(t *testing.T, user domain.User) {
			var primaryEmail string

			for _, email := range user.Emails {
				if email.IsPrimary {
					primaryEmail = email.Email
				}
			}

			t.Run(fmt.Sprintf("login with email %s", primaryEmail), func(t *testing.T) {
				defer wg.Done()
				jsonBody, _ := json.Marshal(map[string]string{
					"email":    primaryEmail,
					"password": strings.ToLower(user.Name),
				})
				body := strings.NewReader(string(jsonBody))
				request := httptest.NewRequest(http.MethodPost, "/api/auth/login", body)
				request.Header.Add("Content-Type", "application/json")

				resp, err := router.Test(request)
				errorutil.PanicIfError(err)

				webResp := helpertest.ReadBody(resp)

				assert.Equal(t, http.StatusOK, resp.StatusCode)
				assert.Equal(t, user.ID, webResp.Data.(map[string]interface{})["user"].(map[string]interface{})["id"])
				assert.Equal(t, primaryEmail, webResp.Data.(map[string]interface{})["user"].(map[string]interface{})["email"])

				assert.Contains(t, webResp.Data, "access_token")
				assert.Contains(t, webResp.Data, "refresh_token")

				accessToken := webResp.Data.(map[string]interface{})["access_token"].(string)
				refreshToken := webResp.Data.(map[string]interface{})["refresh_token"].(string)

				accessTokenPayload, _ := jwtutil.Verify(accessToken)
				refreshTokenPayload, _ := jwtutil.Verify(refreshToken)

				assert.True(t, accessTokenPayload.IsAccessToken())
				assert.True(t, refreshTokenPayload.IsRefreshToken())

				assert.Equal(t, user.ID, accessTokenPayload.UserID)
				assert.Equal(t, user.ID, refreshTokenPayload.UserID)
			})
		}(t, user)
	}

	wg.Wait()
}

func TestLogin_ValidationError(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	user := datatest.GetUsers()[0]
	var primaryEmail string

	for _, email := range user.Emails {
		if email.IsPrimary {
			primaryEmail = email.Email
		}
	}

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
			password:       strings.ToLower(user.Name),
			shouldContains: []string{"email"},
		},
		{
			message:        "empty password",
			email:          primaryEmail,
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
			password:       strings.ToLower(user.Name),
			shouldContains: []string{"email"},
		},
		{
			message:        "wrong password",
			email:          primaryEmail,
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
				errorutil.PanicIfError(err)

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
