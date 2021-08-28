package exception

import (
	"finaway/internal/model/web"

	"github.com/go-playground/validator/v10"
)

type BadRequestError struct {
	Errors web.ResponseErrors
}

func NewBadRequestError(errors web.ResponseErrors) BadRequestError {
	return BadRequestError{errors}
}

// Error that produce by validator library.
func IsValidatorError(err error) bool {
	_, ok := err.(validator.ValidationErrors)
	return ok
}

func IsBadRequestError(err error) bool {
	_, ok := err.(BadRequestError)
	return ok
}

func (err BadRequestError) Error() string {
	return "Validation error"
}
