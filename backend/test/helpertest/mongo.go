package helpertest

import (
	"context"
	"finaway/config"
	"finaway/internal/helper"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func newTestDB() *mongo.Database {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(config.MONGODB_URI))
	helper.PanicIfError(err)

	dbName := helper.GetDBNameFromURI(config.MONGODB_URI)
	return client.Database(dbName)
}
