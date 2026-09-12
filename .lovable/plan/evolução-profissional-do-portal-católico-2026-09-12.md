# Evolução profissional do Portal Católico

## Direção

Evoluir o portal existente como **biblioteca digital da fé**, sem reconstrução, remoção de conteúdo ou mudança da identidade editorial noir, dourada e contemplativa. As alterações serão incrementais, com validação após cada etapa.

## Diagnóstico inicial confirmado

- O projeto possui 88 declarações de rota e 75 páginas de conteúdo, além de APIs e sitemaps.
- As principais páginas testadas retornam 200, têm um único conteúdo principal e não apresentam estouro horizontal em 414 px.
- A home, busca, Sophia, Bíblia, Catecismo, Santos e Painel abriram no celular sem erros de console.
- Imagens importadas não apresentam arquivos ausentes.
- Já existem: 73 livros bíblicos, busca indexada, vínculos Bíblia–Catecismo, fontes por autoridade, modo leitura, impressão/PDF, trilhas, progresso, favoritos, anotações, XP, liturgia dinâmica, páginas temáticas e privacidade.
- Lacunas já identificadas: navegação não segue a taxonomia pedida; falta a barra inferior mobile; algumas páginas renderizam mais de um `h1` ou conteúdo principal; a Sophia não oferece “Salvar”; busca não separa Glossário, Padres, Concílios e Liturgia; várias páginas ainda não têm metadados sociais completos; ações pessoais e preferências de leitura estão distribuídas de forma desigual.

## Etapas de implementação

### 1. Auditoria e estabilização

- Inventariar rotas, links, redirects, imagens, ações e estados de erro.
- Executar rastreamento interno de links e rotas dinâmicas, incluindo páginas 404/500.
- Corrigir primeiro: links sem destino, páginas vazias, ações inertes, landmarks duplicados, múltiplos `h1`, overflow e regressões de sessão.
- Consolidar um relatório técnico/editorial auditável sem apagar recursos existentes.

### 2. Navegação e arquitetura da informação

- Reorganizar o menu em: Início, Estudar, Viver a Fé, Liturgia, Formação, Sophia e Buscar.
- Manter Fórum e Notícias acessíveis como recursos secundários, sem transformar o portal em rede social ou blog.
- Criar barra inferior mobile fixa: Início, Estudar, Liturgia, Sophia e Buscar, respeitando área segura do aparelho.
- Atualizar rodapé com os destinos, aviso institucional e fontes oficiais pedidos.
- Preservar URLs públicas e adicionar redirects somente quando uma rota antiga comprovadamente precisar deles.

### 3. Home orientada a estudo

- Manter a imagem em tela cheia, paleta e tipografia atuais.
- Atualizar texto e ações do primeiro bloco para “Começar a estudar” e “Explorar o Portal”.
- Reordenar e refinar: Hoje na Igreja, busca principal, caminhos por intenção, pilares, trilhas/progresso, Sophia e Fontes e confiança.
- Usar os dados litúrgicos dinâmicos existentes, sem conteúdo estático inventado.

### 4. Busca e Enciclopédia interligada

- Ampliar o índice para Bíblia, Catecismo, Doutrina, Santos, Orações, Magistério, Concílios, Padres, Liturgia, Glossário e Formação.
- Agrupar resultados por categoria, com filtros, contagens, sugestões e links diretos ao trecho/parágrafo quando possível.
- Preservar execução leve no servidor e evitar carregar o acervo inteiro no navegador.

### 5. Fontes e Sophia

- Unificar o sistema visual de autoridade: oficial/Magistério, Escritura, Padres e Doutores, tradição/devocional e comentário.
- Exibir obra, localizador, trecho, nível e link original nas páginas doutrinais compatíveis.
- Estruturar respostas da Sophia em resposta e fontes utilizadas; manter copiar, compartilhar/repetir e adicionar salvar.
- Manter aviso permanente sobre limites da ferramenta e resposta explícita quando não houver fonte segura.
- Reforçar validação para nunca fabricar referências e distinguir síntese editorial de ensinamento oficial.

### 6. Modo estudo e formação

- Evoluir o modo leitura existente para Modo Estudo: legibilidade, largura confortável, fonte/espaçamento, referências, favorito, anotação, marcar estudo e continuar depois.
- Integrar as ações apenas onde houver conteúdo e login quando necessário.
- Padronizar trilhas com nível, objetivo, duração, aulas, progresso e revisão; manter gamificação discreta e vinculada a formação real.

### 7. Padronização dos grandes acervos

- **Bíblia:** busca por livro/capítulo/versículo, edição utilizada, progresso, notas, favoritos, referências cruzadas, Catecismo e liturgia relacionados.
- **Catecismo:** quatro partes, busca por número/palavra, relações com Bíblia, Doutrina e documentos.
- **Santos:** ficha comum com dados comprováveis, fontes e classificação clara de citações.
- **Sacramentos:** natureza, instituição, matéria, forma, ministro, efeitos, recepção, Bíblia, CIC, cânones e relações.
- **Liturgia:** distinguir calendário geral, Brasil e particular; revisar rotas antigas e origem dos dados.
- **Orações:** categorias, modo de rezar, origem, fonte e status devocional, sem apresentar devoção privada como obrigação.

### 8. Privacidade, acessibilidade e design system

- Adicionar controles reais para histórico, progresso, notificações, exportação e exclusão, conforme suporte do backend oficial.
- Corrigir WCAG AA por prioridade: teclado, foco, nomes acessíveis, contraste, semântica, toque, movimento e preferências de leitura.
- Consolidar componentes existentes de botões, campos, badges, cards e estados, sem redesenhar o portal nem introduzir estética genérica.
- Testar iPhone, Android, tablet e desktop, inclusive textos longos, tabelas e diálogos.

### 9. SEO e performance

- Completar metadados únicos, canonical, Open Graph e Twitter em cada página de conteúdo.
- Padronizar BreadcrumbList e tipos adequados como Article, Person, Book, WebSite e LearningResource; usar FAQPage apenas onde há FAQ real.
- Conferir sitemap e robots contra todas as páginas públicas.
- Otimizar imagens, fontes e carregamento por página; medir LCP, CLS e interação antes/depois.

### 10. Revisão editorial e entrega

- Rodar verificações automáticas de ortografia e inconsistências, seguidas de revisão manual das ocorrências sensíveis.
- Conferir números do Catecismo, citações, datas, nomes, documentos e informação litúrgica contra fontes oficiais.
- Não “corrigir” doutrina por simplificação; registrar limitações onde a fonte não for suficiente.
- Executar testes finais de rotas, links, busca, Sophia, conta, favoritos, progresso, acessibilidade, SEO, performance e impressão/PDF.
- Entregar relatório final com páginas alteradas, recursos adicionados, bugs corrigidos, ganhos medidos e dependências externas ainda necessárias.

## Critérios de conclusão

- Nenhum link interno conhecido termina em 404, 500 ou tela vazia.
- Nenhum fluxo atual é removido sem alternativa equivalente ou superior.
- Nenhum conteúdo ultrapassa a largura nos aparelhos testados.
- Conteúdo doutrinal mostra sua autoridade e fonte de forma compreensível.
- Recursos pessoais continuam protegidos por login e preservam os dados atuais.
- A identidade visual, o conteúdo existente e o domínio oficial são mantidos.
- Publicação só ocorrerá mediante pedido explícito.

## Detalhes técnicos

- Manter TanStack Start, as rotas existentes, o backend oficial externo e os componentes do design system.
- Fazer mudanças em lotes pequenos e testáveis, começando por bugs e navegação.
- Usar os dados locais e integrações atuais; não criar fontes, citações, celebrações ou depoimentos fictícios.
- Preservar o domínio `https://portalcatolico.vercel.app` em canonical, Open Graph, sitemap e links públicos.
