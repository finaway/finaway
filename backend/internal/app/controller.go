package app

import "finaway/internal/controller"

type Controller struct {
	AuthController    controller.AuthController
	ProfileController controller.ProfileController
}
