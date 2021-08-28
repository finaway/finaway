package repository

import (
	"context"
	"finaway/internal/model/domain"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserRepository interface {
	FindOneById(ctx context.Context, id primitive.ObjectID) (domain.User, error)
}
