package helpertest

import (
	"encoding/json"
	"finaway/internal/helper"
	"finaway/internal/model/web"
	"io"
	"net/http"
)

func ReadBody(response *http.Response) web.WebResponse {
	body, err := io.ReadAll(response.Body)
	helper.PanicIfError(err)

	var webResponse web.WebResponse
	err = json.Unmarshal(body, &webResponse)
	helper.PanicIfError(err)

	return webResponse
}
