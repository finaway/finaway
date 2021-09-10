package hash

import (
	"crypto/rand"
	"encoding/hex"
)

func GenerateEmailConfirmationToken() string {
	length := 128

	b := make([]byte, length/2)
	if _, err := rand.Read(b); err != nil {
		return ""
	}

	return hex.EncodeToString(b)
}
