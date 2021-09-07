package service

import (
	"context"
	"finaway/internal/exception"
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"finaway/internal/model/web"
	"finaway/internal/repository"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type authService struct {
	db       *gorm.DB
	validate *validator.Validate
	repo     *repository.Repository
}

func NewAuthService(db *gorm.DB, validate *validator.Validate, repo *repository.Repository) AuthService {
	return &authService{
		db:       db,
		validate: validate,
		repo:     repo,
	}
}

func (serv *authService) Login(ctx context.Context, req web.LoginRequest) web.LoginResponse {
	err := serv.validate.Struct(req)
	helper.PanicIfError(err)

	errInvalidCredentials := exception.NewBadRequestError(
		web.ResponseErrors{"email": web.ResponseError{Message: "Invalid email or password"}},
	)

	email, err := serv.repo.EmailRepository.FindPrimaryByEmail(ctx, req.Email)
	if err != nil {
		panic(errInvalidCredentials)
	}

	user, err := serv.repo.UserRepository.FindById(ctx, email.UserID)
	if err != nil {
		panic(errInvalidCredentials)
	}

	if validPwd := helper.CheckPasswordHash(req.Password, user.Password); !validPwd {
		panic(errInvalidCredentials)
	}

	accessToken := helper.GenerateAccessToken(user)
	refreshToken := helper.GenerateRefreshToken(user)

	return web.LoginResponse{
		User: web.UserDetailResponse{
			ID:           user.ID,
			Name:         user.Name,
			Email:        email.Email,
			IsVerified:   email.VerifiedAt.Valid,
			ProfilePhoto: user.ProfilePhoto,
			CreatedAt:    user.CreatedAt,
			UpdatedAt:    user.UpdatedAt,
		},
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}
}

func (serv *authService) Logout(ctx context.Context, req web.LogoutRequest) web.LogoutResponse {
	err := serv.validate.Struct(req)
	helper.PanicIfError(err)

	_, err = helper.Verify(req.RefreshToken)

	// Ignore invalid token & token expiration
	if err != nil {
		return web.LogoutResponse{}
	}

	_, err = serv.repo.BlacklistedTokenRepository.FindByToken(ctx, req.RefreshToken)

	// If record not found
	if err == nil {
		serv.repo.BlacklistedTokenRepository.Save(ctx, serv.db, domain.BlacklistedToken{Token: req.RefreshToken})
	}

	return web.LogoutResponse{}
}

func (serv *authService) RefreshToken(ctx context.Context, req web.RefreshTokenRequest) web.RefreshTokenResponse {
	err := serv.validate.Struct(req)
	helper.PanicIfError(err)

	invalidRefreshToken := exception.NewBadRequestError(
		web.ResponseErrors{"refresh_token": web.ResponseError{Message: "Invalid refresh token"}},
	)

	payload, err := helper.Verify(req.RefreshToken)
	if err != nil || !helper.IsRefreshToken(payload) {
		panic(invalidRefreshToken)
	}

	// TODO: optimize this query
	user, err := serv.repo.UserRepository.FindById(ctx, payload.ID)
	if err != nil {
		panic(invalidRefreshToken)
	}

	// TODO: optimize this query
	_, err = serv.repo.BlacklistedTokenRepository.FindByToken(ctx, req.RefreshToken)
	// Refresh token should not be blacklisted
	if err == nil {
		panic(invalidRefreshToken)
	}

	newAccessToken := helper.GenerateAccessToken(user)

	return web.RefreshTokenResponse{
		AccessToken: newAccessToken,
	}
}
