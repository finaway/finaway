package app

import (
	"finaway/internal/controller"
	"finaway/internal/exception"
	m "finaway/internal/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func NewRouter(c *controller.Controller) *fiber.App {
	app := fiber.New(fiber.Config{
		ErrorHandler: exception.ErrorHandler,
	})

	app.Use(recover.New())

	app.Post("/api/auth/login", c.AuthController.Login)
	app.Post("/api/auth/signup", c.AuthController.Signup)
	app.Post("/api/auth/logout", c.AuthController.Logout)
	app.Post("/api/auth/refresh-token", c.AuthController.RefreshToken)

	app.Get("/api/profile", m.Auth(c.ProfileController.Me))

	return app
}
