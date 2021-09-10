package stringset_test

import (
	"finaway/internal/util/stringset"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestContains(t *testing.T) {
	cases := []string{
		"hello",
		"world",
		"lorem",
		"ipsum",
		"dolor",
	}

	for _, c := range cases {
		assert.True(t, stringset.Contains(cases, c))
	}

	assert.False(t, stringset.Contains(cases, "wrong"))
}
