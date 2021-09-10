package mailer

import (
	"finaway/config"
	"finaway/internal/util/errorutil"
	"fmt"
	"html/template"
	"strings"

	"gopkg.in/gomail.v2"
)

type EmailConfirmationSender struct {
	To    string
	Name  string
	Token string
}

func (ev *EmailConfirmationSender) Message() *gomail.Message {
	tmpl, err := template.ParseFiles("../../../web/mailer/email_confirmation.html")
	errorutil.PanicIfError(err)

	var data = map[string]interface{}{
		"name": ev.Name,
		"link": fmt.Sprintf(
			"%s/%s/%s",
			strings.Trim(config.FRONTEND_URL, "/"),
			strings.Trim(config.FRONTEND_EMAIL_CONFIRMATION_PATH, "/"),
			ev.Token,
		),
	}

	var b strings.Builder
	err = tmpl.Execute(&b, data)
	errorutil.PanicIfError(err)

	m := gomail.NewMessage()
	m.SetHeader("From", config.MAIL_SENDER_NAME)
	m.SetHeader("To", ev.To)
	m.SetHeader("Subject", "Reset Password Request")
	m.SetBody("text/html", b.String())

	return m
}
