package helper

import (
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

func InjectValidate(validate *validator.Validate) {
	validate.RegisterTagNameFunc(func(field reflect.StructField) string {
		name := strings.SplitN(field.Tag.Get("json"), ",", 2)[0]

		if name == "-" {
			return ""
		}

		return name
	})
}
