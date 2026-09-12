export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    return withSecurityHeaders(response);
  },
};

function withSecurityHeaders(response) {
  const secured = new Response(response.body, response);
  secured.headers.set("Content-Security-Policy", "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; font-src 'self'; connect-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'");
  secured.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  secured.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  secured.headers.set("X-Content-Type-Options", "nosniff");
  secured.headers.set("X-Frame-Options", "DENY");
  return secured;
}
