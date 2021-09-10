package helpertest

import (
	"finaway/config"
	"finaway/internal/app"
	"finaway/internal/controller"
	"finaway/internal/helper"
	"finaway/internal/repository"
	"finaway/internal/service"
	"finaway/internal/util/mailer"
	"path/filepath"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// Setup env for test
func init() {
	config.Init(filepath.Join(GetMainDir(), ".env.test"))
}

type TestUtil struct {
	DB     *gorm.DB
	Router *fiber.App
	Mailer *mailer.MailerMock
}

func New() *TestUtil {
	db := NewTestDB()
	app.MigrateModels(db)
	MigrateDataTests(db)

	v := validator.New()
	helper.InjectValidate(v)

	m := mailer.NewMock()

	rp := repository.New(db)
	sv := service.New(db, v, m, rp)
	ctrl := controller.New(sv)

	r := app.NewRouter(ctrl)

	return &TestUtil{
		DB:     db,
		Router: r,
		Mailer: m,
	}
}

func (t *TestUtil) Cleanup() {
	defer app.DisconnectDB(t.DB)
	dropTestDB(t.DB.Migrator().CurrentDatabase())
}
