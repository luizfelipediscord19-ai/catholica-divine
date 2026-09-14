# Expansão acadêmica e devocional do Portal Católico

## Objetivo
Evoluir o projeto atual, preservando URLs, conteúdo, identidade visual noir/dourada, recursos pessoais e backend oficial. A entrega será única, mas implementada e validada em quatro blocos internos para reduzir regressões.

## Decisões confirmadas
- Referências protegidas: síntese editorial própria, número exato e link para a fonte oficial; nada de reproduções integrais sem licença.
- Moderação: conteúdo de baixo risco pode ser publicado; casos incertos ou graves vão para revisão humana.
- Contemplatio: somente áudio comprovadamente em domínio público, com autoria, origem e licença visíveis.
- Entrega: todos os quadrantes no mesmo ciclo, com testes intermediários e auditoria final.

## Quadrante 1 — Veracidade e ancoragem magisterial
- Criar `MagisterialAnchor`, reutilizável e acessível, para CIC, CDC e Denzinger-Hünermann.
- Exibir badges compactos e abrir uma gaveta lateral sem tirar o leitor da página.
- Na gaveta: síntese própria, contexto, referência exata, classificação da fonte e link oficial; explicar a diferença entre DH (Denzinger-Hünermann) e *Dignitatis Humanae*.
- Integrar as âncoras ao mecanismo de citações já existente e aplicá-las em páginas doutrinárias, Bíblia, santos, devoções e respostas da Sophia.
- Criar um índice patrístico tipado por livro, capítulo e versículo, com paráfrases próprias, autor, século, escola, obra e fonte verificável.
- Adicionar “Comentários dos Santos Padres” ao leitor bíblico, agrupados em Padres Apostólicos, Apologistas e Grandes Doutores.
- Acrescentar ao rodapé global a declaração de fidelidade e hermenêutica da continuidade, com três selos minimalistas: Escritura, Tradição e Magistério.

## Quadrante 2 — Enciclopédia e biblioteca da fé
- Evoluir o Glossário A–Z sem remover verbetes: categorias, normalização de acentos, busca fuzzy, filtros e fichas aprofundadas.
- Cada verbete ampliado poderá conter etimologia, definição, desenvolvimento escolástico, distinções, erros históricos/teses condenadas com linguagem precisa e âncoras magisteriais.
- Ampliar os metadados dos santos: tipo, século, cronologia, fontes, obras, frases verificadas e indicação explícita do que é história documentada ou tradição hagiográfica.
- Criar filtros de santos por tipo e século, linha do tempo nas fichas, cópia formatada de frases e vínculos recíprocos com Padres, Doutores, Bíblia e Catecismo.
- Refinar o Rosário diário e seu contador já existente; completar o manual da Via-Sacra com arte, Escritura, jaculatória e oração permitida/licenciada; organizar orações, ladainhas e latim com tradução paralela autorizada ou em domínio público.
- Uniformizar notas de confiabilidade, fontes oficiais, sumário e impressão/PDF nas páginas ampliadas.

## Quadrante 3 — Vida devocional e litúrgica
- Criar a página de Lectio Divina em quatro etapas: Lectio, Meditatio, Oratio e Contemplatio.
- Incluir passagem escolhida, cronômetro opcional, pausa/retomada, anotações privadas, navegação protegida contra perda acidental e exportação em Markdown e impressão/PDF.
- Guardar as anotações na conta autenticada; manter rascunho local temporário e não enviar conteúdo íntimo à IA.
- Adicionar áudio contemplativo apenas após verificar domínio público e exibir os créditos e a licença.
- Consolidar a Liturgia Diária com leituras, salmo, Evangelho, cor, tempo litúrgico e santo do dia, preservando o fallback atual e links Bíblia–CIC–Santos.
- Transformar o Exame de Consciência em checklist privado por Dez Mandamentos, pecados capitais e estado de vida.
- Armazenar o Exame exclusivamente em `localStorage`, sem sincronização, analytics, backend ou IA; oferecer limpeza imediata, orientação para Confissão e Ato de Contrição.

## Quadrante 4 — Sophia, formação e fórum
- Reforçar os prompts da Sophia com método escolástico, hermenêutica da continuidade, distinção entre dogma/doutrina/disciplina/opinião teológica e resposta caridosa a objeções.
- Exigir pelo menos duas fontes oficiais em respostas doutrinárias ou morais complexas, sem inventar parágrafos, cânones ou documentos.
- Manter a chamada server-side no modelo obrigatório `openai/gpt-6-astra`, via Responses API com streaming, raciocínio e histórico completo; não expor chaves nem usar limites de tokens incompatíveis.
- Adaptar a interface da Sophia para renderizar as fontes com `MagisterialAnchor` e mostrar erros reais da IA com recuperação segura.
- Evoluir as trilhas atuais para LMS: quatro famílias acadêmicas, módulos sequenciais, leituras, checklists, quizzes tipados, feedback, badges vitrais e progresso sincronizado para usuários autenticados.
- Preservar e reconciliar o progresso local existente na primeira sincronização, sem apagar conquistas atuais.
- Criar tabelas relacionais para progresso, tentativas e badges, com RLS, grants explícitos e acesso limitado ao próprio usuário.
- Reforçar a triagem do fórum em duas camadas: regras determinísticas para abuso/dados pessoais e classificação contextual por IA no servidor.
- Publicar automaticamente apenas baixo risco; reter dúvida doutrinal, ataques, difamação, ódio e spam para revisão humana com aviso pedagógico ao autor.
- Criar uma fila administrativa protegida por função de moderador, com contexto, motivos, decisão, observação pedagógica e trilha de auditoria.
- Corrigir no banco a leitura pública direta para que tópicos/respostas em revisão nunca possam ser consultados fora da camada de aplicação.

## Dados, segurança e privacidade
- Aplicar mudanças somente ao backend oficial já usado pelo portal, sem migrar para outro projeto.
- Toda nova tabela pública terá `GRANT`, RLS e políticas no mesmo script; papéis administrativos permanecerão em tabela separada e serão validados no servidor.
- Conteúdo íntimo do Exame nunca sai do aparelho. Lectio sincronizada será privada e acessível apenas pelo titular.
- Não persistir raciocínio interno nem conversas da Sophia por padrão.
- Sanitizar saídas, validar entradas com schemas estritos, limitar tamanhos e preservar as proteções atuais contra injeção.

## Qualidade editorial
- Usar fontes primárias: Santa Sé, Código de Direito Canônico, documentos conciliares, edições históricas em domínio público e referências patrísticas identificáveis.
- Não chamar automaticamente uma formulação de “heresia” sem referência histórica/magisterial precisa; casos contemporâneos incertos ficam para revisão humana.
- Marcar claramente paráfrase, tradição hagiográfica, opinião teológica e definição magisterial.
- Não inventar biografias, frases, atribuições, traduções, datas ou citações.

## Validação final
- Verificar TypeScript, formatação, lint e testes direcionados.
- Testar em navegador real desktop e mobile: âncoras/drawer, leitor bíblico patrístico, filtros, Lectio, Exame local, liturgia, LMS, Sophia e fórum.
- Executar testes autenticados de progresso, quizzes, badges e fila de moderação; remover todos os dados de teste ao final.
- Auditar acessibilidade: teclado, foco, leitores de tela, contraste, redução de movimento, drawers e cronômetros.
- Auditar desempenho, evitar carregar grandes índices no primeiro acesso e manter interações locais rápidas.
- Conferir SEO, canonical, metadados sociais, sitemap e impressão colorida/preto e branco nas novas rotas públicas.
- Entregar relatório consolidado com conteúdo criado, fontes utilizadas, testes, limitações de licença e itens que dependam de revisão editorial humana.
