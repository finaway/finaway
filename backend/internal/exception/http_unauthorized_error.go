package exception

type UnauthorizedError struct {
	Message string
}

func NewUnauthorizedError(err string) UnauthorizedError {
	return UnauthorizedError{err}
}

func IsUnauthorizedError(err error) bool {
	_, ok := err.(UnauthorizedError)
	return ok
}

func (err UnauthorizedError) Error() string {
	return err.Message
}
