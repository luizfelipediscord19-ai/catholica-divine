# Voltar para Groq + remover o backend do código

## 1. IA volta para a chave antiga (Groq)

A `GROQ_API_KEY` continua salva no projeto. Vou reescrever `src/routes/api/chat.ts` para chamar a Groq (`llama-3.3-70b-versatile`) em vez da Lovable AI Gateway, mantendo:

- o mesmo streaming (o chat da Sophia não muda visualmente)
- o system prompt atual (identidade, mapa dos serviços do site, modo Diretor Espiritual)
- a validação de origem e o tratamento de erros (429 / créditos / falha de rede)

Também removo o helper `src/lib/ai-gateway.server.ts`, que deixa de ser usado, e retiro `ai.gateway.lovable.dev` do CSP em `src/server.ts` (fica só `api.groq.com`).

## 2. Remover o Cloud do código

O site hoje não usa mais banco nem login — só sobraram arquivos órfãos. Vou apagar/limpar:

- `src/integrations/supabase/*` (client, client.server, auth-attacher, auth-middleware, types)
- o `attachSupabaseAuth` de `src/start.ts` (fica só o middleware de erro)
- `src/lib/api/example.functions.ts` se ainda referenciar o backend
- pasta `supabase/` (config + migrations) e as variáveis do `.env`

Observação: o Cloud fica desativado do ponto de vista do site (nenhuma chamada, nenhuma dependência), mas o vínculo do projeto com o Cloud em si não pode ser desfeito pela Lovable — o que importa é que o app não usa mais nada dele.

Depois disso rodo o build para garantir que nada quebrou.

---

## O que eu acho que vale adicionar de volta

Sem login e sem banco, o foco é enciclopédia + estudo. Na ordem que eu faria:

1. **Modo Estudo** — botão em cada capítulo da Bíblia / parte do Catecismo: esconde header e footer, aumenta a fonte, mostra índice lateral. Preferência salva no navegador (localStorage), sem conta.
2. **Busca global inteligente** — um `Cmd/Ctrl + K` que procura em tudo ao mesmo tempo: versículos, santos, catecismo, orações, glossário. É o que mais aumenta o tempo de navegação.
3. **Expandir as referências cruzadas** — o sistema já existe em `relacionados.ts`, mas cobre poucas páginas. Encher de ligações (Eucaristia → João 6 → Trento → Tomás de Aquino → Milagres Eucarísticos) transforma o site na "Wikipédia católica" que você descreveu.
4. **Linha do tempo da Igreja** — Jesus → Apóstolos → Concílios → Cisma → Reforma → Vaticano II, com cada evento linkando para santos/documentos já existentes no site.
5. **Termos do glossário em mais páginas** — hoje só Maria, Catecismo e Sacramentos têm tooltips; aplicar em Fé Católica, Apologética e Doutores.

Também vale considerar (mais adiante): **progresso de leitura da Bíblia salvo só no navegador** — dá a sensação de continuidade ("continue lendo") sem exigir cadastro.

Me diga se quer que eu já emende alguma dessas na mesma leva ou se prefere só a parte 1 + 2 agora.
