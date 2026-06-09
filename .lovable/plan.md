
# Plano — Portal Católico (MVP visual + IA)

## Escopo desta primeira entrega

Construir a **fundação cinematográfica** do site e as páginas-modelo que servirão de molde para todo o crescimento futuro. Conteúdo teológico real começa nas seções-chave; o restante recebe estrutura navegável pronta para expansão iterativa.

### 1. Identidade visual (passo prévio)
- Gerar **3 direções de design** renderizadas (catedral/vitrais/arte sacra) usando a paleta solicitada: dourado #D4AF37, azul-mariano #1D4E89, vermelho cardinalício #8B0000, branco e preto profundo.
- Você escolhe uma; só então começa o build em React.
- Tokens (cores, tipografia serifada refinada, sombras, gradientes "vitral") definidos em `src/styles.css` com modo claro/escuro.

### 2. Homepage cinematográfica
- Hero com imagem de catedral, frase de santo, CTA.
- Cards: Versículo do dia, Santo do dia, Calendário litúrgico (tempo atual), Destaques dos 7 Sacramentos.
- Seção "Últimos artigos / Estudos em destaque".
- Busca global no header.

### 3. Navegação e estrutura completa de rotas
Menu principal com todas as seções pedidas, cada uma como rota TanStack própria com SEO (title/description/og únicos):
- `/fe-catolica` — A Fé Católica (Igreja, História, Papado, Concílios, Credos)
- `/biblia` — índice AT/NT + `/biblia/$livro` (página por livro)
- `/sacramentos` — índice + `/sacramentos/$nome` (7 páginas)
- `/catecismo` — navegação pelas 4 partes + busca
- `/santos` — catálogo + `/santos/$slug`
- `/doutores-da-igreja`
- `/apologetica` — perguntas/respostas
- `/maria` — dogmas, aparições, Rosário
- `/oracoes` — biblioteca com favoritar/imprimir
- `/calendario-liturgico`
- `/assistente` — IA católica

### 4. Conteúdo real nas páginas-modelo (com IA + fontes oficiais)
Para garantir profundidade desde já, populamos com **resumos gerados via Lovable AI** (modelo `google/gemini-3-flash-preview`) durante o build, citando sempre fonte oficial (vatican.va, CNBB):
- **7 Sacramentos**: páginas completas (base bíblica, Catecismo §, história, FAQ).
- **Maria**: dogmas + Fátima/Aparecida/Lourdes.
- **Orações fundamentais**: Pai Nosso, Ave Maria, Glória, Salve Rainha, Credo, Rosário completo, Anjo da Guarda.
- **Bíblia**: estrutura de todos os 73 livros com resumo curto, autor, contexto. Detalhamento profundo nos Evangelhos.
- **Santos**: ~20 santos populares com biografia completa (Francisco, Agostinho, Teresinha, JPII, Padre Pio, Antônio, etc.). Demais santos como cards expansíveis.
- **Catecismo**: navegação pelas 4 partes com resumos de cada seção e link para texto integral no Vaticano.
- **Apologética**: 8–10 perguntas-chave respondidas.

### 5. Assistente de IA católico (`/assistente`)
- Interface de chat usando **AI Elements** (conversation, message, prompt-input, shimmer).
- Backend: server route `src/routes/api/chat.ts` com `streamText` + Lovable AI Gateway.
- System prompt rigoroso: responder **apenas** com base em Bíblia, Catecismo, Magistério, Concílios, Padres e Doutores; nunca inventar doutrina; sempre citar fonte; redirecionar para sacerdote em questões pastorais sensíveis.
- Tratamento de erros 429/402 com mensagem clara.
- Sem login/persistência nesta fase (uma conversa por sessão).

### 6. Recursos transversais
- Busca global no header (client-side sobre índice de páginas + santos + orações).
- Toggle claro/escuro.
- Animações suaves (fade-in, scale-in já no Tailwind do projeto).
- Responsividade total + acessibilidade (WCAG AA, semantic HTML, alt texts, contraste validado).
- SEO: meta tags por rota, `robots.txt`, `sitemap.xml`, `llms.txt`.
- Imagens hero geradas (catedral, vitrais, Cristo, Maria) e externalizadas via `lovable-assets`.

## Fora desta entrega (próximas iterações)
- Autenticação, favoritos persistentes, progresso de estudos, dashboard pessoal, quiz.
- Linha do tempo interativa, mapas de peregrinação/santos.
- Texto bíblico integral (via API ou import de domínio público).
- Plano de leitura diária com notificações.
- Centenas de santos individuais (expansão gradual).

Pode confirmar para eu começar gerando as 3 direções de design?
