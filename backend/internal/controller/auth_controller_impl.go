package controller

import (
	"finaway/internal/helper"
	"finaway/internal/model/web"
	"finaway/internal/service"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

type authController struct {
	serv service.AuthService
}

func NewAuthController(authServ service.AuthService) AuthController {
	return &authController{
		serv: authServ,
	}
}

func (ctrl *authController) Login(c *fiber.Ctx) error {
	req := web.LoginRequest{}
	err := c.BodyParser(&req)
	helper.PanicIfError(err)

	data := ctrl.serv.Login(c.Context(), req)
	resp := web.WebResponse{
		Code:   http.StatusOK,
		Data:   data,
		Errors: nil,
	}

	return resp.JSON(c)
}
