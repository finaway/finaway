package helpertest

import (
	"finaway/config"
	"finaway/internal/app"
	"finaway/internal/controller"
	"finaway/internal/helper"
	"finaway/internal/repository"
	"finaway/internal/service"
	"path/filepath"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// Setup env for test
func init() {
	config.Init(filepath.Join(GetMainDir(), ".env.test"))
}

func SetupTest() (*gorm.DB, *fiber.App) {
	db := NewTestDB()
	app.MigrateModels(db)
	MigrateDataTests(db)

	validate := validator.New()
	helper.InjectValidate(validate)

	repo := repository.New(db)
	serv := service.New(db, validate, repo)
	ctrl := controller.New(serv)

	router := app.NewRouter(ctrl)

	return db, router
}
