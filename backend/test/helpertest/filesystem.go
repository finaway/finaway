package helpertest

import (
	"finaway/internal/helper"
	"os"
	"regexp"
)

func GetMainDir() string {
	pattern := regexp.MustCompile(`(.*?)backend\/`)

	dir, err := os.Getwd()
	helper.PanicIfError(err)

	return pattern.FindString(dir)
}
