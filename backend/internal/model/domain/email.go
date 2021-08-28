package domain

import "go.mongodb.org/mongo-driver/bson/primitive"

type Email struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`
	UserID     primitive.ObjectID `bson:"user_id,omitempty"`
	Email      string             `bson:"email,omitempty"`
	VerifiedAt primitive.DateTime `bson:"verified_at,omitempty"`
	IsVerified bool               `bson:"is_verified,omitempty"`
	IsPrimary  bool               `bson:"is_primary,omitempty"`
}
