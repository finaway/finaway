package helper_test

import (
	"finaway/internal/helper"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPassword(t *testing.T) {
	password1 := "secret1"
	password2 := "secret2"

	passwordHash1, _ := helper.HashPassword(password1)
	passwordHash2, _ := helper.HashPassword(password2)

	assert.True(t, helper.CheckPasswordHash(password1, passwordHash1))
	assert.True(t, helper.CheckPasswordHash(password2, passwordHash2))

	assert.False(t, helper.CheckPasswordHash(password1, passwordHash2))
	assert.False(t, helper.CheckPasswordHash(password2, passwordHash1))
}
