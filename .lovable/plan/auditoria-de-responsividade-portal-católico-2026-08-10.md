&nbsp;

Perfeito! Gostaria que adicionasse essse promot também para usar:

Auditoria Completa e Otimização de UI/UX

Objetivo: Realize uma análise completa da interface da aplicação e execute uma melhoria profunda de UI (User Interface) e UX (User Experience), elevando o sistema para um padrão moderno, consistente, intuitivo e profissional.

O objetivo é aprimorar significativamente a experiência do usuário sem alterar funcionalidades existentes, regras de negócio ou fluxos principais da aplicação.

Antes de iniciar, analise toda a aplicação antes de modificar qualquer elemento. Avalie: estrutura visual geral, hierarquia da informação, identidade visual existente, consistência entre páginas, componentes reutilizáveis, layouts, espaçamentos, alinhamentos, grid, tipografia, paleta de cores, contraste, acessibilidade, estados visuais, fluxos de navegação, formulários, feedback ao usuário, microinterações existentes, responsividade, usabilidade mobile e desktop, densidade visual, clareza das informações, consistência da experiência em toda a aplicação.

Objetivos da Otimização: interface mais intuitiva, mais moderna, mais consistente, mais organizada, mais agradável de utilizar, mais acessível, mais eficiente, mais elegante, mais profissional.

Melhorias de Interface (UI): layout (hierarquia visual, organização dos elementos, distribuição de conteúdo, espaçamentos consistentes, alinhamentos, proporções, grids responsivos), tipografia (hierarquia entre títulos, legibilidade, espaçamento entre linhas, escala tipográfica, consistência entre páginas), cores (paleta de cores, contraste, consistência, estados visuais hover/focus/active/disabled, feedback visual), componentes (botões, cards, inputs, selects, tabelas, modais, dropdowns, menus, tooltips, badges, alertas, toasts).

Melhorias de Experiência do Usuário (UX): revisar fluxos de navegação, descoberta de funcionalidades, formulários, cadastro, login, busca, filtros, confirmações, exclusões, fluxos críticos. Reduzir o número de passos para completar ações quando não alterar regras de negócio.

Estados da Interface: loading, empty state, error state, success state, skeleton loading, feedback após ações, feedback de validação. O usuário deve compreender claramente o que está acontecendo em cada etapa.

Microinterações: hover suaves, focus visível, feedback de clique, transições leves, animações discretas, transições entre estados, feedback visual imediato. Evitar animações excessivas.

Responsividade: garantir excelente experiência em todos os dispositivos (mobile, tablet, desktop, telas grandes). Melhorar layout responsivo, espaçamentos, grids, navegação touch, áreas clicáveis, leitura, organização dos conteúdos. Priorizar Mobile First quando compatível.

Acessibilidade: contraste adequado, navegação por teclado, estados de foco, hierarquia semântica, labels em formulários, feedback acessível, áreas de toque adequadas, clareza das mensagens.

Design System: padronizar espaçamentos, bordas, raios de arredondamento, sombras, tamanhos, componentes, comportamentos visuais.

Regras Obrigatórias: preservar todas as funcionalidades existentes, preservar a lógica de negócio, preservar os fluxos atuais, preservar a identidade visual, não remover funcionalidades, não alterar o comportamento esperado, não comprometer a performance, evitar mudanças visuais radicais sem necessidade.

Validação Final: revisar todas as páginas, verificar consistência visual, validar todos os fluxos, confirmar que não existem regressões, garantir boa experiência em dispositivos móveis e desktop, confirmar que todos os componentes seguem o mesmo padrão visual.

Critérios de Aceite: interface mais moderna e profissional, experiência mais intuitiva, componentes consistentes, fluxos mais claros e eficientes, responsividade aprimorada, acessibilidade melhorada, microinterações discretas e naturais, identidade visual original preservada, nenhuma funcionalidade alterada, aplicação com experiência visual refinada e pronta para produção.

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