package main

import (
	"finaway/config"
	"finaway/internal/app"
	"finaway/internal/controller"
	"finaway/internal/helper"
	"finaway/internal/repository"
	"finaway/internal/service"
	"finaway/internal/util/errorutil"
	"finaway/internal/util/mailer"

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

	v := validator.New()
	helper.InjectValidate(v)

	m := mailer.New()

	rp := repository.New(db)
	sv := service.New(db, v, m, rp)
	ct := controller.New(sv)

	r := app.NewRouter(ct)
	err := r.Listen(":3000")
	errorutil.PanicIfError(err)
}
