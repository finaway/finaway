package app

import (
	"finaway/internal/exception"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func NewRouter(c Controller) *fiber.App {
	app := fiber.New(fiber.Config{
		ErrorHandler: exception.ErrorHandler,
	})

	app.Use(recover.New())

	app.Post("/api/auth/login", c.AuthController.Login)
	app.Post("/api/auth/signup", c.AuthController.Signup)

	return app
}
