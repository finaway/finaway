package helpertest

import (
	"finaway/internal/util/errorutil"
	"os"
	"regexp"
)

func GetMainDir() string {
	pattern := regexp.MustCompile(`(.*?)backend\/`)

	dir, err := os.Getwd()
	errorutil.PanicIfError(err)

	return pattern.FindString(dir)
}
