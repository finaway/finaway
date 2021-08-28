package helper

import (
	"errors"
	"finaway/config"
	"finaway/internal/model/domain"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

type JwtPayload struct {
	ID   string
	Kind string
	Exp  float64
}

func GenerateAccessToken(user domain.User) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"_id":  user.ID.Hex(),
		"kind": "access",
		"exp":  float64(TimeToEpoch(time.Now().Add(config.ACCESS_TOKEN_LIFETIME))),
	})

	tokenString, err := token.SignedString([]byte(config.SECRET_KEY))
	PanicIfError(err)

	return tokenString
}

func GenerateRefreshToken(user domain.User) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"_id":  user.ID.Hex(),
		"kind": "refresh",
		"exp":  float64(TimeToEpoch(time.Now().Add(config.REFRESH_TOKEN_LIFETIME))),
	})

	tokenString, err := token.SignedString([]byte(config.SECRET_KEY))
	PanicIfError(err)

	return tokenString
}

func Verify(token string) (JwtPayload, error) {
	jwtToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(config.SECRET_KEY), nil
	})
	PanicIfError(err)

	if claims, ok := jwtToken.Claims.(jwt.MapClaims); ok && jwtToken.Valid {
		return JwtPayload{
			ID:   claims["_id"].(string),
			Kind: claims["kind"].(string),
			Exp:  claims["exp"].(float64),
		}, nil
	}

	return JwtPayload{}, errors.New("invalid token")
}

func IsAccessToken(payload JwtPayload) bool {
	return payload.Kind == "access"
}

func IsRefreshToken(payload JwtPayload) bool {
	return payload.Kind == "refresh"
}
