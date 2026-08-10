# Remover a barra inferior do celular, elevar o design e deixar a Sophia mais precisa

## 1. Fim da barra de navegação inferior (só no celular)

- Remover a barra fixa que hoje ocupa a base da tela no celular e o espaçador de 56px que existe só para compensá-la. O menu do computador não muda em nada.
- Para não perder acesso rápido, o cabeçalho passa a carregar no celular: logo, busca, Sophia e o botão de menu — o menu lateral continua com a lista completa de seções, agora agrupada por blocos (Estudar, Escrituras, Devoção, Comunidade, Minha conta) em vez de uma lista longa e plana.
- Botões flutuantes (voltar ao topo, modo leitura, instalar app, avisos) reposicionados para a base livre, sem sobrepor conteúdo, e os avisos voltam à margem normal.

## 2. Design mais robusto

Sem trocar a identidade (marfim/ouro/azul mariano, Playfair + Inter). O ganho vem de profundidade e consistência:

- **Cards**: hierarquia real de superfícies (base, elevado, destaque), borda e canto únicos, filete de ouro sutil no topo dos cards de destaque, hover com elevação e leve deslocamento, estado ativo/selecionado visível.
- **Botões**: revisão dos quatro papéis (principal ouro, contorno, discreto, texto), com pressão tátil, foco visível, ícones alinhados opticamente e altura mínima de 44px em todos os tamanhos.
- **Cabeçalho**: altura estável, item ativo com marcador de ouro, transição suave de transparência ao rolar, menu mobile em painel com blocos e fechamento por gesto/ESC.
- **Imagens**: proporção fixa reservada antes do carregamento (fim do "salto" na página), moldura discreta e vinheta nos retratos de santos, transição de entrada suave, texto alternativo revisado, e placeholder elegante quando a fonte externa falha.
- **Ritmo**: aplicar os primitivos do design system (Container, Secao, títulos, espaçamentos) nas páginas que ainda montam layout à mão, para que todas respirem igual no celular, tablet e desktop.

## 3. Sophia mais inteligente e mais clara

- **Entendimento**: melhorar a busca interna que alimenta a resposta — normalizar acentos, reconhecer sinônimos e termos latinos, aceitar referências bíblicas escritas de várias formas (Jo 3,16 / João 3:16), e trazer mais material relevante por pergunta (catecismo, glossário, santos, orações, apologética) com trechos maiores.
- **Memória do assunto**: usar também as mensagens anteriores para achar o contexto, de modo que perguntas curtas de continuação ("e sobre isso?") não perdem o fio.
- **Formato da resposta**: estrutura fixa e legível — resposta direta primeiro, depois o desenvolvimento, depois as fontes (Catecismo, Escritura, Concílios) e um "para aprofundar" com links reais do portal.
- **Honestidade**: distinguir dogma, doutrina, opinião teológica legítima e disciplina; admitir quando o portal não tem base para responder em vez de improvisar; nunca inventar número de parágrafo do Catecismo ou versículo.
- **Segurança pastoral**: encaminhar temas de saúde mental, abuso e crise para ajuda humana e sacerdote, com tom acolhedor.
- Os limites de uso atuais (por minuto, por dia e teto global) continuam iguais — nada aqui aumenta o consumo de crédito por pergunta de forma significativa.

## Detalhes técnicos

- Remover `NavInferiorMobile` de `src/routes/__root.tsx` e apagar `src/components/NavInferiorMobile.tsx`; remover o espaçador `h-14 lg:hidden` e o deslocamento inferior aplicado aos elementos flutuantes/toasts.
- `src/components/SiteHeader.tsx`: reintroduzir busca e Sophia no breakpoint mobile, agrupar `NAV` em seções e refatorar o painel do menu.
- `src/styles.css`: estender tokens de superfície/sombra e os utilitários `surface-card*`, `btn-*` já existentes; adicionar utilitário de proporção/moldura para imagens.
- `src/components/ui/button.tsx`, `card.tsx`, `src/components/portal/RetratoSanto.tsx` e `src/components/ds.tsx` recebem os novos estados; rotas ainda com layout manual migram para `Container`/`Secao`.
- IA: reescrever a recuperação em `src/lib/prompts/contexto.server.ts` (normalização, sinônimos, parser de referência bíblica, mais candidatos), passar as últimas mensagens do usuário como consulta em `src/routes/api/chat.ts`, e endurecer `src/lib/prompts/sophia.ts` com o contrato de formato e as regras de honestidade. Modelo e parâmetros de custo permanecem.
- Verificação com Playwright em 320/414/768/1024/1280/1440 px: zero overflow horizontal, console limpo, e conferência de que nada ficou coberto na base da tela no celular.
