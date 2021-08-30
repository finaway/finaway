package helpertest

import (
	"finaway/internal/helper"
	"finaway/internal/model/domain"
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
