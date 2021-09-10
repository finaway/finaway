package hash_test

import (
	"finaway/internal/util/hash"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPassword(t *testing.T) {
	password1 := "secret1"
	password2 := "secret2"

	passwordHash1, _ := hash.HashPassword(password1)
	passwordHash2, _ := hash.HashPassword(password2)

	assert.True(t, hash.CheckPasswordHash(password1, passwordHash1))
	assert.True(t, hash.CheckPasswordHash(password2, passwordHash2))

	assert.False(t, hash.CheckPasswordHash(password1, passwordHash2))
	assert.False(t, hash.CheckPasswordHash(password2, passwordHash1))
}
