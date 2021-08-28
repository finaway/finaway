package service

import (
	"context"
	"finaway/internal/model/domain"
)

type ProfileService interface {
	Me(ctx context.Context, user domain.User) domain.User
}
