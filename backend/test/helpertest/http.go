package helpertest

import (
	"encoding/json"
	"finaway/internal/model/web"
	"finaway/internal/util/errorutil"
	"io"
	"net/http"
)

func ReadBody(resp *http.Response) web.WebResponse {
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	errorutil.PanicIfError(err)

	var webResponse web.WebResponse
	err = json.Unmarshal(body, &webResponse)
	errorutil.PanicIfError(err)

	return webResponse
}
