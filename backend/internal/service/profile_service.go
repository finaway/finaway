package service

import (
	"context"
	"finaway/internal/model/web"
)

type ProfileService interface {
	Me(ctx context.Context, userID string) web.ProfileDetailResponse
}
