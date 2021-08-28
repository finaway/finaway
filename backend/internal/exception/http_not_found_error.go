package exception

type NotFoundError struct {
	Message string
}

func NewNotFoundError(err string) NotFoundError {
	return NotFoundError{err}
}

func IsNotFoundError(err error) bool {
	_, ok := err.(NotFoundError)
	return ok
}

func (err NotFoundError) Error() string {
	return err.Message
}
