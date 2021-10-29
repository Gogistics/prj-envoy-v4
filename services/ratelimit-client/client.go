package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io/ioutil"
	"log"
	"time"

	rlExten "github.com/envoyproxy/go-control-plane/envoy/extensions/common/ratelimit/v3"
	rls "github.com/envoyproxy/go-control-plane/envoy/service/ratelimit/v3"
	"github.com/google/uuid"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

var (
	caCert = "./utils/certs/atai-envoy-security.com.crt"
	token  string
)

func main() {
	// set up connection to the server
	var err error
	var opts []grpc.DialOption

	// set tls
	var tlsCfg tls.Config
	rootCAs := x509.NewCertPool() // fix unknown certificate error
	pem, err := ioutil.ReadFile(caCert)
	if err != nil {
		log.Fatalf("failed to load root CA certificates  error=%v", err)
	}
	if !rootCAs.AppendCertsFromPEM(pem) {
		log.Fatalf("no root CA certs parsed from file ")
	}
	tlsCfg.RootCAs = rootCAs
	tlsCfg.ServerName = "atai-envoy-security.com"

	creds := credentials.NewTLS(&tlsCfg)
	opts = append(opts, grpc.WithTransportCredentials(creds))
	opts = append(opts, grpc.WithBlock())
	/* Notes:
	- add FailOnNonTempDialError(true) to facilitate issue triage while connection error

	Ref: https://stackoverflow.com/questions/62663990/creating-a-grpc-client-connection-with-the-withblock-option-to-an-asynchronous
	2021/10/29 18:38:03 Dialing RPC server...
	2021/10/29 18:38:03 fail to dial: connection error: desc = "transport: authentication handshake failed: remote error: tls: unrecognized name"
	exit status 1
	*/
	opts = append(opts, grpc.FailOnNonTempDialError(true))
	log.Print("Dialing RPC server...\n")
	conn, err := grpc.Dial("181.10.0.100:50000", opts...)
	if err != nil {
		log.Fatalf("Failed to dial: %v\n", err)
	}
	fmt.Print(conn.Target())
	defer conn.Close()

	// Set up a connection to the server
	// call ratelimit service
	client := rls.NewRateLimitServiceClient(conn)

	// Send a request to the server
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	/* Ref:
	- https://pkg.go.dev/github.com/envoyproxy/go-control-plane@v0.9.9/envoy/extensions/common/ratelimit/v3#RateLimitDescriptor
	*/
	token = uuid.New().String()

	for ith := 0; ith < 6; ith++ {
		// testing
		entries := []*rlExten.RateLimitDescriptor_Entry{
			{Key: "domain", Value: "atai-envoy-security.com"},
			{Key: "path", Value: "/path"},
			{Key: "token", Value: token},
		}
		respOfRateLimiter, err := client.ShouldRateLimit(ctx, &rls.RateLimitRequest{
			Domain: "atai-envoy-security.com",
			Descriptors: []*rlExten.RateLimitDescriptor{{
				Entries: entries,
			}},
		})
		if err != nil {
			log.Fatalf("could not call service: %v\n", err)
		}
		log.Printf("response: %v\n", respOfRateLimiter)
	}
}
