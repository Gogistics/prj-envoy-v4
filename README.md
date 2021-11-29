# Security (WIP)
Thanks to NSA for summarizing Zero Trust model, best practices, etc.
Thanks to OWASP for summarizing top 10 web security risks.

## Zero Trust
A security model, a set of system design principles, and a coordinated cybersecurity and system management strategy based on an acknowledgement that threats exist both inside and outside traditional network boundaries.

### Basic concepts:
- Zero Trust eliminates implicit trust in any one element, node, or service and therefore requires continuous verification of the operational picture through real-time information from multiple sources to determine access and other system response.
- Zero Trust assume that a breach is inevitable or has likely already occured, so it constantly limits access to only what is needed and looks for anomalous or malicious activities.

### Mindset
- Coordinate and aggressive system monitoring, system management, and defensive operations capabilities.
- Assuming all requests for critical resources and all network traffic may be malicious.
- Assuming all devices and infrastructure may be compromised.
- Accepting that all access approvals to critical resources incur risk, and being prepared to perform rapid damage assessment, control, and recovery operations.

### Guidance
...

### Zero Trust Networking
Zero Trust Networking is an approach to network security that is unified by the principles that the network is always assumed to be hostile. This is in direct contrast to perimeter and "segmentation" approaches that focus on separating the world into trusted and untrusted network segments.

### Requirements of a Zero Trust Network
Zero Trust Networks rely on network access controls with specific requirements:

- Requirement 1: All network connections are subject to enforcement (not just those that cross zone boundaries).

- Requirement 2: Establishing the identity of a remote endpoint is always based on multiple criteria including strong cryptographic proofs of identity. In particular, network-level identifiers like IP address and port are not sufficient on their own as they can be spoofed by a hostile network.

- Requirement 3: All expected and allowed network flows are explicitly allowed. Any connection not explicitly allowed is denied.

- Requirement 4: Compromised workloads must not be able to circumvent policy enforcement.

- Requirement 5: Many Zero Trust Networks also rely on encryption of network traffic to prevent disclosure of sensitive data to hostile entities snooping network traffic. This is not an absolute requirement if private data are not exchanged over the network, but to fit the criteria of a Zero Trust Network, encryption must be used on every network connection if it is required at all. A Zero Trust Network does not distinguish between trusted and untrusted network links or paths. Also note that even when not using encryption for data privacy, cryptographic proofs of authenticity are still used to establish identity.

Ref:
- [Adopt a zero trust network model for security](https://docs.projectcalico.org/security/adopt-zero-trust)
- [What is Zero Trust](https://www.cloudflare.com/learning/security/glossary/what-is-zero-trust/)
- [Zero Trust Architecture: It's All About Identity](https://youtu.be/z4j1z8gJdNo)
- [Envoy security policy](https://github.com/envoyproxy/envoy/security/policy)


## Web Security, OWASP
The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.

### Top 10 of 2021:
1. Broken Access Control moves up from the fifth position; 94% of applications were tested for some form of broken access control. The 34 Common Weakness Enumerations (CWEs) mapped to Broken Access Control had more occurrences in applications than any other category.

2. Cryptographic Failures shifts up one position to #2, previously known as Sensitive Data Exposure, which was broad symptom rather than a root cause. The renewed focus here is on failures related to cryptography which often leads to sensitive data exposure or system compromise.

3. Injection slides down to the third position. 94% of the applications were tested for some form of injection, and the 33 CWEs mapped into this category have the second most occurrences in applications. Cross-site Scripting is now part of this category in this edition.

4. Insecure Design is a new category for 2021, with a focus on risks related to design flaws. If we genuinely want to “move left” as an industry, it calls for more use of threat modeling, secure design patterns and principles, and reference architectures.

5. Security Misconfiguration moves up from #6 in the previous edition; 90% of applications were tested for some form of misconfiguration. With more shifts into highly configurable software, it’s not surprising to see this category move up. The former category for XML External Entities (XXE) is now part of this category.

6. Vulnerable and Outdated Components was previously titled Using Components with Known Vulnerabilities and is #2 in the Top 10 community survey, but also had enough data to make the Top 10 via data analysis. This category moves up from #9 in 2017 and is a known issue that we struggle to test and assess risk. It is the only category not to have any Common Vulnerability and Exposures (CVEs) mapped to the included CWEs, so a default exploit and impact weights of 5.0 are factored into their scores.

7. Identification and Authentication Failures was previously Broken Authentication and is sliding down from the second position, and now includes CWEs that are more related to identification failures. This category is still an integral part of the Top 10, but the increased availability of standardized frameworks seems to be helping.

8. Software and Data Integrity Failures is a new category for 2021, focusing on making assumptions related to software updates, critical data, and CI/CD pipelines without verifying integrity. One of the highest weighted impacts from Common Vulnerability and Exposures/Common Vulnerability Scoring System (CVE/CVSS) data mapped to the 10 CWEs in this category. Insecure Deserialization from 2017 is now a part of this larger category.

9. Security Logging and Monitoring Failures was previously Insufficient Logging & Monitoring and is added from the industry survey (#3), moving up from #10 previously. This category is expanded to include more types of failures, is challenging to test for, and isn’t well represented in the CVE/CVSS data. However, failures in this category can directly impact visibility, incident alerting, and forensics.

10. Server-Side Request Forgery is added from the Top 10 community survey (#1). The data shows a relatively low incidence rate with above average testing coverage, along with above-average ratings for Exploit and Impact potential. This category represents the scenario where the security community members are telling us this is important, even though it’s not illustrated in the data at this time.

Ref:
[Top 10 for 2021](https://owasp.org/Top10/)
[Zaproxy](https://github.com/zaproxy/zaproxy)
[Getting start with Zaproxy](https://www.zaproxy.org/getting-started/)
[ZAP Docker User Guide](https://www.zaproxy.org/docs/docker/about/)

## Envoy Security

### TLS
- Underlying implementation
- FIPS 140-2
- Enabling certificate verification
- Certificate selection
- Secret discovery service (SDS)
- OCSP Stapling
- Authentication filter
- Custom handshaker extension
- Trouble shooting

### JSON Web Token (JWT) Authentication

### External Authorization
- Service Definition

### Role Based Access Control
- Policy
- Shadow Policy
- Condition

### Threat model
- Confidentiality, integrity and availability
- Data and control plane
- Core and extensions

Ref:
- [Threat model](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/security/threat_model)

### External dependencies
- Data plane (core)
- Data plane (extensions)
- Control plane
- API
- Observability (core)
- Observability (extensions)
- Build
- Miscellaneous
- Test only

### Google Vulnerability Reward Program (VRP)
- Rules
- Threat model
- Execution environment
- Objectives
- Working with the Docker images
- Rebuilding the Docker image

Ref:
[Envoy Security](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/security/security)
[Using Envoy Proxy to Improve Reliability, Security, and Observability of Microservices](https://betterprogramming.pub/using-envoy-proxy-to-improve-reliability-security-and-observability-of-microservices-85032e08d3f4)

### Zero Trust

Ref:
[Zero Trust Application Networking with Envoy Proxy](https://www.solo.io/blog/zero-trust-application-networking-with-envoy-proxy/)


## Put theory into practice
After going over Zero Trust security and OWASP top 10, let's learn how to improve the security of the web services ,proxies, etc. based on the theories that we just learned.

**TLS**: This is an encryption protocol that allows client/server applications to communicate over the Internet in a way that is designed to prevent eavesdropping tampering, and message forgery.

Ref: [ The Transport Layer Security (TLS) Protocol Version 1.3](https://datatracker.ietf.org/doc/html/draft-ietf-tls-tls13-28)

**Ratelimit**: This is a mechanism to limit the amount of requests within a certain time span to make sure the destination cluster is not overloaded and to prevent the services from DoS. In general, you would easily find the examples of running ratelimiter with Istio. But here let's learn how Envoy works with the ratelimit server. The container topology of this tutorial is [here](https://drive.google.com/file/d/1S_8GJFm0cAeIoAKJFsJMm4OrcWc5L1m0/view?usp=sharing).  In terms of build tool, Bazel has been used as the build tool of the official Envoy project so let's build the API application, Envoy proxy, ratelimit server, and Redis by Bazel.

Ref: [RateLimit Header Fields for HTTP](https://tools.ietf.org/id/draft-polli-ratelimit-headers-00.html)


**Circuit Breakers**: This is a mechanism to stop the requests in advance to make sure the cluster is not overloaded and to prevent the services from DoS.

Ref: [Circuit breaking](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking)

**JSON Web Token (JWT) Authentication**: JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.  The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.

Ref: [JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)

**MIS**

* Traffic shadowing: The router is capable of shadowing traffic from one cluster to another. The current implementation is “fire and forget,” meaning Envoy will not wait for the shadow cluster to respond before returning the response from the primary cluster. All normal statistics are collected for the shadow cluster making this feature useful for testing. Besides testing, traffic shadowing is also useful for the API migration because sometimes both depcrecated and new endpoints need to keep for a while.

Ref:
- [config.route.v3.RouteAction.RequestMirrorPolicy¶](https://www.envoyproxy.io/docs/envoy/latest/api-v3/config/route/v3/route_components.proto#config-route-v3-routeaction-requestmirrorpolicy)
- [Traffic shadowing](https://blog.markvincze.com/shadow-mirroring-with-envoy/)


**Steps**:

1. Set up Bazel environment (see Bazel files of this repository for reference)
Create .bazelrc, .bazelversion, WORKSPACE, root BUILD.bazel, and deps.bzl

```sh
# Bazel tool for Golang applications
$ bazel run //:gazelle

# update repos deps
$ bazel run //:gazelle -- update-repos -from_file=go.mod -to_macro=deps.bzl%go_dependencies
```

2. Generate certs
The following commands are for generating regular certs. If need to generate wildcard certs, [here](https://rkakodker.medium.com/how-to-simple-way-of-generating-wildcard-san-ssl-csrs-for-product-managers-8c25d715d86f) is a good reference.
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

3. Bring up network/container topology
Let's manually run the API application and ratelimit server. Once we're sure the ratelimit server works as epected, we can build all images by Bazel and then bring up all containers one by one.

* Initialize Docker network
```sh
# In general, the networks of ratelimit server, front proxy, and API services are different; here, let's just create a new network for the sake of simplicity
$ ./utils/scripts/init_networks.sh
```

* Spin up Envoy frontend proxy (see utils/configs/envoy-front-proxy.yaml for reference)
```sh
$ bazel build --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64 //envoys:envoy-front-proxy-v0.0.0
$ bazel run --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64 //envoys:envoy-front-proxy-v0.0.0

$ docker run -d \
     --name atai-envoy-security-front-proxy \
     -p 443:443 -p 8001:8001 \
     --network atai_envoy_security \
     --ip "181.10.0.10" \
     --log-opt mode=non-blocking \
     --log-opt max-buffer-size=5m \
     --log-opt max-size=100m \
     --log-opt max-file=5 \
     alantai/prj-envoy-v4/envoys:envoy-front-proxy-v0.0.0
```

* Ratelimit server and the corresponding Redis
```sh
# run Redis
$ docker run -d --name atai-envoy-security-ratelimit-redis \
    --network "atai_envoy_security" \
    --ip "181.10.0.105" \
    redis:alpine \
    redis-server --requirepass "atai-envoy-security-123"

# run ratelimit server
$ docker run -it \
    --name atai-envoy-security-ratelimit-server \
    --network atai_envoy_security \
    --ip 181.10.0.100 -p 443:443 \
    -v$(pwd):/app -w /app \
    golang:1.17-alpine sh

$ docker exec -it atai-envoy-security-ratelimit-server sh

/app \# go run services/ratelimit/server.go -dev
# Redis-Ping: PONG
# TCP server is listening at: [::]:50000
``` 

* Backend API in Golang
```sh
```

* Test
Once all containers have been brought up and the applications are running sucessfully, let's take a look at the ratelimit configuration of Enovy and thencompare it with the testing logs.
```yaml
- name: api_servers
  domains: 
  - "atai-envoy-security.com"
  routes:
  - match: {prefix: "/api/v1"}
    route:
      cluster: api_service
      rate_limits:
        - actions:
            - source_cluster: {}
            - destination_cluster: {}
        - actions:
          - header_value_match:
            {
              descriptor_value: "path",
              headers: [
                {
                  name: ":path",
                  prefix_match: "/api/v1",
                },
              ],
            }
        - actions:
          - header_value_match:
            {
              descriptor_value: "get",
              headers: [
                {
                  name: ":method",
                  prefix_match: "GET",
                }
              ],
            }
        - actions:
          - request_headers:
            {
              descriptor_key: jwt-tkn,
              header_name: access_token,
            }
          - request_headers:
            {
              descriptor_key: jwt-type,
              header_name: token_type,
            }
```

```sh
# send a request to API server
$ curl --header "access_token:abcdefg123456" --header "token_type:Bearer" -k -v https://atai-envoy-security.com/api/v1
# *   Trying 0.0.0.0...
# * TCP_NODELAY set
# * Connected to atai-envoy-security.com (127.0.0.1) port 443 (#0)
# * ALPN, offering h2
# * ALPN, offering http/1.1
# * successfully set certificate verify locations:
# *   CAfile: /etc/ssl/cert.pem
#   CApath: none
# * TLSv1.2 (OUT), TLS handshake, Client hello (1):
# * TLSv1.2 (IN), TLS handshake, Server hello (2):
# * TLSv1.2 (IN), TLS handshake, Certificate (11):
# * TLSv1.2 (IN), TLS handshake, Server key exchange (12):
# * TLSv1.2 (IN), TLS handshake, Request CERT (13):
# * TLSv1.2 (IN), TLS handshake, Server finished (14):
# * TLSv1.2 (OUT), TLS handshake, Certificate (11):
# * TLSv1.2 (OUT), TLS handshake, Client key exchange (16):
# * TLSv1.2 (OUT), TLS change cipher, Change cipher spec (1):
# * TLSv1.2 (OUT), TLS handshake, Finished (20):
# * TLSv1.2 (IN), TLS change cipher, Change cipher spec (1):
# * TLSv1.2 (IN), TLS handshake, Finished (20):
# * SSL connection using TLSv1.2 / ECDHE-RSA-CHACHA20-POLY1305
# * ALPN, server accepted to use h2
# * Server certificate:
# *  subject: C=US; ST=CA; O=GOGISTICS, Inc.; CN=atai-envoy-security.com
# *  start date: Oct 25 19:02:42 2021 GMT
# *  expire date: Mar  9 19:02:42 2023 GMT
# *  issuer: C=TW; ST=Taiwan; L=Kaohsiung; O=Gogistics; OU=DevOps; emailAddress=gogistics@gogistcs-tw.com
# *  SSL certificate verify result: unable to get local issuer certificate (20), continuing anyway.
# * Using HTTP2, server supports multi-use
# * Connection state changed (HTTP/2 confirmed)
# * Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
# * Using Stream ID: 1 (easy handle 0x7fd7ce810a00)
# > GET /api/v1 HTTP/2
# > Host: atai-envoy-security.com
# > User-Agent: curl/7.64.1
# > Accept: */*
# > access_token:abcdefg123456
# > token_type:Bearer
# > 
# * Connection state changed (MAX_CONCURRENT_STREAMS == 2147483647)!
# < HTTP/2 200 
# < content-type: application/json; charset=utf-8
# < content-length: 30
# < date: Sun, 31 Oct 2021 23:37:10 GMT
# < x-envoy-upstream-service-time: 6
# < server: envoy
# < 
# * Connection #0 to host atai-envoy-security.com left intact
# {"Msg":"Hello Envoy security"}* Closing connection 0

# Switch to the terminal of running ratelimit server and you can see the logs as below:
/app \# go run services/ratelimit/server.go -dev
# Redis-Ping: PONG
# TCP server is listening at: [::]:50000
# 2021/11/01 00:24:49 Client request: domain:"*" descriptors:{entries:{key:"source_cluster"} entries:{key:"destination_cluster" value:"api_service"}} descriptors:{entries:{key:"header_match" value:"path"}} descriptors:{entries:{key:"header_match" value:"get"}} descriptors:{entries:{key:"jwt-tkn" value:"abcdefg123456"} entries:{key:"jwt-type" value:"Bearer"}}
# Request type: *envoy_service_ratelimit_v3.RateLimitRequest
# key: source_cluster ; value: 
# key: destination_cluster ; value: api_service
# key: header_match ; value: path
# key: header_match ; value: get
# key: jwt-tkn ; value: abcdefg123456
# key: jwt-type ; value: Bearer
# allowed:  1 remaining:  1
# 2021/11/01 00:24:49 Client request: overall_code:OK
# ...
```

* Frontend (React)
```sh
# package.json
# "start": "HTTPS=true HOST=0.0.0.0 PORT=443 SSL_CRT_FILE=./certs/atai-envoy-security.com.crt SSL_KEY_FILE=./certs/atai-envoy-security.com.key react-scripts start",
```