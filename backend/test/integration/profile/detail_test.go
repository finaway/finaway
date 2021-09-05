package detail_test

import (
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"finaway/test/datatest"
	"finaway/test/helpertest"
	"fmt"
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestProfileDetail_Successful(t *testing.T) {
	db, router := helpertest.SetupTest()
	defer helpertest.Cleanup(db)

	wg := sync.WaitGroup{}
	users := datatest.GetUsers()

	for _, user := range users {
		wg.Add(1)

		go func(t *testing.T, user domain.User) {

			var primaryEmail domain.Email
			for _, email := range user.Emails {
				if email.IsPrimary {
					primaryEmail = email
				}
			}

			t.Run(fmt.Sprintf("get profile for user %s", user.Name), func(t *testing.T) {
				defer wg.Done()
				jwt := helpertest.GenerateJwt(user)

				request := httptest.NewRequest(http.MethodGet, "/api/profile", nil)
				request.Header.Add("Content-Type", "application/json")
				request.Header.Add("Authorization", fmt.Sprintf("Bearer %s", jwt.AccessToken))

				resp, err := router.Test(request)
				helper.PanicIfError(err)

				webResp := helpertest.ReadBody(resp)

				assert.Equal(t, http.StatusOK, resp.StatusCode)
				assert.Equal(t, user.ID, webResp.Data.(map[string]interface{})["id"])
				assert.Equal(t, user.Name, webResp.Data.(map[string]interface{})["name"])
				assert.Equal(t, primaryEmail.Email, webResp.Data.(map[string]interface{})["email"])

				assert.Contains(t, webResp.Data.(map[string]interface{}), "is_verified")
				assert.Contains(t, webResp.Data.(map[string]interface{}), "profile_photo")
				assert.Contains(t, webResp.Data.(map[string]interface{}), "created_at")
				assert.Contains(t, webResp.Data.(map[string]interface{}), "updated_at")
			})
		}(t, user)
	}

	wg.Wait()
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
