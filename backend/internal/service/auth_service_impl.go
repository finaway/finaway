package service

import (
	"finaway/internal/repository"

	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/mongo"
)

type authService struct {
	db             *mongo.Client
	validate       *validator.Validate
	userRepository repository.UserRepository
}

func NewAuthService(db *mongo.Client, validate *validator.Validate, userRepo repository.UserRepository) AuthService {
	return &authService{
		db:             db,
		validate:       validate,
		userRepository: userRepo,
	}
}
