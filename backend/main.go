package main

import (
	"finaway/config"
	"finaway/internal/app"
	"finaway/internal/controller"
	"finaway/internal/helper"
	"finaway/internal/repository"
	"finaway/internal/service"

	"github.com/go-playground/validator/v10"
	_ "github.com/go-sql-driver/mysql"
)

func init() {
	config.Init()
}

func main() {
	db := app.NewDB()
	defer app.DisconnectDB(db)
	app.MigrateModels(db)

	validate := validator.New()
	helper.InjectValidate(validate)

	repo := repository.New(db)
	serv := service.New(db, validate, repo)
	ctrl := controller.New(serv)

	router := app.NewRouter(ctrl)
	err := router.Listen(":3000")
	helper.PanicIfError(err)
}
