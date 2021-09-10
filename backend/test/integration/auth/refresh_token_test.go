package auth_test

import (
	"encoding/json"
	"finaway/internal/model/domain"
	"finaway/internal/util/errorutil"
	"finaway/test/datatest"
	"finaway/test/helpertest"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRefreshToken_Success(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	user := datatest.GetUsers()[0]
	token := helpertest.GenerateJwt(user.ID)

	jsonBody, _ := json.Marshal(map[string]string{
		"refresh_token": token.RefreshToken,
	})
	body := strings.NewReader(string(jsonBody))
	request := httptest.NewRequest(http.MethodPost, "/api/auth/refresh-token", body)
	request.Header.Add("Content-Type", "application/json")

	resp, err := router.Test(request)
	errorutil.PanicIfError(err)

	webResp := helpertest.ReadBody(resp)

	assert.Equal(t, http.StatusOK, resp.StatusCode)
	assert.Contains(t, webResp.Data, "access_token")
}

func TestRefreshToken_Fail(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	user := datatest.GetUsers()[0]
	token := helpertest.GenerateJwt(user.ID)
	expiredToken := helpertest.GenerateExpiredJwt(user.ID)

	blacklistedToken := domain.BlacklistedToken{Token: helpertest.GenerateJwt(user.ID).RefreshToken}
	err := db.Create(&blacklistedToken).Error
	errorutil.PanicIfError(err)

	tests := []struct {
		name  string
		token string
	}{
		{"should error if refresh token is empty", ""},
		{"should error if refresh token is incorrect", "incorrect-token"},

		{"should error if refresh token is expired", expiredToken.RefreshToken},
		{"should error if using blacklisted refresh token", blacklistedToken.Token},

		{"should error if using access token", token.AccessToken},
		{"should error if using expired access token", expiredToken.AccessToken},
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
				request := httptest.NewRequest(http.MethodPost, "/api/auth/refresh-token", body)
				request.Header.Add("Content-Type", "application/json")

				resp, err := router.Test(request)
				errorutil.PanicIfError(err)

				webResp := helpertest.ReadBody(resp)

				assert.Equal(t, http.StatusBadRequest, resp.StatusCode)
				assert.Contains(t, webResp.Errors, "refresh_token")
			})
		}(test)
	}

	wg.Wait()
}

func TestRefreshToken_TooManyRequest(t *testing.T) {
	// TODO: write test
}
