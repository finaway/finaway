package helpertest

import (
	"finaway/config"
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"time"

	"github.com/golang-jwt/jwt"
)

type JWTTest struct {
	AccessToken  string
	RefreshToken string
}

func GenerateJwt(user domain.User) JWTTest {
	accessToken := helper.GenerateAccessToken(user)
	refreshToken := helper.GenerateRefreshToken(user)

	return JWTTest{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}
}

func GenerateExpiredJwt(user domain.User) JWTTest {
	generate := func(kind string) jwt.MapClaims {
		return jwt.MapClaims{
			"id":   user.ID,
			"kind": kind,
			"exp":  float64(time.Now().Add(-1 * time.Minute).Unix()),
		}
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, generate("access"))
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, generate("refresh"))

	accessTokenString, _ := accessToken.SignedString([]byte(config.SECRET_KEY))
	refreshTokenString, _ := refreshToken.SignedString([]byte(config.SECRET_KEY))

	return JWTTest{
		AccessToken:  accessTokenString,
		RefreshToken: refreshTokenString,
	}
}
