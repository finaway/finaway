package service

import (
	"finaway/internal/repository"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type Service struct {
	AuthService    *AuthService
	ProfileService *ProfileService
}

func New(db *gorm.DB, validate *validator.Validate, repo *repository.Repository) *Service {
	return &Service{
		AuthService:    NewAuthService(db, validate, repo),
		ProfileService: NewProfileService(db, validate, repo),
	}
}
