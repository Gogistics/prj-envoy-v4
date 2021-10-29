#!/bin/bash

# Some developers asked me why trap
# Ref: http://redsymbol.net/articles/bash-exit-traps/
trap "finish" INT TERM

finish() {
    local existcode=$?
    echo "Abort..."
    echo "Cleaning up environment..."
    exit $existcode
}

ENVOY_SECURITY_NETWORK="atai_envoy_security"
ENVOY_SECURITY_NETWORK_INSPECTION=$(docker network inspect $ENVOY_SECURITY_NETWORK)
ENVOY_SECURITY_NETWORK_INSPECTION=$?
if [ $ENVOY_SECURITY_NETWORK_INSPECTION -ne 0 ]
then
    echo "Creating $ENVOY_SECURITY_NETWORK network..."
    docker network create \
        --driver="bridge" \
        --subnet="181.10.0.0/24" \
        --gateway="181.10.0.1" \
        $ENVOY_SECURITY_NETWORK
else
    echo "$ENVOY_SECURITY_NETWORK already exists"
fi