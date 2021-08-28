package web

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
)

type ResponseError struct {
	Message string `json:"message"`
}

type ResponseErrors map[string]ResponseError

type WebResponse struct {
	Code   int            `json:"code"`
	Status string         `json:"status"`
	Data   interface{}    `json:"data"`
	Errors ResponseErrors `json:"errors"`
}

func (resp *WebResponse) JSON(c *fiber.Ctx) error {
	resp.Status = http.StatusText(resp.Code)

	return c.Status(resp.Code).JSON(resp)
}
