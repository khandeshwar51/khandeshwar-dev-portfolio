# 20-Point Web & Application Security Standard

> **MANDATORY POLICY**: Every website, web application, API, and mobile backend developed or maintained in this workspace MUST strictly enforce this 20-Point Security Architecture across all 4 defense layers before production deployment.

---

## Layer 1: Injection & Input Defense (5 Points)

1. **SQL Injection (SQLi) Prevention**:
   - Never concatenate or interpolate user input directly into SQL strings.
   - Use parameterized queries, prepared statements, or battle-tested ORMs (Prisma, Drizzle, TypeORM, SQLAlchemy).
   - In raw queries, always bind parameters (e.g. `$1, $2` or `?`).

2. **Cross-Site Scripting (XSS) Mitigation**:
   - Sanitize all untrusted HTML and rich-text input using libraries like `DOMPurify` before rendering.
   - Rely on modern framework automatic escaping (React JSX, Vue template interpolations).
   - Never use `dangerouslySetInnerHTML` or `v-html` with unsanitized user content.
   - Enforce a Content Security Policy (`Content-Security-Policy: default-src 'self'`).

3. **Cross-Site Request Forgery (CSRF) Protection**:
   - Implement cryptographically random anti-CSRF tokens for all state-changing HTTP methods (`POST`, `PUT`, `PATCH`, `DELETE`).
   - Configure session and auth cookies with `SameSite=Lax` or `SameSite=Strict`.

4. **File Upload Validation & Sandboxing**:
   - Validate file MIME types, file headers (magic bytes), and file extensions against a strict allowlist.
   - Enforce maximum file size limits on the server and reverse proxy (Nginx / Cloudflare).
   - Rename uploaded files to random UUIDs; never store files using original client-supplied filenames.
   - Serve user uploads from an isolated, cookieless domain or object store (Cloudflare R2, AWS S3, GCS) with `Content-Disposition: attachment` or sandboxed `Content-Type`.

5. **Server-Side Request Forgery (SSRF) Audit**:
   - Validate and parse all user-supplied destination URLs against a strict domain allowlist.
   - Block requests to loopback, private, and internal network CIDR ranges (`127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254` cloud metadata).
   - Disable automatic HTTP redirect following in backend fetch clients when communicating with user-provided endpoints.

---

## Layer 2: Auth & Access Control (6 Points)

6. **BOLA / IDOR (Broken Object Level Authorization) Elimination**:
   - Never trust client-supplied entity IDs without verifying ownership on the server side.
   - Always validate that the authenticated user (`req.user.id`) owns or has explicit permission to access the requested resource (`WHERE id = :id AND user_id = :current_user_id`).

7. **Rate Limiting & Abuse Prevention**:
   - Implement rate limiters on all authentication routes (`/api/login`, `/api/signup`, `/api/forgot-password`, `/api/otp`) using Redis token-bucket or sliding-window algorithms.
   - Apply global API rate limits to protect against DoS, credential stuffing, and scraping.

8. **Cryptographic Password Hashing**:
   - Never store plaintext or weakly hashed passwords (MD5, SHA1, SHA256).
   - Use adaptive, memory-hard hashing algorithms: **Argon2id** (recommended) or **bcrypt** (work factor $\ge 12$).

9. **Multi-Factor Authentication (MFA / 2FA)**:
   - Provide Time-based One-Time Password (TOTP via RFC 6238) or WebAuthn/FIDO2 hardware key support for sensitive accounts and administrative operations.
   - Securely store hashed backup/recovery codes.

10. **Server-Side Role-Based Access Control (RBAC)**:
    - Enforce permissions and role checks strictly on the server/middleware level.
    - Never rely solely on client-side routing, UI button hiding, or disabled attributes for security boundaries.

11. **Database Row-Level Security (RLS)**:
    - Enable Row Level Security on database tables (PostgreSQL, Supabase, Firebase Firestore Rules).
    - Ensure database policies restrict reads, inserts, updates, and deletes to rows matching the authenticated tenant or user ID.

---

## Layer 3: Secrets & Token Hardening (4 Points)

12. **Cryptographically Strong JWT Secrets**:
    - Sign JSON Web Tokens using high-entropy secrets (minimum 256 bits / 32 bytes random hex/base64) or asymmetric key pairs (RS256 / EdDSA).
    - Set explicit, short expiration times (`exp`, e.g., 15 minutes for access tokens) and enforce strict signature and algorithm verification (`algorithms: ['HS256']`).

13. **Server-Side API Key Storage**:
    - Keep all private API keys, database credentials, and signing secrets in server environment variables (`.env`).
    - Never expose secrets in client-side bundles (e.g. prefixing secrets with `VITE_` or `NEXT_PUBLIC_` is strictly forbidden).

14. **HttpOnly Cookie Storage (No LocalStorage Tokens)**:
    - Never store access tokens, refresh tokens, or session IDs in browser `localStorage` or `sessionStorage` (which are vulnerable to theft via XSS).
    - Deliver session and auth tokens in `HttpOnly`, `Secure`, `SameSite=Lax/Strict` cookies.

15. **Default Credentials Replacement**:
    - Change all default credentials, admin passwords, database ports, and boilerplate seed accounts before deployment.
    - Enforce strict password complexity for initial administrative bootstrap.

---

## Layer 4: Config & Production Hygiene (5 Points)

16. **Strict Cross-Origin Resource Sharing (CORS)**:
    - Lock down `Access-Control-Allow-Origin` to explicit, trusted domain origins.
    - Never use wildcard `*` with `Access-Control-Allow-Credentials: true`.

17. **Webhook Signature Cryptographic Verification**:
    - Validate webhook request payloads against cryptographic signatures (HMAC-SHA256) provided in headers (e.g., Stripe `Stripe-Signature`, Razorpay, GitHub `X-Hub-Signature-256`) using raw unparsed request bodies.

18. **Source Map Obfuscation**:
    - Disable production JavaScript source maps (`sourcemap: false`, `productionSourceMap: false`) or host `.map` files privately behind internal authorization.
    - Prevent exposing backend routes, internal business logic, and comments in public browser DevTools.

19. **Production Log Sanitization**:
    - Strip and redact sensitive data from production logs: passwords, credit cards, auth tokens, session headers, and Personally Identifiable Information (PII).
    - Never log raw request bodies on authentication or payment endpoints.

20. **Dependency Vulnerability Auditing**:
    - Run automated security checks (`npm audit`, `pnpm audit`, Snyk, Dependabot) in CI/CD pipelines.
    - Keep third-party dependencies updated and immediately patch libraries with known Common Vulnerabilities and Exposures (CVEs).
