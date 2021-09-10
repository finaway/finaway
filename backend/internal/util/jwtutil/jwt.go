package jwtutil

import (
	"errors"
	"finaway/config"
	"finaway/internal/util/errorutil"
	"finaway/internal/util/stringset"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

type Payload struct {
	UserID string  `json:"user_id"`
	Kind   string  `json:"kind"`
	Exp    float64 `json:"exp"`
}

func (p *Payload) IsAccessToken() bool {
	return p.Kind == "access"
}

func (p *Payload) IsRefreshToken() bool {
	return p.Kind == "refresh"
}

func NewWithClaims(uid string, kind string, lifetime time.Duration) *jwt.Token {
	if !stringset.Contains([]string{"access", "refresh"}, kind) {
		panic(fmt.Sprintf(`kind arg should be "access" or "refresh", got: "%s"`, kind))
	}

	return jwt.NewWithClaims(config.JWT_SIGNING_METHOD, jwt.MapClaims{
		"user_id": uid,
		"kind":    kind,
		"exp":     float64(time.Now().Add(lifetime).Unix()),
	})
}

func GenerateAccessToken(uid string) string {
	jwtToken := NewWithClaims(uid, "access", config.JWT_ACCESS_TOKEN_LIFETIME)

	token, err := jwtToken.SignedString([]byte(config.JWT_SIGNATURE_KEY))
	errorutil.PanicIfError(err)

	return token
}

func GenerateRefreshToken(uid string) string {
	jwtToken := NewWithClaims(uid, "refresh", config.JWT_REFRESH_TOKEN_LIFETIME)

	token, err := jwtToken.SignedString([]byte(config.JWT_SIGNATURE_KEY))
	errorutil.PanicIfError(err)

	return token
}

func Verify(token string) (Payload, error) {
	jwtToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return config.JWT_SIGNATURE_KEY, nil
	})

	if err != nil {
		return Payload{}, errors.New("invalid token")
	}

	if claims, ok := jwtToken.Claims.(jwt.MapClaims); ok && jwtToken.Valid {
		return Payload{
			UserID: claims["user_id"].(string),
			Kind:   claims["kind"].(string),
			Exp:    claims["exp"].(float64),
		}, nil
	}

	return Payload{}, errors.New("invalid token")
}
