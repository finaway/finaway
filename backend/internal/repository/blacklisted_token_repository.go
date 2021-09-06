package repository

import (
	"context"
	"finaway/internal/model/domain"

	"gorm.io/gorm"
)

type BlacklistedTokenRepository interface {
	Save(ctx context.Context, tx *gorm.DB, blacklistedToken domain.BlacklistedToken) domain.BlacklistedToken

	FindByToken(ctx context.Context, token string) (domain.BlacklistedToken, error)
}
