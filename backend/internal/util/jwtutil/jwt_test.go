package jwtutil_test

import (
	"finaway/internal/model/domain"
	"finaway/internal/util/jwtutil"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestJwt(t *testing.T) {
	user1 := domain.User{ID: uuid.NewString()}
	user2 := domain.User{ID: uuid.NewString()}

	accessToken1 := jwtutil.GenerateAccessToken(user1.ID)
	accessToken2 := jwtutil.GenerateAccessToken(user2.ID)

	refreshToken1 := jwtutil.GenerateRefreshToken(user1.ID)
	refreshToken2 := jwtutil.GenerateRefreshToken(user2.ID)

	payloadAccessToken1, err := jwtutil.Verify(accessToken1)
	assert.Nil(t, err)
	assert.Equal(t, user1.ID, payloadAccessToken1.UserID)
	payloadAccessToken2, err := jwtutil.Verify(accessToken2)
	assert.Nil(t, err)
	assert.Equal(t, user2.ID, payloadAccessToken2.UserID)

	payloadRefreshToken1, err := jwtutil.Verify(refreshToken1)
	assert.Nil(t, err)
	assert.Equal(t, user1.ID, payloadRefreshToken1.UserID)
	payloadRefreshToken2, err := jwtutil.Verify(refreshToken2)
	assert.Nil(t, err)
	assert.Equal(t, user2.ID, payloadRefreshToken2.UserID)

	assert.True(t, payloadAccessToken1.IsAccessToken())
	assert.True(t, payloadAccessToken2.IsAccessToken())
	assert.True(t, payloadRefreshToken1.IsRefreshToken())
	assert.True(t, payloadRefreshToken2.IsRefreshToken())

	assert.False(t, payloadAccessToken1.IsRefreshToken())
	assert.False(t, payloadAccessToken2.IsRefreshToken())
	assert.False(t, payloadRefreshToken1.IsAccessToken())
	assert.False(t, payloadRefreshToken2.IsAccessToken())

	t.Run("invalid jwt string format", func(t *testing.T) {
		_, err := jwtutil.Verify("wrong")
		assert.Error(t, err)
	})
}
