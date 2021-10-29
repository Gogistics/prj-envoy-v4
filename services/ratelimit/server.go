package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"reflect"
	"time"

	utils "github.com/Gogistics/prj-envoy-v4/services/ratelimit/utilhandlers"
	rlService "github.com/envoyproxy/go-control-plane/envoy/service/ratelimit/v3"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"
	"google.golang.org/grpc/keepalive"
	"google.golang.org/grpc/reflection"
	"google.golang.org/grpc/status"
)

type healthServer struct{}
type server struct {
	limit bool
}
type initializer struct{}

var (
	rlWrapper = utils.RedisRateLimitWrapper
	crtPath   *string
	keyPath   *string
	port      *string
	dev       *bool
)

/* Refs:
- https://venilnoronha.io/envoy-grpc-and-rate-limiting
- https://github.com/go-redis/redis_rate
*/
func (ini *initializer) setFlagVals() *initializer {
	crtPath = flag.String("crtPath", "", "tls crt path")
	keyPath = flag.String("keyPath", "", "tls key path")
	dev = flag.Bool("dev", false, "set dev mode")
	port = flag.String("port", ":50000", "server port")
	flag.Parse()
	return ini
}
func (ini *initializer) setCertsPaths() *initializer {
	if *dev && len(*crtPath) == 0 {
		*crtPath = "./utils/certs/atai-envoy-security.com.crt"
	}
	if *dev && len(*keyPath) == 0 {
		*keyPath = "./utils/certs/atai-envoy-security.com.key"
	}
	return ini
}
func init() {
	srvInitializer := initializer{}
	srvInitializer.
		setFlagVals().
		setCertsPaths()
}

// ref: https://pkg.go.dev/google.golang.org/grpc/health/grpc_health_v1
func (hServer *healthServer) Check(ctx context.Context, hcRequest *healthpb.HealthCheckRequest) (*healthpb.HealthCheckResponse, error) {
	log.Println("Handling grpc check request: ", hcRequest.Service)
	return &healthpb.HealthCheckResponse{Status: healthpb.HealthCheckResponse_SERVING}, nil
}

func (hServer *healthServer) Watch(hcRequest *healthpb.HealthCheckRequest, hwServer healthpb.Health_WatchServer) error {
	return status.Error(codes.Unimplemented, "Watch is not implemented")
}

// required for being a ratelimit server
// Ref: https://www.envoyproxy.io/docs/envoy/latest/api-v3/service/ratelimit/v3/rls.proto#envoy-v3-api-msg-service-ratelimit-v3-ratelimitresponse
func (srv *server) ShouldRateLimit(ctx context.Context, req *rlService.RateLimitRequest) (*rlService.RateLimitResponse, error) {
	log.Printf("Client request: %v\n", req)
	fmt.Printf("Request type: %v\n", reflect.TypeOf(req))
	domain := req.Domain
	for _, descriptor := range req.Descriptors {
		for _, entry := range descriptor.Entries {
			fmt.Printf("key: %s ; value: %s\n", entry.Key, entry.Value)
		}
	}

	// todo: remove hardcode
	res, err := rlWrapper.Allow(domain)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("allowed: ", res.Allowed, "remaining: ", res.Remaining)

	// todo: update the code to use redis ratelimiter
	var overallCode rlService.RateLimitResponse_Code
	if srv.limit {
		overallCode = rlService.RateLimitResponse_OVER_LIMIT
		srv.limit = false
	} else {
		overallCode = rlService.RateLimitResponse_OK
		srv.limit = true
	}
	rlResponse := &rlService.RateLimitResponse{OverallCode: overallCode}
	log.Printf("Client request: %v\n", rlResponse)
	return rlResponse, nil
}

func main() {
	// create a TCP listener on port 50000
	if *port == "" {
		flag.Usage()
		log.Fatalln("Missing port")
	}

	tcpListener, err := net.Listen("tcp", *port)
	if err != nil {
		log.Fatalf("Error: failed to listen: %v\n", err)
	} else {
		fmt.Printf("TCP server is listening at: %s\n", tcpListener.Addr())
	}
	// tls config
	creds, errCreds := credentials.NewServerTLSFromFile(*crtPath, *keyPath)
	if errCreds != nil {
		log.Fatalf("Failed to generate credentials %v\n", errCreds)
	}

	var serverOptions []grpc.ServerOption
	serverOptions = []grpc.ServerOption{
		grpc.Creds(creds),
		grpc.NumStreamWorkers(10),
		grpc.ConnectionTimeout(30 * time.Second),
		grpc.KeepaliveEnforcementPolicy(keepalive.EnforcementPolicy{
			MinTime:             5 * time.Second,
			PermitWithoutStream: true,
		}),
		grpc.KeepaliveParams(keepalive.ServerParameters{
			MaxConnectionAge:      10 * time.Second,
			MaxConnectionAgeGrace: 30 * time.Second}),
		grpc.MaxHeaderListSize(10240),
	}
	rpcServer := grpc.NewServer(serverOptions...)
	rlService.RegisterRateLimitServiceServer(rpcServer, &server{limit: false})
	reflection.Register(rpcServer)

	// todo: triage issue of serving tcp listener
	errOfRunningServer := rpcServer.Serve(tcpListener)
	healthpb.RegisterHealthServer(rpcServer, &healthServer{})
	if errOfRunningServer != nil {
		log.Fatalf("Failed to server: %v\n", err)
	}
}
