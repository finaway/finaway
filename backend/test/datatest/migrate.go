package datatest

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

func Migrate(db *mongo.Database) {
	users := []interface{}{}

	for _, user := range Users {
		users = append(users, user)
	}

	db.Collection("users").InsertMany(context.Background(), users)
}
