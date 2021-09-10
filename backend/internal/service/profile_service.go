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

type ProfileService struct {
	db *gorm.DB
	v  *validator.Validate
	rp *repository.Repository
}

func NewProfileService(db *gorm.DB, v *validator.Validate, rp *repository.Repository) *ProfileService {
	return &ProfileService{
		db: db,
		v:  v,
		rp: rp,
	}
}

func (sv *ProfileService) Me(ctx context.Context, uid string) web.ProfileDetailResponse {
	var u domain.User
	var e domain.Email

	uChan := make(chan domain.User)
	eChan := make(chan domain.Email)
	defer close(uChan)
	defer close(eChan)

	go func() {
		u, err := sv.rp.UserRepository.FindById(ctx, uid)
		if err != nil {
			panic(exception.NewNotFoundError(err.Error()))
		}
		uChan <- u
	}()

	go func() {
		e, err := sv.rp.EmailRepository.FindPrimaryByUserID(ctx, uid)
		if err != nil {
			panic(exception.NewNotFoundError(err.Error()))
		}
		eChan <- e
	}()

	u = <-uChan
	e = <-eChan

	return web.ProfileDetailResponse{
		ID:           u.ID,
		Name:         u.Name,
		Email:        e.Email,
		IsVerified:   e.VerifiedAt.Valid,
		ProfilePhoto: u.ProfilePhoto,
		CreatedAt:    u.CreatedAt,
		UpdatedAt:    u.UpdatedAt,
	}
}
