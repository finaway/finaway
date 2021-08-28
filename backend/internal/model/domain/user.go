package domain

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Name         string             `bson:"name,omitempty" json:"name"`
	Email        string             `bson:"email,omitempty" json:"email"`
	Password     string             `bson:"password,omitempty" json:"-"`
	ProfilePhoto string             `bson:"profile_photo,omitempty" json:"profile_photo"`
	CreatedAt    primitive.DateTime `bson:"created_at,omitempty" json:"created_at"`
	UpdatedAt    primitive.DateTime `bson:"updated_at,omitempty" json:"updated_at"`
}
