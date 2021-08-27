package app

import (
	"context"
	"finaway/internal/helper"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func NewDB() *mongo.Client {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	helper.PanicIfError(err)

	return client
}

func DisconnectDB(db *mongo.Client) {
	err := db.Disconnect(context.Background())
	helper.PanicIfError(err)
}
