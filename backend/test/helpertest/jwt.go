package helpertest

import (
	"finaway/config"
	"finaway/internal/util/jwtutil"
	"time"
)

type JWTTest struct {
	AccessToken  string
	RefreshToken string
}

func GenerateJwt(uid string) JWTTest {
	accessToken := jwtutil.GenerateAccessToken(uid)
	refreshToken := jwtutil.GenerateRefreshToken(uid)

	return JWTTest{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}
}

func GenerateExpiredJwt(uid string) JWTTest {
	accessToken := jwtutil.NewWithClaims(uid, "access", -1*time.Hour)
	refreshToken := jwtutil.NewWithClaims(uid, "refresh", -1*time.Hour)

	accessTokenString, _ := accessToken.SignedString(config.JWT_SIGNATURE_KEY)
	refreshTokenString, _ := refreshToken.SignedString(config.JWT_SIGNATURE_KEY)

	return JWTTest{
		AccessToken:  accessTokenString,
		RefreshToken: refreshTokenString,
	}
}
