package helpertest

import (
	"context"
	"finaway/config"
	"finaway/internal/app"
	"finaway/internal/controller"
	"finaway/internal/helper"
	"finaway/internal/repository"
	"finaway/internal/service"
	"os"
	"path/filepath"
	"regexp"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Setup env for test
func init() {
	pattern := regexp.MustCompile(`(.*?)backend\/`)

	dir, err := os.Getwd()
	helper.PanicIfError(err)

	testDir := pattern.FindString(dir)
	config.Init(filepath.Join(testDir, ".env.test"))
}

func SetupTest() (*mongo.Database, *fiber.App) {
	db := NewTestDB()

	collections, err := db.ListCollectionNames(context.Background(), bson.D{})
	helper.PanicIfError(err)

	// Drop all collections
	for _, collection := range collections {
		db.Collection(collection).Drop(context.Background())
	}

	validate := validator.New()
	helper.InjectValidate(validate)

	userRepo := repository.NewUserRepository(db)

	authService := service.NewAuthService(db, validate, userRepo)
	profileService := service.NewProfileService(db, validate, userRepo)

	authController := controller.NewAuthController(authService)
	profileController := controller.NewProfileController(profileService)

	controllers := app.Controller{
		AuthController:    authController,
		ProfileController: profileController,
	}

	router := app.NewRouter(controllers)

	return db, router
}
