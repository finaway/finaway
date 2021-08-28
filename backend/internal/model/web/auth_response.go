package web

import "finaway/internal/model/domain"

type LoginResponse struct {
	User         domain.User `json:"user"`
	AccessToken  string      `json:"access_token"`
	RefreshToken string      `json:"refresh_token"`
}
