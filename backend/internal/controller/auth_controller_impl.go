package controller

import (
	"finaway/internal/helper"
	"finaway/internal/model/web"
	"finaway/internal/service"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

type authController struct {
	authService service.AuthService
}

func NewAuthController(authService service.AuthService) AuthController {
	return &authController{
		authService: authService,
	}
}

func (controller authController) Login(c *fiber.Ctx) error {
	req := web.LoginRequest{}
	err := c.BodyParser(&req)
	helper.PanicIfError(err)

	data := controller.authService.Login(c.Context(), req)
	resp := web.WebResponse{
		Code:   http.StatusOK,
		Data:   data,
		Errors: nil,
	}

	return resp.JSON(c)
}

func (controller authController) Signup(c *fiber.Ctx) error {
	return c.Status(http.StatusCreated).JSON(map[string]interface{}{
		"code":   http.StatusCreated,
		"status": http.StatusText(http.StatusCreated),
	})
}
