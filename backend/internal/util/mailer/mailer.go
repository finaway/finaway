package mailer

import (
	"finaway/config"
	"finaway/internal/util/errorutil"

	"gopkg.in/gomail.v2"
)

type IMailer interface {
	Send(EmailSender)
}

type Mailer struct {
	d *gomail.Dialer
}

func New() *Mailer {
	d := gomail.NewDialer(
		config.MAIL_HOST,
		config.MAIL_PORT,
		config.MAIL_USERNAME,
		config.MAIL_PASSWORD,
	)

	return &Mailer{d}
}

type EmailSender interface {
	Message() *gomail.Message
}

func (m *Mailer) Send(e EmailSender) {
	err := m.d.DialAndSend(e.Message())
	errorutil.PanicIfError(err)
}
