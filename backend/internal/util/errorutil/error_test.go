package errorutil_test

import (
	"errors"
	"finaway/internal/util/errorutil"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPanicIfError(t *testing.T) {
	assert.Panics(t, func() {
		errorutil.PanicIfError(errors.New("something wrong"))
	})

	assert.NotPanics(t, func() {
		errorutil.PanicIfError(nil)
	})
}
