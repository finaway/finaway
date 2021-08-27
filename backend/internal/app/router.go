package app

import "github.com/gofiber/fiber/v2"

func NewRouter(c Controller) *fiber.App {
	app := fiber.New()

	app.Post("/api/v1/auth/login", c.AuthController.Login)
	app.Post("/api/v1/auth/signup", c.AuthController.Signup)

	return app
}
