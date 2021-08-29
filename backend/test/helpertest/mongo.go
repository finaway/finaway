package helpertest

import (
	"context"
	"finaway/config"
	"finaway/internal/helper"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func NewTestDB() *mongo.Database {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	dbPrefix := helper.GetDBNameFromURI(config.MONGODB_URI)
	dbName := fmt.Sprintf("%s_%s", dbPrefix, uuid.New())
	mongoUri := strings.Replace(config.MONGODB_URI, dbPrefix, dbName, 1)

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoUri))
	helper.PanicIfError(err)

	return client.Database(dbName)
}

func Cleanup(db *mongo.Database) {
	db.Drop(context.Background())
	db.Client().Disconnect(context.Background())
}
