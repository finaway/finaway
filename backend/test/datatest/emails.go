package datatest

import (
	"encoding/json"
	"finaway/internal/model/domain"
	"finaway/internal/util/errorutil"
	"finaway/test/helpertest"
	"io/ioutil"
	"path"
)

func GetEmails() []domain.Email {
	var emails []domain.Email

	filePath := path.Join(helpertest.GetMainDir(), "fixtures/emails.json")
	fx, err := ioutil.ReadFile(filePath)
	errorutil.PanicIfError(err)

	err = json.Unmarshal([]byte(fx), &emails)
	errorutil.PanicIfError(err)

	return emails
}
