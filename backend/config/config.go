package config

import (
	"os"
	"time"

	"github.com/joho/godotenv"
)

var (
	MONGODB_URI string

	SECRET_KEY             string
	ACCESS_TOKEN_LIFETIME  = 3 * time.Hour
	REFRESH_TOKEN_LIFETIME = 14 * 24 * time.Hour // 14 days
)

func Init(filenames ...string) {
	err := godotenv.Load(filenames...)
	if err != nil {
		panic(err)
	}

	MONGODB_URI = os.Getenv("MONGODB_URI")
	SECRET_KEY = os.Getenv("SECRET_KEY")
}
