# Rodada de refinamento — Portal Católico

Com o santoral real e o cache das leituras já no ar, sobrou um conjunto de arestas de design, de conteúdo e de confiança. Abaixo, dez refinamentos, agrupados por natureza e em ordem de impacto.

## Design e primeira impressão

**1. Banner LGPD compacto.** Hoje é um painel grande que domina a tela no celular (414px) e aparece em todas as páginas até ser respondido. Vira uma barra discreta no rodapé, com "Aceitar", "Preferências" e "Só o essencial"; as categorias detalhadas abrem em um painel só quando pedido.

**2. Hero da home no celular.** Reduzir a altura para que o topo do bloco "Hoje na Igreja" apareça na primeira dobra, ajustar o gradiente para o texto ficar legível sobre a arte e diminuir a escala do H1 (hoje quebra em três linhas).

**3. Cartões com altura e corte uniformes.** Os cards de "Hoje na Igreja", santos e notícias cortam frases em alturas diferentes. Padronizar `line-clamp`, altura mínima e um "ler mais" explícito.

**4. Contraste do tema claro.** Revisar o dourado sobre fundo claro nas páginas longas de leitura (Bíblia, trilhas, catecismo), onde o tema claro é mais usado, para atingir contraste AA.

**5. Hover das artes sacras.** Nos cards com imagem, um realce sóbrio no desktop: leve zoom na arte, borda dourada fina e elevação suave — sem animação chamativa.

## Conteúdo e ferramentas de estudo

**6. Catecismo por número.** Campo de busca "§ 1324" que leva direto ao parágrafo no texto oficial, mais um índice temático. Hoje a página tem só as partes, seções e faixas de parágrafos com resumo.

**7. Liturgia das Horas com texto.** Hoje a página lista apenas a estrutura de cada hora. Montar Laudes, Vésperas e Completas com salmos e cânticos de domínio público, hino e antífona, deixando claro que não é a edição oficial da CNBB.

**8. Glossário ao passar o mouse.** Termos técnicos (transubstanciação, hipóstase, homoúsios) mostram a definição do glossário em tooltip acessível, reaproveitando o componente `Termo` já existente.

**9. Fichas de santos mais completas.** Acrescentar datas de beatificação e canonização com o documento correspondente, patronatos, local das relíquias e uma nota separando o que é história documentada do que é tradição hagiográfica.

## Confiança e auditabilidade

**10. Selo de confiabilidade em todas as páginas de conteúdo.** 22 das 56 rotas exibem o selo; Bíblia, catecismo, glossário, doutores, orações e apologética ainda não. Cobrir todas e acrescentar "revisado em <data>".

**11. Página "Reportar correção".** Um formulário curto ligado ao e-mail de contato para o leitor apontar erro doutrinal, histórico ou de digitação, com o link presente no rodapé de cada página de conteúdo.

**12. Página 404 útil.** Substituir o erro seco por sugestões reais: busca, leituras do dia, trilhas e santos populares.

## Ordem sugerida

Primeiro o bloco de design (1–3), que é o que o visitante sente na primeira visita; depois confiança (10–12), que é barato e eleva a credibilidade; por fim as ferramentas de estudo (6–9), que são as maiores em conteúdo.

## Notas técnicas

- LGPD: `src/components/portal/ConsentimentoLGPD.tsx` — barra fixa no rodapé, painel de categorias sob demanda.
- Home e cards: `src/routes/index.tsx`, `src/components/PageShell.tsx` (`PageHero`, `ContentCard`).
- Tema claro e hover: tokens em `src/styles.css` e classes `surface-card-interactive` / `art-plate`.
- Catecismo: `src/routes/catecismo.tsx` + índice de parágrafos em `src/lib/data/catecismo/`.
- Horas: ampliar `src/lib/data/devocoes/horas.ts` com textos, consumidos em `src/routes/oracoes.liturgia-das-horas.tsx`.
- Glossário: envolver termos via `src/components/Termo.tsx` dentro de `Prose`.
- Selos: prop `autoridade` do `PageHero`, aplicada às rotas restantes.
- Correções: nova rota `correcoes.tsx` no padrão de `contato.tsx`, mesma tabela de mensagens.
- 404: `notFoundComponent` em `src/routes/__root.tsx`.
