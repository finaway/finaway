package controller

import (
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

func (controller authController) Login(ctx *fiber.Ctx) error {
	return ctx.Status(http.StatusOK).JSON(map[string]interface{}{
		"code":   http.StatusOK,
		"status": http.StatusText(http.StatusOK),
	})
}

func (controller authController) Signup(ctx *fiber.Ctx) error {
	return ctx.Status(http.StatusCreated).JSON(map[string]interface{}{
		"code":   http.StatusCreated,
		"status": http.StatusText(http.StatusCreated),
	})
}
