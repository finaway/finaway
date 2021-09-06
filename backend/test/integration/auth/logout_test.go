package auth_test

import (
	"encoding/json"
	"finaway/internal/helper"
	"finaway/test/datatest"
	"finaway/test/helpertest"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAuthLogout_Success(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	user := datatest.GetUsers()[0]

	token := helpertest.GenerateJwt(user)
	expiredToken := helpertest.GenerateExpiredJwt(user)

	tests := []struct {
		name  string
		token string
	}{
		{"should success if token is correct", token.RefreshToken},
		{"should success if token is expired", expiredToken.RefreshToken},
		{"should success if token is invalid", "invalid-token"},
	}

	wg := sync.WaitGroup{}
	wg.Add(len(tests))

	for _, test := range tests {
		go func(test struct {
			name  string
			token string
		}) {
			t.Run(test.name, func(t *testing.T) {
				defer wg.Done()

				jsonBody, _ := json.Marshal(map[string]string{
					"refresh_token": test.token,
				})
				body := strings.NewReader(string(jsonBody))
				request := httptest.NewRequest(http.MethodPost, "/api/auth/logout", body)
				request.Header.Add("Content-Type", "application/json")

				resp, err := router.Test(request)
				helper.PanicIfError(err)

				assert.Equal(t, http.StatusOK, resp.StatusCode)
			})
		}(test)
	}

	wg.Wait()
}

func TestAuthLogout_Failure(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	tests := []struct {
		name  string
		token string
	}{
		{"should error if refresh token is empty", ""},
	}

	wg := sync.WaitGroup{}
	wg.Add(len(tests))

	for _, test := range tests {
		go func(test struct {
			name  string
			token string
		}) {
			t.Run(test.name, func(t *testing.T) {
				defer wg.Done()

				jsonBody, _ := json.Marshal(map[string]string{
					"refresh_token": test.token,
				})
				body := strings.NewReader(string(jsonBody))
				request := httptest.NewRequest(http.MethodPost, "/api/auth/logout", body)
				request.Header.Add("Content-Type", "application/json")

				resp, err := router.Test(request)
				helper.PanicIfError(err)

				webResp := helpertest.ReadBody(resp)

				assert.Equal(t, http.StatusBadRequest, resp.StatusCode)
				assert.Contains(t, webResp.Errors, "refresh_token")
			})
		}(test)
	}

	wg.Wait()
}

func TestAuthLogout_TooManyRequest(t *testing.T) {

}
