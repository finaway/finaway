package password_test

import (
	"finaway/internal/util/password"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPassword(t *testing.T) {
	password1 := "secret1"
	password2 := "secret2"

	passwordHash1, _ := password.Hash(password1)
	passwordHash2, _ := password.Hash(password2)

	assert.True(t, password.CheckHash(password1, passwordHash1))
	assert.True(t, password.CheckHash(password2, passwordHash2))

	assert.False(t, password.CheckHash(password1, passwordHash2))
	assert.False(t, password.CheckHash(password2, passwordHash1))
}
