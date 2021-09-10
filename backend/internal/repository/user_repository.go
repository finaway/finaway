package repository

import (
	"context"
	"errors"
	"finaway/internal/model/domain"
	"finaway/internal/util/errorutil"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (rp *UserRepository) Save(ctx context.Context, tx *gorm.DB, u domain.User) domain.User {
	u.ID = uuid.NewString()
	err := tx.WithContext(ctx).Create(&u).Error
	errorutil.PanicIfError(err)

	return u
}

func (rp *UserRepository) FindById(ctx context.Context, id string) (domain.User, error) {
	u := domain.User{}

	err := rp.db.WithContext(ctx).Where("id = ?", id).First(&u).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return u, fmt.Errorf("user with id %s not found", id)
	} else {
		errorutil.PanicIfError(err)
	}

	return u, nil
}
