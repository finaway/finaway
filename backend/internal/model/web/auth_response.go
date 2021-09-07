package web

type LoginResponse struct {
	User         UserDetailResponse `json:"user"`
	AccessToken  string             `json:"access_token"`
	RefreshToken string             `json:"refresh_token"`
}

type LogoutResponse struct{}

type RefreshTokenResponse struct {
	AccessToken string `json:"access_token"`
}
