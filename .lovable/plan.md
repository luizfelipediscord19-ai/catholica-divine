# Plano: Ecossistema Católico com Conteúdo Real

Vou implementar em **4 fases**, cada uma entregando valor real. Você aprova fase a fase. Tentar tudo em uma só resposta resulta em build quebrado e conteúdo medíocre — esta é a forma honesta de fazer.

## Fontes oficiais que vou usar

- **Bíblia**: API pública da [Bíblia Católica Online](https://www.bibliacatolica.com.br) (tradução Ave-Maria/CNBB) — texto integral dos 73 livros, livre acesso.
- **Catecismo**: [vatican.va/archive/cathechism_po](https://www.vatican.va/archive/cathechism_po) — texto oficial em português, 2.865 parágrafos.
- **Liturgia diária**: [liturgia.cancaonova.com](https://liturgia.cancaonova.com) e [vaticannews.va/pt/palavra-do-dia](https://www.vaticannews.va/pt/palavra-do-dia) — leituras, Evangelho e santo do dia.
- **Documentos pontifícios**: vatican.va/content/[papa]/pt — encíclicas, exortações, cartas apostólicas.
- **Santos / hagiografia**: vatican.va e [santiebeati.it](https://www.santiebeati.it) (cross-checked).
- **Liturgia das Horas**: [liturgiadashoras.org](https://liturgiadashoras.org).

Tudo via Firecrawl (server-side, cacheado em arquivos `.json` no projeto). Nada inventado.

---

## Fase 1 — Núcleo de conteúdo real (esta entrega)

**Bíblia funcional**
- Ingerir os 73 livros completos via Firecrawl, salvar em `src/lib/data/biblia/*.json`.
- Rota `/biblia` → índice navegável.
- Rota `/biblia/$livro` → lista de capítulos.
- Rota `/biblia/$livro/$capitulo` → texto integral com versículos numerados, navegação anterior/próximo, link para vatican.va.
- Busca por palavra-chave (client-side, índice gerado no build).

**Catecismo navegável**
- Scrape das 4 partes / seções / parágrafos do Catecismo em vatican.va.
- Rota `/catecismo` → estrutura completa.
- Rota `/catecismo/$paragrafo` → texto integral do parágrafo, com referências e citações biblicas linkadas.

**Liturgia do dia (server function)**
- `getLiturgiaHoje()` server fn que faz scrape diário e cacheia 6h.
- Aparece na home: leituras, salmo, Evangelho, santo do dia, cor litúrgica.

---

## Fase 2 — Devoção e oração real

- **Rosário interativo** (`/oracoes/rosario`): contador de Ave-Marias, troca automática de mistério, meditações para cada mistério (texto de Bento XVI/JP II).
- **Liturgia das Horas** (`/oracoes/liturgia-das-horas`): Laudes, Vésperas, Completas do dia (via liturgiadashoras.org).
- **Novenas** completas (`/oracoes/novenas/$slug`): Imaculada, Sagrado Coração, Espírito Santo etc. — texto oficial.
- **Via-Sacra**, **Terço da Misericórdia**, **Ladainhas** completas.

## Fase 3 — Magistério e formação

- **Documentos pontifícios** (`/documentos`): ingestão de Encíclicas (Rerum Novarum → Fratelli Tutti), Constituições do Vaticano II (Lumen Gentium, Dei Verbum, Gaudium et Spes, Sacrosanctum Concilium), exortações.
- Cada documento: texto integral, parágrafos numerados, busca interna.
- **Cursos** (`/estudos/$curso`): trilhas guiadas (Catecismo em 90 dias, Bíblia em 1 ano, Suma Teológica básica).
- **Linha do tempo** (`/historia`): 2.000 anos da Igreja, marcos com fontes.

## Fase 4 — IA, comunidade e contas

- **Autenticação** (Lovable Cloud): email + Google. Perfil, favoritos, progresso de leitura, marcadores de versículos.
- **IA Católica avançada**: RAG sobre Bíblia + Catecismo já ingeridos (não só prompt) — respostas com citações `(CIC §1234)` linkadas.
- **Comunidade**: pedidos de oração, fórum moderado (Lovable Cloud + moderação por IA).
- **Gamificação**: medalhas (leu Evangelho de João, terminou Catecismo etc.).
- **PWA + modo offline** para Bíblia/orações.

---

## Decisões técnicas

- **Firecrawl** como conector — preciso que você ative quando eu pedir.
- **Lovable Cloud** ativado na Fase 4 para autenticação/comunidade.
- Conteúdo grande (Bíblia ≈ 4MB JSON, Catecismo ≈ 2MB) ficará em `src/lib/data/` versionado, carregado por rota via dynamic import — não vai inchar o bundle.
- Server functions com cache para liturgia diária.

## Pergunta antes de começar

1. **Aprova começar pela Fase 1?** (Bíblia + Catecismo + liturgia do dia)
2. **Posso ativar o conector Firecrawl agora?** (precisa para fazer a ingestão real — sem ele eu não tenho como pegar conteúdo oficial automaticamente)

Sem o Firecrawl ativo, só consigo trabalhar com volumes pequenos via `fetch_website` (página por página, muito lento e limitado para textos longos como a Bíblia).
