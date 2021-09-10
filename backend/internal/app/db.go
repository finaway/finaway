package app

import (
	"finaway/config"
	"finaway/internal/model/domain"
	"finaway/internal/util/errorutil"
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
	errorutil.PanicIfError(err)

	sql, err := db.DB()
	errorutil.PanicIfError(err)

	sql.SetMaxIdleConns(10)
	sql.SetMaxOpenConns(100)
	sql.SetConnMaxLifetime(time.Hour)

	return db
}

func DisconnectDB(db *gorm.DB) {
	sql, err := db.DB()
	errorutil.PanicIfError(err)

	sql.Close()
}

func MigrateModels(db *gorm.DB) {
	err := db.AutoMigrate(
		&domain.User{},
		&domain.Email{},
		&domain.BlacklistedToken{},
	)
	errorutil.PanicIfError(err)
}
