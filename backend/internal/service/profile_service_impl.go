package service

import (
	"context"
	"finaway/internal/exception"
	"finaway/internal/model/domain"
	"finaway/internal/repository"

	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/mongo"
)

type profileService struct {
	db             *mongo.Database
	validate       *validator.Validate
	userRepository repository.UserRepository
}

func NewProfileService(db *mongo.Database, validate *validator.Validate, userRepository repository.UserRepository) ProfileService {
	return &profileService{
		db:             db,
		validate:       validate,
		userRepository: userRepository,
	}
}

func (service *profileService) Me(ctx context.Context, user domain.User) domain.User {
	user, err := service.userRepository.FindOneById(ctx, user.ID)
	if err != nil {
		panic(exception.NewNotFoundError(err.Error()))
	}

	return user
}
