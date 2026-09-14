export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Esta página não carregou — Portal Católico</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      :root { color-scheme: dark; }
      body { font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; background: #0B0A08; color: #F2EDE3; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 30rem; width: 100%; text-align: center; padding: 2rem; border: 1px solid rgba(205,166,58,.35); border-radius: .75rem; background: #161311; }
      .eyebrow { letter-spacing: .18em; font-size: .7rem; text-transform: uppercase; color: #CDA63A; margin: 0 0 .75rem; }
      h1 { font-size: 1.35rem; margin: 0 0 .5rem; }
      p { color: rgba(242,237,227,.75); margin: 0 0 1.5rem; }
      .actions { display: flex; gap: .5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: .6rem 1.1rem; border-radius: .375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #CDA63A; color: #0B0A08; font-weight: 600; }
      .secondary { background: transparent; color: #F2EDE3; border-color: rgba(242,237,227,.35); }
    </style>
  </head>
  <body>
    <div class="card">
      <p class="eyebrow">Portal Católico</p>
      <h1>Esta página não carregou</h1>
      <p>Algo falhou de nosso lado. Você pode tentar de novo ou voltar para o início.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Tentar de novo</button>
        <a class="secondary" href="/">Ir para o início</a>
      </div>
    </div>
  </body>
</html>`;
}
