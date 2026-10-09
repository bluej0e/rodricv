// Portfolio demo: crawlers turned every sortable table into endless URLs, and
// each one was a server render against the free plan's function allowance.
// Turn them away at the edge, before the Next.js server function runs.
// robots.txt asks the same; this covers the time until they re-read it.

const BOTS =
  /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-Web|Claude-User|Claude-SearchBot|anthropic-ai|CCBot|PerplexityBot|Perplexity-User|Bytespider|Amazonbot|meta-externalagent|meta-externalfetcher|FacebookBot|Applebot|Google-Extended|Googlebot|bingbot|DuckDuckBot|YandexBot|Baiduspider|PetalBot|AhrefsBot|SemrushBot|MJ12bot|DotBot|DataForSeoBot|ImagesiftBot|Diffbot|cohere-ai|YouBot|Timpibot|omgili|SeznamBot|crawler|spider/i;

export default async (request: Request) => {
  if (BOTS.test(request.headers.get("user-agent") ?? "")) {
    return new Response("Not for crawlers.\n", {
      status: 403,
      headers: { "content-type": "text/plain", "cache-control": "no-store" },
    });
  }
};

export const config = {
  path: "/*",
  excludedPath: ["/robots.txt", "/_next/static/*", "/_next/image*", "/*.svg", "/*.png", "/*.ico", "/*.woff2"],
};
