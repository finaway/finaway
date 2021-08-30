package controller

import (
	"finaway/internal/model/domain"
	"finaway/internal/model/web"
	"finaway/internal/service"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type profileController struct {
	profileService service.ProfileService
}

func NewProfileController(profileService service.ProfileService) ProfileController {
	return &profileController{
		profileService: profileService,
	}
}

func (controller *profileController) Me(c *fiber.Ctx) error {
	userID, ok := c.Locals("userID").(primitive.ObjectID)
	if !ok {
		panic("invalid userID data type")
	}

	user := domain.User{ID: userID}
	data := controller.profileService.Me(c.Context(), user)

	resp := web.WebResponse{
		Code:   http.StatusOK,
		Data:   data,
		Errors: nil,
	}

	return resp.JSON(c)
}
