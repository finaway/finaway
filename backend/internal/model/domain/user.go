package domain

import (
	"finaway/internal/helper/sqlhelper"

	"github.com/google/uuid"
)

type User struct {
	ID           string               `json:"id" yaml:"id" gorm:"type:char(36);primaryKey;not null"`
	Name         string               `json:"name" yaml:"name" gorm:"type:varchar(100);not null"`
	Emails       []Email              `json:"emails" yaml:"emails" gorm:"foreignKey:UserID"`
	Password     string               `json:"-" yaml:"password" gorm:"type:varchar(255);not null"`
	ProfilePhoto sqlhelper.NullString `json:"profile_photo,omitempty" yaml:"profile_photo" gorm:"type:varchar(255)"`
	CreatedAt    uint32               `json:"created_at" yaml:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    uint32               `json:"updated_at,omitempty" yaml:"updated_at" gorm:"autoUpdateTime"`
}

func NewUser() User {
	return User{
		ID: uuid.New().String(),
	}
}
