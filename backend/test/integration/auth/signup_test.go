package auth_test

import (
	"encoding/json"
	"finaway/internal/model/domain"
	"finaway/internal/util/errorutil"
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

func TestSignup_UnregisteredEmails(t *testing.T) {
	testutil := helpertest.New()
	defer testutil.Cleanup()

	tests := []struct {
		name     string
		email    string
		password string
	}{
		{"User One", "userone@test.com", "user one"},
		{"User Two", "usertwo@test.com", "user two"},
		{"User Three", "userthree@test.com", "user three"},
	}

	wg := sync.WaitGroup{}
	wg.Add(len(tests))

	for _, test := range tests {
		go func(test struct {
			name     string
			email    string
			password string
		}) {
			t.Run(fmt.Sprintf("should success with email %s", test.name), func(t *testing.T) {
				defer wg.Done()

				jsonBody, _ := json.Marshal(map[string]string{
					"name":     test.name,
					"email":    test.email,
					"password": test.password,
				})
				body := strings.NewReader(string(jsonBody))
				request := httptest.NewRequest(http.MethodPost, "/api/auth/signup", body)
				request.Header.Add("Content-Type", "application/json")

				resp, err := testutil.Router.Test(request)
				errorutil.PanicIfError(err)

				webResp := helpertest.ReadBody(resp)

				assert.Equal(t, http.StatusOK, resp.StatusCode)

				assert.Contains(t, webResp.Data, "user")
				assert.Contains(t, webResp.Data, "access_token")
				assert.Contains(t, webResp.Data, "refresh_token")

				assert.Equal(t, test.name, webResp.Data.(map[string]interface{})["user"].(map[string]interface{})["name"])
				assert.Equal(t, test.email, webResp.Data.(map[string]interface{})["user"].(map[string]interface{})["email"])
			})
		}(test)
	}

	wg.Wait()
}

func TestSignup_SecondaryEmailAlreadyTaken(t *testing.T) {
	testutil := helpertest.New()
	defer testutil.Cleanup()

	users := datatest.GetUsers()
	var secondaryEmails []string

	for _, u := range users {
		for _, e := range u.Emails {
			if !e.IsPrimary {
				secondaryEmails = append(secondaryEmails, e.Email)
			}
		}
	}

	wg := sync.WaitGroup{}
	wg.Add(len(secondaryEmails))

	for _, email := range secondaryEmails {
		go func(email string) {
			t.Run(fmt.Sprintf("should failure with email %s", email), func(t *testing.T) {
				defer wg.Done()

				jsonBody, _ := json.Marshal(map[string]string{
					"name":     "Test User",
					"email":    email,
					"password": "test user",
				})
				body := strings.NewReader(string(jsonBody))
				request := httptest.NewRequest(http.MethodPost, "/api/auth/signup", body)
				request.Header.Add("Content-Type", "application/json")

				resp, err := testutil.Router.Test(request)
				errorutil.PanicIfError(err)

				assert.Equal(t, http.StatusOK, resp.StatusCode)
			})
		}(email)
	}

	wg.Wait()
}

func TestSignup_PrimaryEmailAlreadyTaken(t *testing.T) {
	testutil := helpertest.New()
	defer testutil.Cleanup()

	users := datatest.GetUsers()

	wg := sync.WaitGroup{}
	wg.Add(len(users))

	for _, u := range users {
		go func(u domain.User) {
			var primaryEmail string

			for _, e := range u.Emails {
				if e.IsPrimary {
					primaryEmail = e.Email
				}
			}

			t.Run(fmt.Sprintf("should failure with email %s", primaryEmail), func(t *testing.T) {
				defer wg.Done()

				jsonBody, _ := json.Marshal(map[string]string{
					"name":     u.Name,
					"email":    primaryEmail,
					"password": strings.ToLower(u.Name),
				})
				body := strings.NewReader(string(jsonBody))
				request := httptest.NewRequest(http.MethodPost, "/api/auth/signup", body)
				request.Header.Add("Content-Type", "application/json")

				resp, err := testutil.Router.Test(request)
				errorutil.PanicIfError(err)

				webResp := helpertest.ReadBody(resp)

				assert.Equal(t, http.StatusBadRequest, resp.StatusCode)
				assert.Contains(t, webResp.Errors, "email")
			})
		}(u)
	}

	wg.Wait()
}

func TestSignup_TooManyRequest(t *testing.T) {
	// TODO: add test
}
