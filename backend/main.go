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
	err := router.Listen(":3000")
	helper.PanicIfError(err)
}
