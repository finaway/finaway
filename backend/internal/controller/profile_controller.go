package controller

import "github.com/gofiber/fiber/v2"

type ProfileController interface {
	Me(c *fiber.Ctx) error
}
