package domain

import (
	"finaway/internal/util/sqlutil"
)

type User struct {
	ID           string             `json:"id" gorm:"type:char(36);primaryKey;not null"`
	Name         string             `json:"name" gorm:"type:varchar(100);not null"`
	Emails       []Email            `json:"emails" gorm:"foreignKey:UserID"`
	Password     string             `json:"-" gorm:"type:varchar(255);not null"`
	ProfilePhoto sqlutil.NullString `json:"profile_photo,omitempty" gorm:"type:varchar(255);default:null"`
	CreatedAt    uint32             `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    uint32             `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}
