package exception

import (
	"finaway/internal/model/web"
	"log"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func ErrorHandler(c *fiber.Ctx, err error) error {
	if isValidatorError := IsValidatorError(err); isValidatorError {
		return validatorError(c, err.(validator.ValidationErrors))
	}

	if isBadRequestError := IsBadRequestError(err); isBadRequestError {
		return badRequestError(c, err.(BadRequestError))
	}

	if isNotFountError := IsNotFoundError(err); isNotFountError {
		return notFoundError(c, err.(NotFoundError))
	}

	return internalServerError(c, err)
}

// Error that produce by validator library
func validatorError(c *fiber.Ctx, err validator.ValidationErrors) error {
	errors := web.ResponseErrors{}

	for _, err := range err {
		errors[err.Field()] = web.ResponseError{Message: err.Error()}
	}

	resp := web.WebResponse{
		Code:   http.StatusBadRequest,
		Data:   nil,
		Errors: errors,
	}

	return resp.JSON(c)
}

// Error that produce by service
func badRequestError(c *fiber.Ctx, err BadRequestError) error {
	resp := web.WebResponse{
		Code:   http.StatusBadRequest,
		Data:   nil,
		Errors: err.Errors,
	}

	return resp.JSON(c)
}

func notFoundError(c *fiber.Ctx, err NotFoundError) error {
	resp := web.WebResponse{
		Code: http.StatusNotFound,
		Data: nil,
		Errors: web.ResponseErrors{
			"_global": web.ResponseError{Message: err.Error()},
		},
	}

	return resp.JSON(c)
}

func internalServerError(c *fiber.Ctx, err error) error {
	resp := web.WebResponse{
		Code: http.StatusInternalServerError,
		Data: nil,
		Errors: web.ResponseErrors{
			"_global": web.ResponseError{Message: "Internal server error"},
		},
	}

	log.Fatalf("Error: %s", err.Error())

	return resp.JSON(c)
}
