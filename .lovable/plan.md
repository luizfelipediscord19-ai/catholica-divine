# Reforço do banco de dados e da segurança

Levantamento feito agora no banco real: nenhuma tabela apresenta alerta no verificador automático e todas têm RLS ligada, mas há três pontos concretos a corrigir — permissões de escrita amplas demais, contagem de XP sujeita a corrida, e índices faltando em consultas quentes.

## 1. Permissões mínimas (least privilege)

Hoje os papéis públicos do app (visitante e usuário logado) têm privilégio de inserir, alterar e apagar em **todas** as tabelas do portal. Nada passa hoje porque não existe política de escrita para esses papéis — a proteção depende só da RLS, sem uma segunda camada.

Ação: revogar escrita de `anon`/`authenticated` em todas as tabelas do portal, mantendo apenas leitura onde a política já permite (catálogo de conquistas, seções, tópicos e respostas aprovadas) e mantendo `service_role` com acesso total (é por onde o servidor do site já trabalha).

Também há uma inconsistência a limpar: a tabela `identidades` tem uma política de leitura pública que nunca funciona, porque o papel visitante não tem privilégio de leitura nela. Como as identidades guardam token e e-mail, o correto é remover a política em vez de habilitar a leitura — o acesso continua exclusivo pelo servidor.

## 2. XP e nível sem risco de perda

O ganho de XP hoje é lido e regravado em duas etapas separadas. Duas ações quase simultâneas (marcar capítulo + registrar oração, por exemplo) podem sobrescrever uma à outra e perder pontos.

Ação: criar uma função no banco que soma o XP e recalcula o nível numa única operação atômica, e passar o código do servidor a usá-la.

## 3. Índices nas consultas quentes

- `notas`: nenhuma índice por identidade; o painel e o modo estudo filtram por identidade e ordenam por atualização.
- `favoritos`: criar índice por identidade + data para a lista do painel.
- `diario_espiritual`: índice por identidade + data decrescente para histórico e streak.
- `conquistas_usuario`, `leituras_biblia`: já cobertos pelos índices únicos existentes, sem mudança.

## 4. Limite de uso da IA no banco

O limite de requisições da Sophia hoje vive na memória do servidor, ou seja, zera a cada reinício e não é compartilhado entre instâncias. Ação: tabela de contagem por janela de tempo (chave anônima + minuto), acessível somente pelo servidor, com limpeza automática dos registros antigos.

## Detalhes técnicos

- Migração única com: `REVOKE`/`GRANT` ajustados por tabela, `DROP POLICY identidades_public_read`, função `somar_xp(identidade uuid, delta int)` com `SECURITY DEFINER` e `search_path = public`, três índices novos, e tabela `ia_uso` (RLS ligada, política apenas `service_role`, `GRANT ALL` a `service_role`).
- Código: `src/lib/portal/identidade.server.ts` passa a chamar `somar_xp` via RPC no lugar do par select/update; `src/lib/seguranca/limite.server.ts` passa a contar na tabela nova com fallback em memória se o banco falhar.
- Nenhuma mudança de interface; o comportamento visível ao membro permanece igual.

## Verificação

Rodar o verificador de segurança do banco após a migração, conferir no navegador que painel, marcação de capítulos, notas, favoritos e publicação no fórum continuam funcionando, e confirmar que o XP soma corretamente em duas ações seguidas.
