# Auditoria de responsividade — Portal Católico

## O que a auditoria encontrou

Rodei as páginas principais em 375px (celular) e 768px (tablet) e medi a largura real de rolagem:

- **Não há overflow horizontal indevido** em nenhuma das 15 páginas testadas (`/`, `/trilhas`, `/biblia`, `/biblia/joao/3`, `/santos`, `/oracoes`, `/catecismo`, `/forum`, `/painel`, `/busca`, `/apologetica`, `/liturgia-diaria`, `/calendario-liturgico`, `/oracoes/via-sacra`, `/sobre`). Os elementos que "passam" da borda são apenas brilhos decorativos dentro de contêineres com `overflow-hidden` — não geram barra de rolagem.
- O header já usa grid + `min-w-0` + `shrink-0` e alvos de toque de 44px.

Ou seja: a base está sólida. O ganho real agora não é reconstruir layouts, é **fluidez** — tipografia e espaçamentos que escalam por `clamp()` em vez de degraus fixos, e alguns pontos específicos que ficam apertados no celular.

## O que vou fazer

### 1. Escala fluida de tipografia e espaçamento (tokens)
Criar em `src/styles.css` uma escala fluida com `clamp()` (`--step--1` a `--step-5`) e tokens de espaçamento de seção. Aplicar nos títulos e blocos de texto via as classes já existentes, mantendo exatamente a mesma identidade (Playfair + Inter, ouro/azul mariano). Remover o hack atual de `@media (max-width: 640px)` que sobrescreve `font-size` do `html` e classes `text-[10px]`, substituindo por tamanhos fluidos reais.

### 2. Contêineres e leitura
- Padronizar largura de contêiner e paddings laterais fluidos (`clamp`) em `PageHero`, `Section`, `Prose`.
- Limitar comprimento de linha do corpo de texto (`max-w` em `ch`) para leitura confortável em tablet/desktop grande.
- Ajustar `Prose` para títulos internos menores e margens proporcionais no celular.

### 3. Pontos específicos apertados no celular
- `/oracoes/via-sacra`: grade fixa `grid-cols-7` das 14 estações → grade automática (`repeat(auto-fit, minmax(...))`), com alvos de toque de 44px.
- Cards (`ContentCard`): padding `p-10` fixo → padding fluido, para não desperdiçar espaço em telas pequenas.
- Tabelas (`src/components/ui/table.tsx`, capítulo da Bíblia): manter scroll horizontal só quando indispensável, com rolagem contida e indicação visual; preferir reorganização em blocos onde o conteúdo permitir.
- Revisar `BuscaHoras` e outros painéis com altura fixa (`max-h-[520px]`) para altura relativa (`dvh`), evitando corte em telas baixas.

### 4. Formulários e toque
Revisar campos, selects e botões do fórum, busca avançada, autenticação e painel: altura mínima de 44px, espaçamento confortável entre campos, largura total no celular, estados de foco visíveis (já há `:focus-visible` global — vou garantir cobertura).

### 5. Mídia
Confirmar `aspect-ratio` + `object-fit` em todas as imagens (retratos de santos, capas de trilhas), com `width`/`height` ou aspecto declarado para eliminar Layout Shift.

### 6. Validação
Reexecutar a varredura automática em 375, 414, 768, 1024, 1280 e 1920px após as mudanças: zero overflow horizontal, alvos de toque ≥44px, legibilidade e consistência entre páginas. Comparo antes/depois por capturas.

## Detalhes técnicos

- Tailwind v4: tokens fluidos entram em `@theme` / `:root` em `src/styles.css`; nada de `tailwind.config.js`.
- Nenhuma mudança em lógica de negócio, rotas, server functions, banco ou conteúdo — somente camada de apresentação.
- Sem novos componentes desnecessários: as correções acontecem em `PageShell.tsx`, `styles.css` e nos pontos específicos listados.
- Paleta, fontes e composição atuais preservadas integralmente.
