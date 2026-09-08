# Refino visual completo + grande expansão de conteúdo

Duas frentes na mesma rodada: acabamento visual do site inteiro e crescimento
real do acervo de textos, sempre com fonte citada.

Uma nota honesta antes de começar: não é possível "adicionar tudo o que existe
na internet" — nem cabe, nem seria verdadeiro, e boa parte das traduções
modernas (Catecismo em português, Bíblia Ave-Maria) tem direitos autorais. O
caminho que dá um ecossistema grande e confiável é o que você escolheu: texto
de domínio público reproduzido, e todo o resto em síntese própria fiel, com
citação de parágrafo/documento e link para a fonte oficial. Vou trabalhar por
ondas, entregando cada uma completa.

## Frente 1 — Design e detalhes

1. **Arte sacra**: ampliar o acervo de obras de domínio público (Wikimedia /
   museus) nas páginas de santos, sacramentos, Maria, Catecismo, rosário e
   via-sacra. Cada imagem ganha moldura editorial, vinheta uniforme e legenda
   com autor, título e ano. Recortes revistos para não cortar rostos no
   celular.
2. **Tipografia de leitura longa**: capitulares, entrelinha e medida de coluna
   próprias para textos extensos; sumário lateral fixo no computador e sumário
   recolhível no celular; notas de margem para as citações de fonte.
3. **Detalhes finos**: filetes dourados, estados de foco visíveis, transições
   discretas, ritmo vertical constante, revisão de espaçamentos em 414 px e
   1280 px.
4. **Página por página**: capa, Bíblia, Santos, Catecismo, Orações, Trilhas,
   Fórum, Painel — cada uma revisada com a mesma régua.

## Frente 2 — Conteúdo

Onda A — **Catecismo navegável por parágrafos**
Hoje o site tem só a estrutura (partes, seções e resumos). Vou construir a
árvore completa até o nível de artigo, com faixa de parágrafos (§§) em cada
nó, síntese própria fiel de cada artigo, link direto ao texto oficial no
vatican.va, e busca interna por número de parágrafo (digitar "1324" leva ao
artigo certo).

Onda B — **Santos**: transformar as fichas curtas em perfis longos (vida,
contexto histórico, espiritualidade, culto, o que é fato documentado e o que é
tradição hagiográfica), mantendo as etiquetas de confiabilidade já existentes.

Onda C — **Enciclopédia interligada**: verbetes doutrinais extensos ligados ao
glossário, ao Catecismo, aos santos e à Bíblia, com referências cruzadas
automáticas.

Onda D — **Magistério**: índice de concílios, encíclicas e documentos maiores
com resumo próprio, data, autor e link oficial.

Onda E — **Introduções bíblicas ampliadas** por livro: autoria, data,
estrutura, temas, e como a Igreja o lê na liturgia.

Cada onda entra com metadados de busca, links cruzados e selo de fonte já
usados no portal, para nada ficar solto.

## Regras de veracidade

- Nada protegido é reproduzido; só domínio público (Vulgata, Padres, decretos
  conciliares antigos, textos oficiais liberados) e síntese própria.
- Toda afirmação carrega origem: §CIC, cânon, documento ou autor antigo.
- Fato documentado, tradição e opinião teológica ficam visualmente distintos.
- Divergência entre tradições é apresentada como divergência, não resolvida
  por conta própria.
- Registro do que foi verificado continua em `.lovable/auditoria-veracidade.md`.

## Notas técnicas

- Conteúdo novo em `src/lib/data/` (catecismo, enciclopédia, magistério,
  santos), tipado, sem tocar em regras de negócio nem no banco.
- Rotas novas de leitura sob `src/routes/catecismo.*` e uma rota de
  enciclopédia; indexação em `src/lib/busca.ts`, `src/lib/seo/sitemap-entries.ts`
  e nos sitemaps.
- Novas utilidades editoriais em `src/styles.css` (`@utility`), sem alterar o
  desenho dos botões já estabilizado.
- Imagens via `ImagemOtimizada` / `RetratoSanto`, com AVIF/WebP.
- Verificação: `bunx tsgo --noEmit`, ESLint nos arquivos alterados, conferência
  visual em 414 px e 1280 px.
- Fora do escopo: publicar na Vercel (só com sua autorização) e reproduzir
  traduções protegidas.

## Ordem de entrega

Frente 1 itens 1–3 → Onda A (Catecismo) → Frente 1 item 4 → Ondas B, C, D, E.
Reporto ao fim de cada etapa; se quiser trocar a ordem, é só dizer.
