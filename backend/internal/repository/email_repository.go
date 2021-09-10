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

type EmailRepository struct {
	db *gorm.DB
}

func NewEmailRepository(db *gorm.DB) *EmailRepository {
	return &EmailRepository{db}
}

func (rp *EmailRepository) Save(ctx context.Context, tx *gorm.DB, e domain.Email) domain.Email {
	e.ID = uuid.NewString()
	err := tx.WithContext(ctx).Create(&e).Error
	errorutil.PanicIfError(err)

	return e
}

func (rp *EmailRepository) FindPrimaryByUserID(ctx context.Context, id string) (domain.Email, error) {
	var e domain.Email

	err := rp.db.WithContext(ctx).Where("user_id = ? and is_primary = true", id).First(&e).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return e, fmt.Errorf("email with user_id %s not found", id)
	} else {
		errorutil.PanicIfError(err)
	}

	return e, nil
}

func (r *EmailRepository) FindPrimaryByEmail(ctx context.Context, e string) (domain.Email, error) {
	var em domain.Email

	err := r.db.WithContext(ctx).Where("email = ? and is_primary = true", e).First(&em).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return em, fmt.Errorf("email %s not found", e)
	} else {
		errorutil.PanicIfError(err)
	}

	return em, nil
}
