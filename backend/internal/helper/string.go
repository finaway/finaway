package helper

import (
	"regexp"
	"strings"
)

func GetDBNameFromURI(uri string) string {
	lastStr := strings.Split(uri, "/")[3]
	pattern := regexp.MustCompile(`^([a-zA-Z0-9]|_|-)*`)

	return pattern.FindString(lastStr)
}
