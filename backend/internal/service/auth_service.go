package service

import (
	"context"
	"finaway/internal/exception"
	"finaway/internal/model/domain"
	"finaway/internal/model/web"
	"finaway/internal/repository"
	"finaway/internal/util/errorutil"
	"finaway/internal/util/jwtutil"
	"finaway/internal/util/password"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type AuthService struct {
	db *gorm.DB
	v  *validator.Validate
	rp *repository.Repository
}

func NewAuthService(db *gorm.DB, v *validator.Validate, rp *repository.Repository) *AuthService {
	return &AuthService{
		db: db,
		v:  v,
		rp: rp,
	}
}

func (sv *AuthService) Login(ctx context.Context, r web.LoginRequest) web.LoginResponse {
	err := sv.v.Struct(r)
	errorutil.PanicIfError(err)

	errInvalidCredentials := exception.NewBadRequestError(
		web.ResponseErrors{"email": web.ResponseError{Message: "Invalid email or password"}},
	)

	e, err := sv.rp.EmailRepository.FindPrimaryByEmail(ctx, r.Email)
	if err != nil {
		panic(errInvalidCredentials)
	}

	u, err := sv.rp.UserRepository.FindById(ctx, e.UserID)
	if err != nil {
		panic(errInvalidCredentials)
	}

	if validPwd := password.CheckHash(r.Password, u.Password); !validPwd {
		panic(errInvalidCredentials)
	}

	accessToken := jwtutil.GenerateAccessToken(u.ID)
	refreshToken := jwtutil.GenerateRefreshToken(u.ID)

	return web.LoginResponse{
		User: web.UserDetailResponse{
			ID:           u.ID,
			Name:         u.Name,
			Email:        e.Email,
			IsVerified:   e.VerifiedAt.Valid,
			ProfilePhoto: u.ProfilePhoto,
			CreatedAt:    u.CreatedAt,
			UpdatedAt:    u.UpdatedAt,
		},
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}
}

func (sv *AuthService) Logout(ctx context.Context, r web.LogoutRequest) web.LogoutResponse {
	err := sv.v.Struct(r)
	errorutil.PanicIfError(err)

	_, err = jwtutil.Verify(r.RefreshToken)

	// Ignore invalid token & token expiration
	if err != nil {
		return web.LogoutResponse{}
	}

	_, err = sv.rp.BlacklistedTokenRepository.FindByToken(ctx, r.RefreshToken)

	// If record not found
	if err == nil {
		sv.rp.BlacklistedTokenRepository.Save(ctx, sv.db, domain.BlacklistedToken{Token: r.RefreshToken})
	}

	return web.LogoutResponse{}
}

func (sv *AuthService) RefreshToken(ctx context.Context, req web.RefreshTokenRequest) web.RefreshTokenResponse {
	err := sv.v.Struct(req)
	errorutil.PanicIfError(err)

	errInvalidRefreshToken := exception.NewBadRequestError(
		web.ResponseErrors{"refresh_token": web.ResponseError{Message: "Invalid refresh token"}},
	)

	p, err := jwtutil.Verify(req.RefreshToken)
	if err != nil || !p.IsRefreshToken() {
		panic(errInvalidRefreshToken)
	}

	// TODO: optimize this query
	u, err := sv.rp.UserRepository.FindById(ctx, p.UserID)
	if err != nil {
		panic(errInvalidRefreshToken)
	}

	// TODO: optimize this query
	_, err = sv.rp.BlacklistedTokenRepository.FindByToken(ctx, req.RefreshToken)
	// Refresh token should not be blacklisted
	if err == nil {
		panic(errInvalidRefreshToken)
	}

	newAccessToken := jwtutil.GenerateAccessToken(u.ID)

	return web.RefreshTokenResponse{
		AccessToken: newAccessToken,
	}
}
