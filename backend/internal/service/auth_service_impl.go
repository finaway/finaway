package service

import (
	"context"
	"finaway/internal/exception"
	"finaway/internal/helper"
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
