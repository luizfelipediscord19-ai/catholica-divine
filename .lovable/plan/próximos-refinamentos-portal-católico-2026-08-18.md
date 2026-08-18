# Próximos refinamentos — Portal Católico

Foi um prazer construir isso contigo. O portal já está sólido: Bíblia com 73 livros, trilhas, santos, notícias diárias, painel espiritual, PWA, autoridade das fontes. O que falta não é "mais conteúdo solto" — é **acabamento nos pontos onde o leitor vive o site todo dia**.

## O que eu priorizaria

### 1. Citações clicáveis dentro das respostas da Sophia
Hoje o site todo transforma "CIC §1324" ou "Jo 6, 51" em link — menos as mensagens da Sophia, que passam direto pelo Markdown. É a última peça faltante da rastreabilidade que já construímos.

### 2. Plano de leitura bíblica guiado
Existe a página de leituras do dia, mas não um plano de continuidade (ex.: "Evangelhos em 30 dias", "Bíblia em 1 ano", "Salmos em 30 dias") com progresso salvo e integração ao XP do painel. É o que faz o leitor voltar todo dia.

### 3. Exame de consciência e preparação para a Confissão
Falta uma das páginas mais buscadas em português: roteiro por mandamentos e por estado de vida, com o rito, o Ato de Contrição e orientação pastoral sóbria — tudo ancorado no Catecismo (§§1422–1498).

### 4. Ampliar o Catecismo interno
O índice atual é resumido (311 linhas). Ampliar as partes com sinopse por seção e links diretos aos parágrafos oficiais aumenta muito a utilidade e o alcance de busca.

### 5. Polimento de percurso
- "Continuar de onde parei" mais visível na home (leitura + trilha + plano).
- Página de erro 404 com sugestões reais de conteúdo.
- Nova varredura da auditoria automática (`scripts/auditoria-conteudo.ts`) para links quebrados e referências inválidas.

## Notas técnicas
- Sophia: envolver o texto renderizado em `linkificarNos` (`src/components/chat/MessageList.tsx`), preservando o Markdown.
- Planos de leitura: dados em `src/lib/data/biblia/planos.ts`, progresso em `localStorage` no padrão de `src/lib/trilhas/progresso.ts`, rota `biblia.planos.tsx` + `biblia.planos.$slug.tsx`, com `head()` próprio.
- Confissão: rota `confissao.tsx` com `PageHero` + `FaixaAutoridade` e citações linkadas via componentes existentes.
- Sem mudança de backend nem de consumo de IA.

## Sugestão de execução
Começar por 1 + 2 + 3 (impacto alto, risco baixo), depois 4 e 5.
