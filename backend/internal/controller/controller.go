package controller

import (
	"finaway/internal/service"
)

type Controller struct {
	AuthController    *AuthController
	ProfileController *ProfileController
}

func New(sv *service.Service) *Controller {
	return &Controller{
		AuthController:    NewAuthController(*sv.AuthService),
		ProfileController: NewProfileController(*sv.ProfileService),
	}
}
