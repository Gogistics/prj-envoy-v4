# Ratelimit Client
The client implementation is used for development and testing.

```sh
$ docker run -it --name atai-envoy-security-ratelimit-client --network atai_envoy_security --ip 181.10.0.99 -v$(pwd):/app -w /app golang:1.17-alpine sh
```