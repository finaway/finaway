package helper_test

import (
	"finaway/internal/helper"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetDBNameFromURI(t *testing.T) {
	tests := []struct {
		uri      string
		expected string
	}{
		{"mongodb://localhost:27017/finaway", "finaway"},
		{"mongodb://localhost:27017/finaway?authSource=admin", "finaway"},
		{"mongodb://localhost:27017/finaway_test", "finaway_test"},
		{"mongodb://localhost:27017/finaway_test?authSource=admin", "finaway_test"},
		{"mongodb://localhost:27017/finaway-test", "finaway-test"},
		{"mongodb://localhost:27017/finaway-test?authSource=admin", "finaway-test"},
	}

	for _, test := range tests {
		dbName := helper.GetDBNameFromURI(test.uri)
		assert.Equal(t, test.expected, dbName)
	}
}
