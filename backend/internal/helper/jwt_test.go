package helper_test

import (
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"testing"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestJwt(t *testing.T) {
	user1 := domain.User{ID: primitive.NewObjectID()}
	user2 := domain.User{ID: primitive.NewObjectID()}

	accessToken1 := helper.GenerateAccessToken(user1)
	accessToken2 := helper.GenerateAccessToken(user2)

	refreshToken1 := helper.GenerateRefreshToken(user1)
	refreshToken2 := helper.GenerateRefreshToken(user2)

	payloadAccessToken1, err := helper.Verify(accessToken1)
	assert.Nil(t, err)
	assert.Equal(t, user1.ID, payloadAccessToken1.ID)
	payloadAccessToken2, err := helper.Verify(accessToken2)
	assert.Nil(t, err)
	assert.Equal(t, user2.ID, payloadAccessToken2.ID)

	payloadRefreshToken1, err := helper.Verify(refreshToken1)
	assert.Nil(t, err)
	assert.Equal(t, user1.ID, payloadRefreshToken1.ID)
	payloadRefreshToken2, err := helper.Verify(refreshToken2)
	assert.Nil(t, err)
	assert.Equal(t, user2.ID, payloadRefreshToken2.ID)

	assert.True(t, helper.IsAccessToken(payloadAccessToken1))
	assert.True(t, helper.IsAccessToken(payloadAccessToken2))
	assert.True(t, helper.IsRefreshToken(payloadRefreshToken1))
	assert.True(t, helper.IsRefreshToken(payloadRefreshToken2))

	assert.False(t, helper.IsRefreshToken(payloadAccessToken1))
	assert.False(t, helper.IsRefreshToken(payloadAccessToken2))
	assert.False(t, helper.IsAccessToken(payloadRefreshToken1))
	assert.False(t, helper.IsAccessToken(payloadRefreshToken2))

	t.Run("invalid jwt string format", func(t *testing.T) {
		_, err := helper.Verify("wrong")
		assert.Error(t, err)
	})
}
