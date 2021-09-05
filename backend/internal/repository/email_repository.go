package repository

import (
	"context"
	"finaway/internal/model/domain"
)

type EmailRepository interface {
	FindPrimaryByUserID(ctx context.Context, userID string) (domain.Email, error)
	FindPrimaryByEmail(ctx context.Context, email string) (domain.Email, error)
}
