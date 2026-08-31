# O que ainda dá para melhorar no Portal Católico

Olhei o site rodando (celular 414px e desktop) e o conteúdo por dentro. O portal já está maduro; o que falta é menos "criar coisas novas" e mais **fechar buracos de precisão** e **refinar a primeira impressão**. Abaixo, o que encontrei e o que proponho fazer, em ordem de impacto.

## 1. Veracidade: os três pontos mais sérios

**a) "Santo do dia" mostra santo errado quando ninguém do acervo cai na data.**
Hoje (31 de agosto) a home exibe São Carlos Borromeu, cuja memória é 4 de novembro. O código procura um santo com a data de hoje na base e, não achando, cai numa rotação cíclica com o rótulo "Santo lembrado hoje". Funciona como enfeite, mas contradiz o rigor do resto do portal.
Correção: montar um **santoral real** (Calendário Romano Geral + calendário próprio do Brasil), com grau da celebração (solenidade, festa, memória, memória facultativa, féria). Em dia sem santo, dizer honestamente "féria do Tempo Comum" e oferecer as memórias facultativas do dia.

**b) As leituras da Missa dependem de uma única fonte externa, sem rede de segurança.**
As leituras vêm de uma API pública; se ela falhar ou demorar mais de 8 s, a página fica sem leituras. É a decisão certa (melhor vazio do que errado), mas frágil.
Correção: guardar as leituras no banco assim que chegam (cache por data), pré-carregar os próximos dias e mostrar sempre "fonte e data da última verificação".

**c) Convivem dois conteúdos "do dia" com naturezas diferentes.**
Existe um plano cíclico interno de leituras/versículos/evangelhos ao lado da liturgia oficial. Isso pode fazer o leitor achar que uma leitura devocional é a leitura da Missa.
Correção: separar visualmente e nomear certo — "Leitura da Missa (Lecionário)" versus "Versículo para meditar (seleção do portal)".

## 2. Conteúdo: onde o portal ainda é raso

- **Catecismo** — hoje há apenas a estrutura (partes, seções, faixas de parágrafos) com resumos. Proponho: busca por número (`§ 1324` leva direto ao trecho no vatican.va), índice temático e ligação automática de cada § citado no site.
- **Liturgia das Horas** — só a estrutura das horas, sem texto. Proponho montar Laudes, Vésperas e Completas com salmos de domínio público, hino e cântico, deixando claro que não é a edição oficial da CNBB.
- **Santos** — as fichas curtas (uma linha) podem ganhar: datas de beatificação/canonização com o documento correspondente, patronatos, local das relíquias e uma nota de "o que é história e o que é hagiografia".
- **Selo de confiabilidade** — 22 páginas já o exibem; várias páginas de conteúdo ainda não (Bíblia, Catecismo, glossário, doutores, orações, apologética). Vale uma passada para cobrir todas e acrescentar "revisado em <data>".
- **Página "Reportar correção"** — um caminho simples para o leitor apontar erro doutrinal, ligado ao e-mail de contato. Isso é o que transforma "site confiável" em "site auditável".

## 3. Design: o que salta aos olhos

- **Banner de LGPD ocupa quase metade da tela no celular** e cobre o conteúdo em todas as páginas até ser respondido. Trocar por uma barra compacta no rodapé, com "Aceitar" e "Preferências", sem tapar o texto.
- **Hero da home no celular**: a arte de fundo está escura e quase ilegível atrás do texto; o bloco ocupa a dobra inteira sem mostrar nada do conteúdo abaixo. Ajustar o gradiente, reduzir a altura no celular e deixar aparecer o topo do bloco "Hoje na Igreja".
- **Cartões "Hoje na Igreja"** no desktop cortam frases no meio. Padronizar altura, número de linhas e um "ler mais" claro.
- **Ritmo tipográfico**: refinar a escala de títulos no celular (o H1 quebra em três linhas) e a medida de leitura nos textos longos.
- **Tema claro**: revisar contraste de dourado sobre fundo claro nas páginas de leitura, que é onde o tema claro mais é usado.

## 4. Ordem sugerida

1. Santoral real + rótulo honesto do santo do dia.
2. Cache das leituras + separação "Missa" x "devocional".
3. Banner LGPD compacto + ajustes do hero e dos cartões da home.
4. Selo de confiabilidade em todas as páginas de conteúdo + "reportar correção".
5. Catecismo por número e Liturgia das Horas com texto.

## Notas técnicas

- Santoral: nova tabela de dados em `src/lib/liturgia/` com grau da celebração, integrada a `diaLiturgico()` em `calendario.ts`; `santoDoDia()` em `src/lib/data/hoje.ts` passa a consumir o santoral em vez da rotação cíclica.
- Cache das leituras: tabela no backend gravada pelo server function `getLiturgiaDoDia`, com leitura primeiro do cache e revalidação; pré-carga dos próximos dias no cron que já existe para notícias.
- LGPD: ajuste em `src/components/portal/ConsentimentoLGPD.tsx` (barra fixa, sem sobrepor conteúdo).
- Home: `src/routes/index.tsx` (altura do hero, gradiente, `line-clamp` uniforme nos cartões).
- Selos: prop `autoridade` do `PageHero` (`src/components/PageShell.tsx`), já usada em 22 rotas.

Posso começar pelos itens 1 e 2, que são os de veracidade, e depois emendar o ajuste visual — ou inverter, se preferir ver primeiro a mudança no visual.
