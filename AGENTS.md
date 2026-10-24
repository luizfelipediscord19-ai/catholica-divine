# Architecture rules

- Keep Sophia's browser-origin validation and CORS decisions in `chat-utils.server.ts`, using the official portal origin from the shared site configuration; this prevents inconsistent access on the production host.
- Invalid Bible chapter requests must remain real 404s with noindex metadata and no canonical chapter URL; this keeps invalid addresses out of search results.