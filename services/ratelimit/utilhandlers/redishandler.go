package utilhandlers

import (
	"context"
	"fmt"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/go-redis/redis_rate/v9"
)

/* Ref:
- https://pkg.go.dev/github.com/go-redis/redis_rate/v9@v9.1.2#section-readme
*/
type redisClientWrapper struct {
	Client *redis.Client
}
type rateLimiterWrapper struct {
	limiter *redis_rate.Limiter
}

var (
	redisCtx              = context.Background()
	rlCtx                 = context.Background()
	RedisRateLimitWrapper = initRateLimiterWrapper()
)

func initRateLimiterWrapper() rateLimiterWrapper {
	rc := initRedisClientWrapper().Client
	pong, err := rc.Ping(rlCtx).Result()
	if err != nil {
		fmt.Print("redis conn failed\n")
	} else {
		fmt.Printf("Redis-Ping: %v\n", pong)
	}

	return rateLimiterWrapper{redis_rate.NewLimiter(rc)}
}

func initRedisClientWrapper() redisClientWrapper {
	return redisClientWrapper{
		redis.NewClient(&redis.Options{
			Addr:         "181.10.0.105:6379",
			Password:     "atai-envoy-security-123",
			DB:           0,
			DialTimeout:  5 * time.Second,
			ReadTimeout:  10 * time.Second,
			WriteTimeout: 10 * time.Second,
			PoolSize:     30,
			PoolTimeout:  10 * time.Second,
		}),
	}
}

func (rlWrapper *rateLimiterWrapper) Allow(key string) (*redis_rate.Result, error) {
	return rlWrapper.limiter.Allow(rlCtx, key, redis_rate.PerSecond(10))
}
