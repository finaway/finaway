package repository

import (
	"context"
	"errors"
	"finaway/internal/helper"
	"finaway/internal/model/domain"
	"fmt"

	"gorm.io/gorm"
)

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (repo *userRepository) FindById(ctx context.Context, id string) (domain.User, error) {
	user := domain.User{}

	err := repo.db.WithContext(ctx).Where("id = ?", id).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return user, fmt.Errorf("user with id %s not found", id)
	} else {
		helper.PanicIfError(err)
	}

	return user, nil
}
