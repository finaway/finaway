package web

import "finaway/internal/helper/sqlhelper"

type UserDetailResponse struct {
	ID           string               `json:"id"`
	Name         string               `json:"name"`
	Email        string               `json:"email"`
	IsVerified   bool                 `json:"is_verified"`
	ProfilePhoto sqlhelper.NullString `json:"profile_photo"`
	CreatedAt    uint32               `json:"created_at"`
	UpdatedAt    uint32               `json:"updated_at,omitempty"`
}

type ProfileDetailResponse UserDetailResponse
