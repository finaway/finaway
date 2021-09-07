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
		Code: http.StatusOK,
		Data: data,
	}

	return resp.JSON(c)
}

func (ctrl *authController) Logout(c *fiber.Ctx) error {
	req := web.LogoutRequest{}
	err := c.BodyParser(&req)
	helper.PanicIfError(err)

	data := ctrl.serv.Logout(c.Context(), req)
	resp := web.WebResponse{
		Code: http.StatusOK,
		Data: data,
	}

	return resp.JSON(c)
}

func (ctrl *authController) RefreshToken(c *fiber.Ctx) error {
	req := web.RefreshTokenRequest{}
	err := c.BodyParser(&req)
	helper.PanicIfError(err)

	data := ctrl.serv.RefreshToken(c.Context(), req)
	resp := web.WebResponse{
		Code: http.StatusOK,
		Data: data,
	}

	return resp.JSON(c)
}
