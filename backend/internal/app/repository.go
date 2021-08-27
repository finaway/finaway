package app

import "finaway/internal/repository"

type Repository struct {
	UserRepository repository.UserRepository
}
