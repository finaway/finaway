package repository

import "gorm.io/gorm"

type Repository struct {
	EmailRepository EmailRepository
	UserRepository  UserRepository
}

func New(db *gorm.DB) *Repository {
	return &Repository{
		EmailRepository: NewEmailRepository(db),
		UserRepository:  NewUserRepository(db),
	}
}
