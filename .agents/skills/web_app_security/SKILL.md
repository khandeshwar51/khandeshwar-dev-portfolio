---
name: web_app_security
description: >
  Mandatory 20-Point Web & Application Security Architecture Standard across 4 defense layers
  (Injection & Input Defense, Auth & Access Control, Secrets & Token Hardening, Config & Production Hygiene).
  Enforce this standard whenever designing, implementing, auditing, or deploying any website,
  API, microservice, or web/mobile application.
---

# 20-Point Web & Application Security Architecture Standard

This skill establishes the non-negotiable **20-Point Security Standard across 4 defense layers** for every website, web application, API, and mobile backend developed or audited with Antigravity.

---

## 🛡️ Layer 1: Injection & Input Defense (5 Points)

### 1. SQL Injection (SQLi) Prevention
- **Rule:** Never concatenate or interpolate untrusted user input directly into SQL queries.
- **Implementation:**
  - Use parameterized queries, prepared statements, or modern ORMs/Query Builders (Prisma, Drizzle, TypeORM, SQLAlchemy, Kysely).
  - When raw SQL is required, always bind variables as parameters (e.g., `$1, $2` in Postgres or `?` in MySQL/SQLite).
  ```typescript
  // ❌ VULNERABLE
  const query = `SELECT * FROM users WHERE email = '${email}'`;

  // ✅ SECURE (Parameterized)
  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  // ✅ SECURE (ORM)
  const user = await prisma.user.findUnique({ where: { email } });
  ```

### 2. Cross-Site Scripting (XSS) Mitigation
- **Rule:** Sanitize all untrusted HTML and rich-text input before rendering; never trust client-supplied markup.
- **Implementation:**
  - Sanitize rich text using battle-tested libraries such as `DOMPurify` before injecting into DOM.
  - Rely on framework auto-escaping (React JSX `{content}`, Vue interpolations `{{ content }}`).
  - Strictly avoid `dangerouslySetInnerHTML` or `v-html` with unsanitized user inputs.
  - Set strict Content Security Policy (CSP) headers:
    `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';`

### 3. Cross-Site Request Forgery (CSRF) Protection
- **Rule:** Protect all state-changing HTTP endpoints (`POST`, `PUT`, `PATCH`, `DELETE`) against forged cross-site requests.
- **Implementation:**
  - Issue cryptographically random anti-CSRF double-submit tokens or synchronize tokens in headers (`X-CSRF-Token`).
  - Configure session and auth cookies with `SameSite=Lax` or `SameSite=Strict`.

### 4. File Upload Validation & Sandboxing
- **Rule:** Treat every uploaded file as potentially hostile executable code.
- **Implementation:**
  - Validate file extension, MIME type, and magic bytes (file signature check via `file-type` or binary sniffing).
  - Enforce hard file size limits at both the reverse proxy (Nginx, Cloudflare) and application level.
  - Rename uploaded files to random UUIDs (`${crypto.randomUUID()}.${safeExt}`); never store original client-provided filenames on disk.
  - Host uploaded user files on an isolated, cookieless domain or cloud bucket (AWS S3, Cloudflare R2, Google Cloud Storage) with `Content-Disposition: attachment` or sandboxed `Content-Type`.

### 5. Server-Side Request Forgery (SSRF) Audit
- **Rule:** Never allow arbitrary HTTP fetch requests to user-supplied URLs without strict boundary enforcement.
- **Implementation:**
  - Parse and validate user-provided URLs against a strict domain/host allowlist.
  - Resolve DNS and block requests targeting loopback addresses (`127.0.0.0/8`, `localhost`, `::1`), private networks (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), link-local addresses, and cloud instance metadata services (`169.254.169.254`).
  - Disable automatic HTTP redirect following in backend fetch clients when communicating with user-provided endpoints.

---

## 🔐 Layer 2: Auth & Access Control (6 Points)

### 6. BOLA / IDOR (Broken Object Level Authorization) Elimination
- **Rule:** Never trust client-supplied resource IDs without verifying ownership on the server.
- **Implementation:**
  - Always verify that the authenticated user (`req.user.id` or `session.userId`) owns or is authorized to access the requested entity.
  ```typescript
  // ❌ VULNERABLE (IDOR)
  const order = await db.order.findUnique({ where: { id: req.params.orderId } });

  // ✅ SECURE (Tenant & Owner Enforced)
  const order = await db.order.findFirst({
    where: { id: req.params.orderId, userId: req.user.id }
  });
  if (!order) throw new NotFoundError('Order not found or unauthorized');
  ```

### 7. Rate Limiting & Abuse Prevention
- **Rule:** Throttle sensitive endpoints to prevent brute-force attacks, credential stuffing, and DoS.
- **Implementation:**
  - Apply strict sliding-window or token-bucket rate limits on authentication routes (`/api/login`, `/api/signup`, `/api/forgot-password`, `/api/otp`) using Redis or memory store (e.g. 5 attempts per 15 minutes per IP/account).
  - Apply global API rate limits (e.g. 100 requests per minute per IP) to guard against scraping and resource exhaustion.

### 8. Cryptographic Password Hashing
- **Rule:** Never store plaintext or weakly hashed passwords (MD5, SHA1, SHA256).
- **Implementation:**
  - Use adaptive, memory-hard hashing algorithms: **Argon2id** (recommended) or **bcrypt** (work factor $\ge 12$).
  - Always generate unique, cryptographically secure salts per password.

### 9. Multi-Factor Authentication (MFA / 2FA)
- **Rule:** Provide robust second-factor authentication for sensitive accounts and administrative operations.
- **Implementation:**
  - Support Time-based One-Time Passwords (TOTP via RFC 6238, Google Authenticator) and WebAuthn/FIDO2 hardware security keys.
  - Generate and securely store cryptographically hashed one-time backup/recovery codes.

### 10. Server-Side Role-Based Access Control (RBAC)
- **Rule:** Enforce permissions strictly on the server and API middleware level.
- **Implementation:**
  - Never rely on client-side routing, hidden UI buttons, or disabled state as security boundaries.
  - Enforce explicit role/permission checks in route middleware (`authorize(['admin', 'billing_manager'])`) before running business logic.

### 11. Database Row-Level Security (RLS)
- **Rule:** Enforce data access policies at the database engine level as defense-in-depth.
- **Implementation:**
  - Enable Row Level Security in PostgreSQL / Supabase tables (`ALTER TABLE documents ENABLE ROW LEVEL SECURITY;`).
  - Create explicit RLS policies linking row access to the authenticated user ID (`USING (user_id = auth.uid())`).
  - In Firestore, author strict `firestore.rules` validating `request.auth.uid == resource.data.userId`.

---

## 🔑 Layer 3: Secrets & Token Hardening (4 Points)

### 12. Cryptographically Strong JWT Secrets
- **Rule:** Protect token signing integrity with high-entropy cryptographic secrets and strict algorithms.
- **Implementation:**
  - Sign JWTs with a minimum 256-bit (32 bytes) cryptographically random secret string, or use asymmetric key pairs (RS256, Ed25519).
  - Enforce short expiration lifetimes for access tokens (`exp: 15m`) and rotate refresh tokens securely.
  - Explicitly restrict allowed algorithms during verification (`algorithms: ['HS256']`) to prevent algorithm-confusion attacks (e.g. `none` algorithm exploit).

### 13. Server-Side API Key Storage
- **Rule:** Keep private API keys, database credentials, and signing secrets exclusively on the server.
- **Implementation:**
  - Store secrets in server environment variables (`.env`, secret manager).
  - **Never** expose server secrets in client bundles (never prefix private secrets with `VITE_`, `NEXT_PUBLIC_`, `REACT_APP_`, or `EXPO_PUBLIC_`).
  - Add `.env*` to `.gitignore` and run automated pre-commit secret scans (`gitleaks`, `trufflehog`).

### 14. HttpOnly Cookie Storage (No LocalStorage Tokens)
- **Rule:** Never store authentication tokens or session IDs in browser `localStorage` or `sessionStorage`.
- **Implementation:**
  - `localStorage` is accessible to JavaScript, making tokens vulnerable to theft via any XSS flaw or malicious dependency.
  - Store authentication tokens and session identifiers in cookies with flags:
    `Set-Cookie: token=...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=900`
  - JavaScript cannot read `HttpOnly` cookies, preventing credential exfiltration via script injection.

### 15. Default Credentials Replacement
- **Rule:** Remove all default passwords, admin ports, and boilerplate accounts before launching.
- **Implementation:**
  - Replace default database credentials, seed accounts (`admin/admin`, `postgres/postgres`), and CMS/admin panel passwords.
  - Change default admin panel routes (avoid leaving open `/admin` without IP restrictions or MFA).
  - Enforce strong password complexity rules during initial administrative bootstrap.

---

## ⚙️ Layer 4: Config & Production Hygiene (5 Points)

### 16. Strict Cross-Origin Resource Sharing (CORS)
- **Rule:** Lock down API access to explicit, trusted origins.
- **Implementation:**
  - Configure `Access-Control-Allow-Origin` with an explicit list of trusted frontend origins (`https://app.example.com`).
  - **Never** combine wildcard `*` with `Access-Control-Allow-Credentials: true`.
  - Validate origin against an allowlist dynamic function when multiple environments (staging, production) are supported.

### 17. Webhook Signature Cryptographic Verification
- **Rule:** Verify the authenticity of external webhooks before processing state changes.
- **Implementation:**
  - Cryptographically verify HMAC-SHA256 signatures for payment gateways (Stripe, Razorpay, PayPal) and webhooks (GitHub, Shopify).
  - Always verify signatures against the **raw, unparsed request body buffer** (before JSON middleware parses it).
  ```typescript
  // Example Stripe webhook signature verification
  const event = stripe.webhooks.constructEvent(
    req.rawBody,
    req.headers['stripe-signature'],
    process.env.STRIPE_WEBHOOK_SECRET
  );
  ```

### 18. Source Map Obfuscation
- **Rule:** Do not publish unauthenticated JavaScript source maps to production.
- **Implementation:**
  - Disable production source maps in build tools:
    - Vite: `build: { sourcemap: false }`
    - Next.js: `productionBrowserSourceMaps: false`
    - Webpack: `devtool: false`
  - If source maps are required for crash monitoring (Sentry, Bugsnag), upload them directly to the monitoring platform via CI/CD and delete `.map` files before public asset deployment.

### 19. Production Log Sanitization
- **Rule:** Strip sensitive data, credentials, and PII from production application logs.
- **Implementation:**
  - Filter out passwords, card numbers, auth tokens (`Authorization` header, Bearer tokens, cookies), and Personally Identifiable Information (PII) before logging.
  - Never log raw request bodies on authentication (`/login`, `/signup`) or payment endpoints.
  - Use structured logging (Pino, Winston) with automated redaction masks.

### 20. Dependency Vulnerability Auditing
- **Rule:** Continuously monitor and patch third-party package vulnerabilities.
- **Implementation:**
  - Run security audits in CI/CD pipelines (`npm audit`, `pnpm audit`, `cargo audit`, Snyk, Dependabot).
  - Keep lockfiles (`package-lock.json`, `pnpm-lock.yaml`) committed and enforce strict package version resolutions.
  - Patch dependencies promptly when high or critical Common Vulnerabilities and Exposures (CVEs) are disclosed.

---

## 📋 Pre-Flight Deployment Security Checklist

Before approving any website or application for production deployment, verify all 20 checks:

| # | Check | Layer | Status |
|---|---|---|---|
| 1 | SQLi: Parameterized queries or ORM used throughout | Layer 1 | [ ] |
| 2 | XSS: Input sanitized (DOMPurify) & strict CSP configured | Layer 1 | [ ] |
| 3 | CSRF: Anti-CSRF tokens & SameSite cookies enabled | Layer 1 | [ ] |
| 4 | Uploads: MIME/magic bytes validated, UUID filenames, isolated bucket | Layer 1 | [ ] |
| 5 | SSRF: Destination URLs allowlisted, internal/loopback IPs blocked | Layer 1 | [ ] |
| 6 | BOLA/IDOR: Server checks entity ownership on all requests | Layer 2 | [ ] |
| 7 | Rate Limiting: Redis token-bucket on auth & public APIs | Layer 2 | [ ] |
| 8 | Passwords: Argon2id or bcrypt (work factor $\ge 12$) hashing | Layer 2 | [ ] |
| 9 | MFA: TOTP / WebAuthn supported for sensitive accounts | Layer 2 | [ ] |
| 10 | RBAC: Server-side middleware permission checks enforced | Layer 2 | [ ] |
| 11 | RLS: Database row-level security enabled & tested | Layer 2 | [ ] |
| 12 | JWT: 256-bit crypto secret, short TTL, algorithm checked | Layer 3 | [ ] |
| 13 | API Keys: Stored in server `.env`, zero client bundle exposure | Layer 3 | [ ] |
| 14 | Cookies: Auth tokens in `HttpOnly; Secure; SameSite` cookies | Layer 3 | [ ] |
| 15 | Credentials: Default admin passwords and seed logins replaced | Layer 3 | [ ] |
| 16 | CORS: Explicit trusted domain allowlist; no wildcard with creds | Layer 4 | [ ] |
| 17 | Webhooks: HMAC signature verified with raw request body | Layer 4 | [ ] |
| 18 | Source Maps: Production `.map` files disabled or kept private | Layer 4 | [ ] |
| 19 | Logs: PII, passwords, tokens redacted from production logs | Layer 4 | [ ] |
| 20 | Dependencies: `npm audit` / Snyk scan clean of CVEs | Layer 4 | [ ] |
