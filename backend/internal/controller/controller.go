package controller

import (
	"finaway/internal/service"
)

type Controller struct {
	AuthController    AuthController
	ProfileController ProfileController
}

func New(serv *service.Service) *Controller {
	return &Controller{
		AuthController:    NewAuthController(serv.AuthService),
		ProfileController: NewProfileController(serv.ProfileService),
	}
}
