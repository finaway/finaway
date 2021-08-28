package repository

import (
	"context"
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type userRepository struct {
	db *mongo.Database
}

func NewUserRepository(db *mongo.Database) UserRepository {
	return &userRepository{db: db}
}

func (repo *userRepository) FindOneById(ctx context.Context, id primitive.ObjectID) (domain.User, error) {
	user := domain.User{}

	err := repo.db.Collection("users").FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	if err != nil && err == mongo.ErrNoDocuments {
		return user, fmt.Errorf("user with id %s not found", id.Hex())
	}
	helper.PanicIfError(err)

	return user, nil
}
