package config

import (
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
)

var (
	DB_HOST     string
	DB_USER     string
	DB_PASSWORD string
	DB_PORT     int
	DB_NAME     string

	JWT_SIGNATURE_KEY          []byte
	JWT_SIGNING_METHOD         = jwt.SigningMethodHS256
	JWT_ACCESS_TOKEN_LIFETIME  = 3 * time.Hour
	JWT_REFRESH_TOKEN_LIFETIME = 14 * 24 * time.Hour // 14 days
)

func Init(filenames ...string) {
	err := godotenv.Load(filenames...)
	if err != nil {
		panic(err)
	}

	DB_HOST = os.Getenv("DB_HOST")
	DB_USER = os.Getenv("DB_USER")
	DB_PASSWORD = os.Getenv("DB_PASSWORD")
	DB_NAME = os.Getenv("DB_NAME")
	DB_PORT, _ = strconv.Atoi(os.Getenv("DB_PORT"))

	JWT_SIGNATURE_KEY = []byte(os.Getenv("JWT_SIGNATURE_KEY"))
}
