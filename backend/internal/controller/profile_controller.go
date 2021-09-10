package controller

import (
	"finaway/internal/model/web"
	"finaway/internal/service"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

type ProfileController struct {
	sv service.ProfileService
}

func NewProfileController(sv service.ProfileService) *ProfileController {
	return &ProfileController{
		sv: sv,
	}
}

func (ct *ProfileController) Me(c *fiber.Ctx) error {
	uid := c.Locals("userID").(string)

	data := ct.sv.Me(c.Context(), uid)
	resp := web.WebResponse{
		Code:   http.StatusOK,
		Data:   data,
		Errors: nil,
	}

	return resp.JSON(c)
}
