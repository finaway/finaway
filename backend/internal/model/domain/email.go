package domain

import (
	"database/sql"
	"finaway/internal/util/sqlutil"
)

type Email struct {
	ID         string            `json:"id" gorm:"type:char(36);primaryKey;not null"`
	UserID     string            `json:"user_id" gorm:"type:char(36);uniqueIndex:idx_user_id_email;not null"`
	Email      string            `json:"email" gorm:"type:varchar(255);uniqueIndex:idx_user_id_email;not null"`
	IsPrimary  bool              `json:"is_primary" gorm:"type:boolean;not null;default:false"`
	Token      sql.NullString    `json:"token" gorm:"type:char(128);uniqueIndex;default:null"`
	VerifiedAt sqlutil.NullInt32 `json:"verified_at,omitempty" gorm:"type:int(10);default:null"`
	CreatedAt  uint32            `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt  uint32            `json:"updated_at" gorm:"autoUpdateTime"`
}
