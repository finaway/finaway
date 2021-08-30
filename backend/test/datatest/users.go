package datatest

import (
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func hashPassword(pwd string) string {
	pwdHash, _ := helper.HashPassword(pwd)
	return pwdHash
}

var Users = []domain.User{
	{
		ID:        primitive.NewObjectID(),
		Name:      "Agus Stiawan",
		Email:     "agusstiawan@test.com",
		Password:  hashPassword("agus stiawan"),
		CreatedAt: primitive.DateTime(time.Now().Unix()),
	},
	{
		ID:        primitive.NewObjectID(),
		Name:      "John Doe",
		Email:     "johndoe@test.com",
		Password:  hashPassword("john doe"),
		CreatedAt: primitive.DateTime(time.Now().Unix()),
	},
	{
		ID:        primitive.NewObjectID(),
		Name:      "Jane Doe",
		Email:     "janedoe@test.com",
		Password:  hashPassword("jane doe"),
		CreatedAt: primitive.DateTime(time.Now().Unix()),
	},
	{
		ID:        primitive.NewObjectID(),
		Name:      "Lorem Ipsum",
		Email:     "loremipsum@test.com",
		Password:  hashPassword("lorem ipsum"),
		CreatedAt: primitive.DateTime(time.Now().Unix()),
	},
	{
		ID:        primitive.NewObjectID(),
		Name:      "Dolor Sit",
		Email:     "dolorsit@test.com",
		Password:  hashPassword("dolor sit"),
		CreatedAt: primitive.DateTime(time.Now().Unix()),
	},
}
