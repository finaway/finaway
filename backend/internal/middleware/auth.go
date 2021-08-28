package middleware

import (
	"finaway/internal/exception"
	"finaway/internal/helper"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type FiberHandler func(c *fiber.Ctx) error

func Auth(cb FiberHandler) FiberHandler {
	return func(c *fiber.Ctx) error {
		authorization := string(c.Request().Header.Peek("Authorization"))
		tokenSegments := strings.Split(authorization, " ")

		if len(tokenSegments) < 2 {
			panic(exception.NewUnauthorizedError("Unauthorized"))
		}

		accessToken := tokenSegments[1]
		payload, err := helper.Verify(accessToken)

		if err != nil {
			panic(exception.NewUnauthorizedError("Unauthorized"))
		}

		c.Locals("userID", payload.ID)

		return cb(c)
	}
}
