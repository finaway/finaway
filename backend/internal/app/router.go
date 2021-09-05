package app

import (
	"finaway/internal/controller"
	"finaway/internal/exception"
	"finaway/internal/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func NewRouter(c *controller.Controller) *fiber.App {
	app := fiber.New(fiber.Config{
		ErrorHandler: exception.ErrorHandler,
	})

	app.Use(recover.New())

	app.Post("/api/auth/login", c.AuthController.Login)

	app.Get("/api/profile", middleware.Auth(c.ProfileController.Me))

	return app
}
