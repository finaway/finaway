package service

import (
	"finaway/internal/repository"
	"finaway/internal/util/mailer"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type Service struct {
	AuthService    *AuthService
	ProfileService *ProfileService
}

func New(db *gorm.DB, v *validator.Validate, m mailer.IMailer, rp *repository.Repository) *Service {
	return &Service{
		AuthService:    NewAuthService(db, v, m, rp),
		ProfileService: NewProfileService(db, v, m, rp),
	}
}
