package repository

import (
	"context"
	"errors"
	"finaway/internal/model/domain"
	"finaway/internal/util/errorutil"
	"fmt"

	"gorm.io/gorm"
)

type BlacklistedTokenRepository struct {
	db *gorm.DB
}

func NewBlacklistedTokenRepository(db *gorm.DB) *BlacklistedTokenRepository {
	return &BlacklistedTokenRepository{db: db}
}

func (rp *BlacklistedTokenRepository) Save(ctx context.Context, tx *gorm.DB, bt domain.BlacklistedToken) domain.BlacklistedToken {
	err := tx.WithContext(ctx).Create(&bt).Error
	errorutil.PanicIfError(err)

	return bt
}

func (rp *BlacklistedTokenRepository) FindByToken(ctx context.Context, t string) (domain.BlacklistedToken, error) {
	var bt domain.BlacklistedToken

	err := rp.db.WithContext(ctx).Where("token = ?", t).First(&bt).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return bt, fmt.Errorf("blacklisted token %s not found", t)
	} else {
		errorutil.PanicIfError(err)
	}

	return bt, nil
}
