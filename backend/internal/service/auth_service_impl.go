package service

import (
	"context"
	"finaway/internal/exception"
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"finaway/internal/model/web"
	"finaway/internal/repository"

	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type authService struct {
	db             *mongo.Database
	validate       *validator.Validate
	userRepository repository.UserRepository
}

func NewAuthService(db *mongo.Database, validate *validator.Validate, userRepo repository.UserRepository) AuthService {
	return &authService{
		db:             db,
		validate:       validate,
		userRepository: userRepo,
	}
}

func (serv *authService) Login(ctx context.Context, req web.LoginRequest) web.LoginResponse {
	err := serv.validate.Struct(req)
	helper.PanicIfError(err)

	var user domain.User
	err = serv.db.Collection("users").FindOne(ctx, bson.M{"email": req.Email}).Decode(&user)

	if err != nil {
		if err != mongo.ErrNoDocuments {
			helper.PanicIfError(err)
		}
	}

	if user.ID == primitive.NilObjectID {
		panic(exception.NewBadRequestError(
			web.ResponseErrors{"email": web.ResponseError{Message: "Invalid email or password"}},
		))
	}

	if validPwd := helper.CheckPasswordHash(req.Password, user.Password); !validPwd {
		panic(exception.NewBadRequestError(
			web.ResponseErrors{"email": web.ResponseError{Message: "Invalid email or password"}},
		))
	}

	accessToken := helper.GenerateAccessToken(user)
	refreshToken := helper.GenerateRefreshToken(user)

	return web.LoginResponse{
		User:         user,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}
}
