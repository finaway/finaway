package datatest

import (
	"encoding/json"
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"finaway/test/helpertest"
	"io/ioutil"
	"path"
)

func GetEmails() []domain.Email {
	var emails []domain.Email

	filePath := path.Join(helpertest.GetMainDir(), "fixtures/emails.json")
	fx, err := ioutil.ReadFile(filePath)
	helper.PanicIfError(err)

	err = json.Unmarshal([]byte(fx), &emails)
	helper.PanicIfError(err)

	return emails
}
