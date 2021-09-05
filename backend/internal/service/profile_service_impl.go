package service

import (
	"context"
	"finaway/internal/exception"
	"finaway/internal/model/domain"
	"finaway/internal/model/web"
	"finaway/internal/repository"

	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type profileService struct {
	db       *gorm.DB
	validate *validator.Validate
	repo     *repository.Repository
}

func NewProfileService(db *gorm.DB, validate *validator.Validate, repo *repository.Repository) ProfileService {
	return &profileService{
		db:       db,
		validate: validate,
		repo:     repo,
	}
}

func (serv *profileService) Me(ctx context.Context, userID string) web.ProfileDetailResponse {
	var user domain.User
	var email domain.Email

	userChan := make(chan domain.User)
	emailChan := make(chan domain.Email)
	defer close(userChan)
	defer close(emailChan)

	go func() {
		u, err := serv.repo.UserRepository.FindById(ctx, userID)
		if err != nil {
			panic(exception.NewNotFoundError(err.Error()))
		}
		userChan <- u
	}()

	go func() {
		e, err := serv.repo.EmailRepository.FindPrimaryByUserID(ctx, userID)
		if err != nil {
			panic(exception.NewNotFoundError(err.Error()))
		}
		emailChan <- e
	}()

	user = <-userChan
	email = <-emailChan

	return web.ProfileDetailResponse{
		ID:           user.ID,
		Name:         user.Name,
		Email:        email.Email,
		IsVerified:   email.VerifiedAt.Valid,
		ProfilePhoto: user.ProfilePhoto,
		CreatedAt:    user.CreatedAt,
		UpdatedAt:    user.UpdatedAt,
	}
}
