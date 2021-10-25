# Security (WIP)
Thanks to NSA for summarizing Zero Trust model, best practice, etc.
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

### Zero Trust

Ref:
[Zero Trust Application Networking with Envoy Proxy](https://www.solo.io/blog/zero-trust-application-networking-with-envoy-proxy/)

### Put theory into practice

* Envoy (v3)

* Backend APIs (Golang)

* Frontend (React)
```sh
# package.json
# "start": "HTTPS=true HOST=0.0.0.0 PORT=443 SSL_CRT_FILE=./certs/atai-tesla-dns-lookup.com.crt SSL_KEY_FILE=./certs/atai-tesla-dns-lookup.com.key react-scripts start",
```