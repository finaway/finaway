package domain

type BlacklistedToken struct {
	Id            uint   `gorm:"type:int;primaryKey;autoIncrement;not null"`
	Token         string `gorm:"type:varchar(255);unique;index;not null"`
	BlacklistedAt int32  `gorm:"autoCreateTime;not null"`
}
