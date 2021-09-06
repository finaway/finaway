package repository

import "gorm.io/gorm"

type Repository struct {
	BlacklistedTokenRepository BlacklistedTokenRepository
	EmailRepository            EmailRepository
	UserRepository             UserRepository
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		BlacklistedTokenRepository: NewBlacklistedTokenRepository(db),
		EmailRepository:            NewEmailRepository(db),
		UserRepository:             NewUserRepository(db),
	}
}
