package helper_test

import (
	"errors"
	"finaway/internal/helper"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPanicIfError(t *testing.T) {
	assert.Panics(t, func() {
		helper.PanicIfError(errors.New("something wrong"))
	})

	assert.NotPanics(t, func() {
		helper.PanicIfError(nil)
	})
}
