package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/Gogistics/prj-envoy-v4/services/api-v1/routehandlers"
	"github.com/gorilla/mux"
)

var (
	port    *uint
	crtPath *string
	keyPath *string
	dev     *bool
)

func setFlagsVals() {
	port = flag.Uint("port", 443, "set port")
	crtPath = flag.String("crtPath", "", "set crtPath")
	keyPath = flag.String("keyPath", "/.ssh/atai-zero-trust.com.key", "set keyPath")
	dev = flag.Bool("dev", false, "set dev mode")
	flag.Parse()
}
func setCertsPaths() {
	if *dev && len(*crtPath) == 0 {
		*crtPath = "./utils/certs/atai-zero-trust.com.crt"
	}
	if *dev && len(*keyPath) == 0 {
		*keyPath = "./utils/certs/atai-zero-trust.com.key"
	}
}
func int() {
	setFlagsVals()
	setCertsPaths()
}

func main() {
	// 1. define router
	appRouter := newRouter()

	// 2. config http server
	tlsPort := fmt.Sprintf(":%d", *port)

	// 3. create middleware chain; add as many middlewares as needed
	muxWithMiddlewares := http.TimeoutHandler(appRouter, 4*time.Second, "Timeout!")

	// 4. run server with TLS enabled
	errOfServerSetup := http.ListenAndServeTLS(tlsPort, *crtPath, *keyPath, muxWithMiddlewares)
	if errOfServerSetup != nil {
		log.Fatalln("Failed to start ListenAndServeTLS: ", errOfServerSetup)
	}
}

func newRouter() *mux.Router {
	// 1. define router
	router := mux.NewRouter()
	router.HandleFunc("/api/v1", routehandlers.HandleDefault).Methods(http.MethodGet)
	router.HandleFunc("/api/v1/dns-lookup", routehandlers.HandleDNSLookup).Methods(http.MethodPost)
	router.NotFoundHandler = router.NewRoute().HandlerFunc(http.NotFound).GetHandler()
	return router
}
