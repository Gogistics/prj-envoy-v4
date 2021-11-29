# Certificates

### Public key infrastructure (PKI)

Ref:
- [Public key infrastructure](https://en.wikipedia.org/wiki/Public_key_infrastructure)

### Single Certificate
To generate single certificate.
```sh
$ cd utils/

$ openssl genrsa -out certs/ca.key 4096

$ openssl req -x509 -new -nodes -key certs/ca.key -sha256 -days 1024 -out certs/ca.crt

$ openssl genrsa -out certs/atai-envoy-security.com.key 2048

$ openssl req -new -sha256 \
     -key certs/atai-envoy-security.com.key \
     -subj "/C=US/ST=CA/O=GOGISTICS, Inc./CN=atai-envoy-security.com" \
     -out certs/atai-envoy-security.com.csr

$ openssl x509 -req \
     -in certs/atai-envoy-security.com.csr \
     -CA certs/ca.crt \
     -CAkey certs/ca.key \
     -CAcreateserial \
     -extfile <(printf "subjectAltName=DNS:atai-envoy-security.com") \
     -out certs/atai-envoy-security.com.crt \
     -days 500 \
     -sha256
```

### Wildcard Certificate
Follow the steps of generating certs for single domain, but when specifing the `Common Name`, enter *.<domain>. For example, *.atai-envoy-security.com for `Common Name`. With this apporach, the wildcard SSL will not support multi-layer sub-domains, i.e., the SSL certificate will verify sub1.<domain> but not sub11.sub1.<domain>.


### Subject Alternative Name (SAN) Certificates
First, we need a configuration file for storing all information required for generating SAN cert.

```sh
# to run the following commands, make sure current work directory is utils/certs/
$ openssl genrsa -out san/san.key 4096

$ openssl req -new -sha256 -out san/san.csr -key san/san.key  -config san_certs.conf

$ openssl x509 -req \
     -in san/san.csr \
     -CA ca.crt \
     -CAkey ca.key \
     -CAcreateserial \
     -out san/atai-envoy-san.com.crt \
     -days 500 \
     -sha256
```

Ref:
- [Simple way of generating Wildcard/SAN SSL CSRs for Product Managers](https://rkakodker.medium.com/how-to-simple-way-of-generating-wildcard-san-ssl-csrs-for-product-managers-8c25d715d86f)
