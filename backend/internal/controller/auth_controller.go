package controller

import (
	"finaway/internal/model/web"
	"finaway/internal/service"
	"finaway/internal/util/errorutil"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

type AuthController struct {
	sv service.AuthService
}

func NewAuthController(sv service.AuthService) *AuthController {
	return &AuthController{
		sv: sv,
	}
}

func (ct *AuthController) Login(c *fiber.Ctx) error {
	r := web.LoginRequest{}
	err := c.BodyParser(&r)
	errorutil.PanicIfError(err)

	data := ct.sv.Login(c.Context(), r)
	resp := web.WebResponse{
		Code: http.StatusOK,
		Data: data,
	}

	return resp.JSON(c)
}

func (ct *AuthController) Logout(c *fiber.Ctx) error {
	r := web.LogoutRequest{}
	err := c.BodyParser(&r)
	errorutil.PanicIfError(err)

	data := ct.sv.Logout(c.Context(), r)
	resp := web.WebResponse{
		Code: http.StatusOK,
		Data: data,
	}

	return resp.JSON(c)
}

func (ct *AuthController) RefreshToken(c *fiber.Ctx) error {
	r := web.RefreshTokenRequest{}
	err := c.BodyParser(&r)
	errorutil.PanicIfError(err)

	data := ct.sv.RefreshToken(c.Context(), r)
	resp := web.WebResponse{
		Code: http.StatusOK,
		Data: data,
	}

	return resp.JSON(c)
}
