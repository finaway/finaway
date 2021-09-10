package datatest

import (
	"encoding/json"
	"finaway/internal/model/domain"
	"finaway/internal/util/errorutil"
	"finaway/test/helpertest"
	"io/ioutil"
	"path"
)

func GetUsers() []domain.User {
	filePath := path.Join(helpertest.GetMainDir(), "fixtures/users.json")
	fx, err := ioutil.ReadFile(filePath)
	errorutil.PanicIfError(err)

	var users []domain.User
	err = json.Unmarshal([]byte(fx), &users)
	errorutil.PanicIfError(err)

	emails := GetEmails()
	for i, user := range users {
		for _, email := range emails {
			if user.ID == email.UserID {
				users[i].Emails = append(users[i].Emails, email)
			}
		}
	}

	return users
}

func GetVerifiedUsers() []domain.User {
	users := GetUsers()
	var verifiedUsers []domain.User

	for _, user := range users {
		verified := false

		for _, email := range user.Emails {
			if email.VerifiedAt.Valid {
				verified = true
			}
		}

		if verified {
			verifiedUsers = append(verifiedUsers, user)
		}
	}

	return verifiedUsers
}

func GetUnverifiedUsers() []domain.User {
	users := GetUsers()
	var unverifiedUsers []domain.User

	for _, user := range users {
		verified := false

		for _, email := range user.Emails {
			if email.VerifiedAt.Valid {
				verified = true
			}
		}

		if !verified {
			unverifiedUsers = append(unverifiedUsers, user)
		}
	}

	return unverifiedUsers
}
