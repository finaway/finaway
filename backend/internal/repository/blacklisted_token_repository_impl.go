package repository

import (
	"context"
	"errors"
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"fmt"

	"gorm.io/gorm"
)

type blacklistedTokenRepository struct {
	db *gorm.DB
}

func NewBlacklistedTokenRepository(db *gorm.DB) BlacklistedTokenRepository {
	return &blacklistedTokenRepository{db: db}
}

func (repo *blacklistedTokenRepository) Save(ctx context.Context, tx *gorm.DB, blacklistedToken domain.BlacklistedToken) domain.BlacklistedToken {
	err := tx.WithContext(ctx).Create(&blacklistedToken).Error
	helper.PanicIfError(err)

	return blacklistedToken
}

func (repo *blacklistedTokenRepository) FindByToken(ctx context.Context, token string) (domain.BlacklistedToken, error) {
	var blacklistedToken domain.BlacklistedToken

	err := repo.db.WithContext(ctx).Where("token = ?", token).First(&blacklistedToken).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return blacklistedToken, fmt.Errorf("blacklisted token %s not found", token)
	} else {
		helper.PanicIfError(err)
	}

	return blacklistedToken, nil
}
