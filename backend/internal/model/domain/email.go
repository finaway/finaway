package domain

import (
	"finaway/internal/util/sqlutil"

	"github.com/google/uuid"
)

type Email struct {
	ID         string            `json:"id" gorm:"type:char(36);primaryKey;not null"`
	UserID     string            `json:"user_id" gorm:"type:char(36);not null"`
	Email      string            `json:"email" gorm:"type:varchar(255);uniqueIndex;not null"`
	IsPrimary  bool              `json:"is_primary" gorm:"type:boolean;not null;default:false"`
	VerifiedAt sqlutil.NullInt32 `json:"verified_at,omitempty" gorm:"type:int(10)"`
	CreatedAt  uint32            `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt  uint32            `json:"updated_at" gorm:"autoUpdateTime"`
}

func NewEmail() Email {
	return Email{
		ID: uuid.New().String(),
	}
}
