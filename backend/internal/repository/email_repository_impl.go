package repository

import (
	"context"
	"errors"
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"fmt"

	"gorm.io/gorm"
)

type emailRepository struct {
	db *gorm.DB
}

func NewEmailRepository(db *gorm.DB) EmailRepository {
	return &emailRepository{db}
}

func (repo *emailRepository) FindPrimaryByUserID(ctx context.Context, userID string) (domain.Email, error) {
	var email domain.Email

	err := repo.db.WithContext(ctx).Where("user_id = ? and is_primary = true", userID).First(&email).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return email, fmt.Errorf("email with user_id %s not found", userID)
	} else {
		helper.PanicIfError(err)
	}

	return email, nil
}

func (repo *emailRepository) FindPrimaryByEmail(ctx context.Context, email string) (domain.Email, error) {
	var emailModel domain.Email

	err := repo.db.WithContext(ctx).Where("email = ? and is_primary = true", email).First(&emailModel).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return emailModel, fmt.Errorf("email %s not found", email)
	} else {
		helper.PanicIfError(err)
	}

	return emailModel, nil
}
