package app

import (
	"finaway/config"
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"fmt"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewDB() *gorm.DB {
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&loc=UTC",
		config.DB_USER,
		config.DB_PASSWORD,
		config.DB_HOST,
		config.DB_PORT,
		config.DB_NAME,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	helper.PanicIfError(err)

	sqlDB, err := db.DB()
	helper.PanicIfError(err)

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	return db
}

func DisconnectDB(db *gorm.DB) {
	sqlDB, err := db.DB()
	helper.PanicIfError(err)

	sqlDB.Close()
}

func MigrateModels(db *gorm.DB) {
	err := db.AutoMigrate(
		&domain.User{},
		&domain.Email{},
	)
	helper.PanicIfError(err)
}
