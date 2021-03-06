package helpertest

import (
	"database/sql"
	"finaway/config"
	"finaway/internal/app"
	"finaway/internal/util/errorutil"
	"fmt"
	"path"

	"github.com/go-testfixtures/testfixtures/v3"
	"github.com/google/uuid"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func createTestDB(dbName string) {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/",
		config.DB_USER,
		config.DB_PASSWORD,
		config.DB_HOST,
		config.DB_PORT,
	))
	errorutil.PanicIfError(err)
	defer db.Close()

	_, err = db.Exec(fmt.Sprintf("CREATE DATABASE `%s`", dbName))
	errorutil.PanicIfError(err)
}

func dropTestDB(dbName string) {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/",
		config.DB_USER,
		config.DB_PASSWORD,
		config.DB_HOST,
		config.DB_PORT,
	))
	errorutil.PanicIfError(err)
	defer db.Close()

	_, err = db.Exec(fmt.Sprintf("DROP DATABASE `%s`", dbName))
	errorutil.PanicIfError(err)
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

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	errorutil.PanicIfError(err)

	return db
}

func MigrateDataTests(db *gorm.DB) {
	sqlDB, err := db.DB()
	errorutil.PanicIfError(err)

	fixtures, err := testfixtures.New(
		testfixtures.Database(sqlDB),
		testfixtures.Dialect("mysql"),
		testfixtures.Files(
			path.Join(GetMainDir(), "fixtures/users.json"),
			path.Join(GetMainDir(), "fixtures/emails.json"),
		),
	)
	errorutil.PanicIfError(err)

	err = fixtures.Load()
	errorutil.PanicIfError(err)
}

func Cleanup(db *gorm.DB) {
	defer app.DisconnectDB(db)
	dropTestDB(db.Migrator().CurrentDatabase())
}
