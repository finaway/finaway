package controller

import (
	"finaway/internal/model/web"
	"finaway/internal/service"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

type profileController struct {
	serv service.ProfileService
}

func NewProfileController(profileServ service.ProfileService) ProfileController {
	return &profileController{
		serv: profileServ,
	}
}

func (ctrl *profileController) Me(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)

	data := ctrl.serv.Me(c.Context(), userID)

	resp := web.WebResponse{
		Code:   http.StatusOK,
		Data:   data,
		Errors: nil,
	}

	return resp.JSON(c)
}
