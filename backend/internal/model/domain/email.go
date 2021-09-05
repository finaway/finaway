package domain

import (
	"finaway/internal/helper/sqlhelper"

	"github.com/google/uuid"
)

type Email struct {
	ID         string              `json:"id" yaml:"id" gorm:"type:char(36);primaryKey;not null"`
	UserID     string              `json:"user_id" yaml:"user_id" gorm:"type:char(36);not null"`
	Email      string              `json:"email" yaml:"email" gorm:"type:varchar(255);uniqueIndex;not null"`
	IsPrimary  bool                `json:"is_primary" yaml:"is_primary" gorm:"type:boolean;not null;default:false"`
	VerifiedAt sqlhelper.NullInt32 `json:"verified_at,omitempty" yaml:"verified_at" gorm:"type:int(10)"`
	CreatedAt  uint32              `json:"created_at" yaml:"created_at" gorm:"autoCreateTime"`
	UpdatedAt  uint32              `json:"updated_at" yaml:"updated_at" gorm:"autoUpdateTime"`
}

func NewEmail() Email {
	return Email{
		ID: uuid.New().String(),
	}
}
