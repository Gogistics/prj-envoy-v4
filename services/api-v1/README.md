```sh
# for dev, run
$ docker run -it --name atai-envoy-security-golang-api --network atai_envoy_security --ip 181.10.0.21 -v$(pwd):/app -w /app golang:1.17-alpine sh
```