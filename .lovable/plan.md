I will conduct a security audit and implement hardening measures for the Portal Católico.

### Security Audit Findings & Remediations

1.  **Improper AI System Prompt & Exposure**: The current system prompt in `src/routes/api/chat.ts` is functional but lacks strict constraints to prevent prompt injection and maintain theological focus.
    *   **Remediation**: Rewrite the system prompt to be robust against "jailbreaks" and include specific instructions for the "Serviço ao Altar" (Altar Servers/Coroinhas) as requested.

2.  **Missing CSRF Protection**: Being a TanStack Start app (SSR), the `/api/chat` route is vulnerable to CSRF since it doesn't currently validate origin or use anti-CSRF tokens for POST requests.
    *   **Remediation**: Implement an origin check in the server handler for `/api/chat`.

3.  **Lack of Security Headers**: The application currently lacks standard security headers like CSP, HSTS, and Frame Options.
    *   **Remediation**: Add a global response header middleware to `src/server.ts` or configure them via TanStack Start.

4.  **Input Validation**: User messages are passed directly to the AI model.
    *   **Remediation**: Use `zod` to validate the incoming request body in `/api/chat`.

5.  **Rate Limiting**: While there is basic error handling for 429, there is no application-level rate limiting.
    *   **Remediation**: Recommend infrastructure-level rate limiting (Cloudflare/Vercel) as TanStack Start is often deployed on edge functions where memory-based rate limiting is ineffective.

### Implementation Steps

1.  **Update `src/routes/api/chat.ts`**:
    *   Add `zod` schema for input validation.
    *   Implement CSRF origin validation.
    *   Inject the new "Perfect AI System Prompt" including the Coroinhas section.

2.  **Update `src/server.ts`**:
    *   Inject critical security headers (CSP, HSTS, X-Frame-Options) into all responses.

3.  **Prompts & Content**:
    *   Craft a comprehensive system prompt for Sophia.

### Technical Details
*   **CSP**: `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://ai.gateway.lovable.dev;`
*   **Validation**: `z.object({ messages: z.array(z.any()) })`
*   **CSRF**: Validate `request.headers.get("origin")` against the application's base URL.
