package mailer

type MailerMock struct {
}

func NewMock() *MailerMock {
	return &MailerMock{}
}

func (m *MailerMock) Send(e EmailSender) {
	e.Message()
}
