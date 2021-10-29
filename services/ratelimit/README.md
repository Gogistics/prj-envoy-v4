# Ratelimit Server and Redis

```sh
# for dev, run
$ docker run -it \
    --name atai-envoy-security-ratelimit-server \
    --network atai_envoy_security \
    --ip 181.10.0.100 -p 443:443 \
    -v$(pwd):/app -w /app \
    golang:1.17-alpine sh

# for production, read password during build process not hardcodes
$ docker run -d --name atai-envoy-security-ratelimit-redis \
    --network "atai_envoy_security" \
    --ip "181.10.0.105" \
    redis:alpine \
    redis-server --requirepass "atai-envoy-security-123"
```

References:
- [Envoy gRpc Rate limiting](https://venilnoronha.io/envoy-grpc-and-rate-limiting)
- [TCP server with TLS enabled](https://pascal.bach.ch/2015/12/17/from-tcp-to-tls-in-go/)
- [Function chain](https://www.calhoun.io/using-functional-options-instead-of-method-chaining-in-go/)
