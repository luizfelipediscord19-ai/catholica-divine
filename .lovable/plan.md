# Refino visual: Noir Dourado Editorial

Objetivo: um visual marcante e coeso em todo o site, mantendo a identidade católica sóbria — sem virar "site genérico de IA".

## Direção escolhida

- Paleta: Noir Dourado mais intenso — preto profundo (#0B0A08), superfície #161311, ouro #C9A227, marfim #F2EDE3, com vinho litúrgico só para acentos raros.
- Tipografia: Lora nos títulos (serifa lírica) + Nunito Sans nos textos.
- Estrutura: capa e páginas em ritmo de revista — manchete forte, colunas, destaques e respiro generoso.
- Alcance: todo o site (capa, Bíblia, Santos, Trilhas, Fórum, Orações, painel, páginas institucionais).

## O que muda

1. Cores e superfícies
   - Tons de fundo em três camadas (fundo, superfície, superfície elevada) para dar profundidade sem poluir.
   - Ouro reservado para hierarquia: título de seção, citação, borda de destaque e estado ativo. Nunca em blocos inteiros.
   - Divisores finos, filete dourado e leve textura de papel/grão nas faixas escuras.

2. Tipografia
   - Troca das fontes carregadas para Lora + Nunito Sans, com a escala fluida atual preservada.
   - Manchetes maiores e mais apertadas no celular; letra capitular e citação de destaque nos textos longos; entrelinha maior na leitura.

3. Capa em ritmo de revista
   - Abertura com uma imagem imponente, manchete e uma linha de apoio; abaixo, "Hoje na Igreja" em coluna editorial ao lado dos destaques.
   - Blocos de seção com numeração discreta e legenda, no lugar de cartões todos iguais.

4. Imagens
   - Tratamento uniforme: recorte consistente, leve vinheta e transição suave para o fundo escuro, para as fotos dos santos e das seções conversarem entre si.
   - Legendas curtas com crédito da fonte; carregamento progressivo e proporções fixas para nada "pular" na tela.

5. Cartões, listas e navegação
   - Cartões com borda sutil, sombra baixa e realce dourado só no foco/hover.
   - Cabeçalho e menu do celular mais limpos, com marca centralizada e ações agrupadas.
   - Rodapé editorial em colunas.

6. Detalhes de acabamento
   - Rolagem com aparição suave dos blocos (curta, discreta, respeitando "reduzir movimento").
   - Estados de foco visíveis em ouro; contraste conferido em claro e escuro.
   - Botões mantêm formato e alinhamento atuais — só recebem cor e tipografia novas.

## Notas técnicas

- Tokens em `src/styles.css`: atualizar `:root`/`.dark` (background, card, muted, border, gold*, paper, deep), `--font-display: "Lora"`, `--font-sans: "Nunito Sans"`, e novas variáveis de sombra/gradiente/grão. Nada de cor fixa em componentes.
- Fontes via `<link>` em `src/routes/__root.tsx` (Lora 400/500/600 + itálico, Nunito Sans 300–600); remover EB Garamond/IBM Plex do carregamento.
- Utilidades novas em `@utility` (ex.: `hero-editorial`, `filete-ouro`, `capitular`, `citacao-destaque`, `figura-editorial`, `grao`), reaproveitando `p-card`/`surface-card`/`action-tray`.
- Ajustes de layout em `src/routes/index.tsx`, `src/components/SiteHeader.tsx`, rodapé, `src/components/portal/*` de cartões, `RetratoSanto.tsx`/`ImagemOtimizada.tsx` para o tratamento das imagens.
- Sem mudança de dados, rotas ou regras de negócio. Verificação: `bunx tsgo --noEmit` e conferência visual em 414px e 1280px nas páginas principais.

## Fora do escopo

- Novo conteúdo doutrinal, novas funcionalidades, publicação na Vercel.
