package repository

type userRepository struct {
}

func NewUserRepository() UserRepository {
	return &userRepository{}
}
