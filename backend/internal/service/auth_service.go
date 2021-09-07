package service

import (
	"context"
	"finaway/internal/model/web"
)

type AuthService interface {
	Login(ctx context.Context, req web.LoginRequest) web.LoginResponse
	Logout(ctx context.Context, req web.LogoutRequest) web.LogoutResponse
	RefreshToken(ctx context.Context, req web.RefreshTokenRequest) web.RefreshTokenResponse
}
