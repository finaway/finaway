package web

type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type SignupRequest struct {
	Name     string `json:"name" validate:"required,min=5,max=50"`
	Email    string `json:"email" validate:"required,email,min=5,max=255"`
	Password string `json:"password" validate:"required,min=5,max=30"`
}

type LogoutRequest struct {
	RefreshToken string `json:"refresh_token" validate:"required"`
}

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token" validate:"required"`
}
