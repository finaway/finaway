package helpertest

import (
	"database/sql"
	"finaway/config"
	"finaway/internal/app"
	"finaway/internal/helper"
	"fmt"
	"path"

	"github.com/go-testfixtures/testfixtures/v3"
	"github.com/google/uuid"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func createTestDB(dbName string) {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/",
		config.DB_USER,
		config.DB_PASSWORD,
		config.DB_HOST,
		config.DB_PORT,
	))
	helper.PanicIfError(err)
	defer db.Close()

	_, err = db.Exec(fmt.Sprintf("CREATE DATABASE `%s`", dbName))
	helper.PanicIfError(err)
}

func dropTestDB(dbName string) {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/",
		config.DB_USER,
		config.DB_PASSWORD,
		config.DB_HOST,
		config.DB_PORT,
	))
	helper.PanicIfError(err)
	defer db.Close()

	_, err = db.Exec(fmt.Sprintf("DROP DATABASE `%s`", dbName))
	helper.PanicIfError(err)
}

func NewTestDB() *gorm.DB {
	DB_NAME := fmt.Sprintf("%s_%s", config.DB_NAME, uuid.NewString())
	createTestDB(DB_NAME)

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&loc=UTC",
		config.DB_USER,
		config.DB_PASSWORD,
		config.DB_HOST,
		config.DB_PORT,
		DB_NAME,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	helper.PanicIfError(err)

	return db
}

func MigrateDataTests(db *gorm.DB) {
	sqlDB, err := db.DB()
	helper.PanicIfError(err)

	fixtures, err := testfixtures.New(
		testfixtures.Database(sqlDB),
		testfixtures.Dialect("mysql"),
		testfixtures.Files(
			path.Join(GetMainDir(), "fixtures/users.json"),
			path.Join(GetMainDir(), "fixtures/emails.json"),
		),
	)
	helper.PanicIfError(err)

	err = fixtures.Load()
	helper.PanicIfError(err)
}

func Cleanup(db *gorm.DB) {
	defer app.DisconnectDB(db)
	dropTestDB(db.Migrator().CurrentDatabase())
}
