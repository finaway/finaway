package repository

import (
	"context"
	"finaway/internal/model/domain"
)

type UserRepository interface {
	FindById(ctx context.Context, id string) (domain.User, error)
}
