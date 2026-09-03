# Refino de alinhamentos, botões e mobile

Objetivo: deixar todas as páginas com o mesmo ritmo visual, botões consistentes e uso confortável no celular — sem mudar conteúdo nem regras de negócio.

## O que existe hoje

- O design system já tem containers, seções, títulos, cards e chips (`src/components/ds.tsx`) e utilitários de botão no CSS (`btn-base`, `btn-gold`, `btn-outline-gold`, `btn-quiet`, `btn-danger`, `btn-sm/md/lg/icon`).
- Falta um componente de botão: 46 arquivos repetem `btn-base ...` à mão e há ~50 constantes locais do tipo `botaoClass` / `botaoGhostClass`. Daí vêm as diferenças de altura, padding e alinhamento entre páginas.
- Fórum, favoritos, santos, trilhas, rosário e alguns componentes usam `<button>` cru com classes próprias.

## Plano

1. **Primitivos de botão** — criar `Botao` e `BotaoLink` no design system, com variantes (`ouro`, `contorno`, `discreto`, `perigo`, `icone`), tamanhos (`sm`, `md`, `lg`), estado de carregamento/desabilitado, ícone opcional, área de toque mínima de 44px e foco visível.
2. **Migração página por página** — substituir botões avulsos e constantes locais pelos primitivos, em todas as rotas e componentes (fórum, favoritos, santos, trilhas, orações, painel, busca, contato, testemunhos, notícias, bíblia, catecismo, auth, LGPD, instalar app, Sophia). Regra: dentro de um mesmo bloco, todos os botões com a mesma altura e alinhados na mesma linha de base.
3. **Alinhamento e ritmo** — padronizar cabeçalhos de página (kicker, título, descrição, ações) via `Secao`/`TituloSecao`, alinhar grades de cards com altura uniforme e ações ancoradas no rodapé do card, e corrigir quebras de linha e centralizações inconsistentes.
4. **Mobile** — auditoria em 390px e 430px: barras de filtros/abas com rolagem horizontal controlada, títulos que não estouram, botões de largura total quando fizer sentido, espaçamento lateral igual em todas as páginas, cabeçalho e menu sem sobreposição, formulários com campos e botões confortáveis.
5. **Verificação** — capturas de tela por Playwright em mobile e desktop nas páginas principais (home, bíblia, santos, catecismo, orações, trilhas, fórum, painel, notícias, busca, contato, testemunhos, favoritos), checagem de tipos e correção do que aparecer torto.

## Detalhes técnicos

- Novos primitivos exportados de `src/components/ds.tsx`, mapeando para os utilitários já existentes em `src/styles.css` — sem novos tokens de cor.
- Remoção das constantes locais de classe; nenhuma classe de cor literal (`bg-black`, `text-white`) será introduzida.
- Grades continuam usando `Grid` (auto-fit por largura mínima), que já não quebra em telas estreitas.
- Sem alteração de rotas, dados, backend ou textos.
