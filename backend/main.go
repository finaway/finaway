package main

import (
	"finaway/config"
	"finaway/internal/app"
	"finaway/internal/controller"
	"finaway/internal/helper"
	"finaway/internal/repository"
	"finaway/internal/service"

	"github.com/go-playground/validator/v10"
)

func init() {
	config.Init()
}

func main() {
	db := app.NewDB()
	defer app.DisconnectDB(db)

	validate := validator.New()
	helper.InjectValidate(validate)

	userRepo := repository.NewUserRepository()
	authService := service.NewAuthService(db, validate, userRepo)
	authController := controller.NewAuthController(authService)

	controllers := app.Controller{
		AuthController: authController,
	}

	router := app.NewRouter(controllers)
	err := router.Listen(":3000")
	helper.PanicIfError(err)
}
