package routehandlers

import (
	"encoding/json"
	"net/http"
)

type HttpResponse struct {
	Msg string
}

func HandleDefault(respWriter http.ResponseWriter, req *http.Request) {
	msg := HttpResponse{"Hello Envoy security"}
	jMsg, err := json.Marshal(msg)
	if err != nil {
		http.Error(respWriter, err.Error(), http.StatusInternalServerError)
	} else {
		respWriter.Header().Set("Content-Type", "application/json; charset=utf-8")
		respWriter.Write(jMsg)
	}
}
