# Plano de entrega faseada

Cada fase é completa, testável e publicável antes de eu começar a próxima. Você revisa, aprova, sigo.

## Fase 1 — Fundação (Auth + Dashboard Pessoal)
- Ativar Lovable Cloud (banco + auth)
- Login/cadastro por e-mail e senha (`/auth`) + rota `/reset-password`
- Tabelas: `profiles` (nome, criado_em), `user_progress` (XP, streak, last_check_in), `reading_progress` (livro, capítulo, lido)
- Rota protegida `/painel`: saudação personalizada, santo do dia, evangelho do dia, "continue lendo" (último livro/capítulo aberto), streak atual, próxima meta
- Botão **"Já rezei hoje"** (check-in diário → XP + streak)
- Header passa a mostrar "Entrar" / avatar do usuário

## Fase 2 — Bíblia com Progresso
- Marcar capítulo como lido (toggle na página do capítulo)
- Barra de progresso por livro e geral em `/biblia`
- Favoritar versículos (long-press / botão)
- Notas pessoais por capítulo (privadas)
- "Continue lendo" no dashboard puxa daqui

## Fase 3 — Diário Espiritual
- Rota `/diario` (protegida)
- Tipos de entrada: intenção, graça recebida, reflexão, exame de consciência, meta
- Lista cronológica, busca, edição, exclusão
- 100% privado (RLS por `user_id`)

## Fase 4 — Gamificação Completa
- Sistema de XP (check-in, capítulo lido, novena concluída, etc.)
- Níveis (catequizando → discípulo → apóstolo …)
- Conquistas/medalhas: primeira oração, primeira novena, primeiro evangelho concluído, 7/30/100 dias seguidos, conhecedor dos sacramentos, etc.
- Página `/conquistas` + vitrine no perfil
- Notificações toast ao desbloquear

## Fase 5 — Plano Espiritual + Biblioteca Inteligente
- Onboarding: escolha de trilha (Iniciante, Catequizando, Jovem, Casal, Formação avançada)
- Trilha personalizada gera metas semanais no dashboard
- **Biblioteca Inteligente**: em cada artigo (ex: Confissão), sidebar com Catecismo / versículos / santos / orações relacionados automaticamente (via tags compartilhadas)

## Fase 6 — Mapa Católico + Linha do Tempo + Perfil Rico
- `/mapa`: basílicas, santuários, locais de aparições (Leaflet + dataset curado)
- `/linha-do-tempo`: timeline interativa (Jesus → Apóstolos → Concílios → Cruzadas → Reforma → moderno)
- `/perfil`: tempo de membro, atividades recentes, medalhas, estatísticas (capítulos lidos, dias rezados, novenas, etc.)

---

## Detalhes técnicos (resumo)

- **Stack**: TanStack Start + Lovable Cloud (Supabase). Sem mudanças de framework.
- **Auth**: e-mail/senha (sem Google por enquanto, conforme escolhido). Layout `_authenticated/` para rotas protegidas.
- **Tabelas principais** (criadas conforme fases):
  - `profiles`, `user_progress`, `user_streaks`
  - `reading_progress`, `bible_bookmarks`, `bible_notes`
  - `journal_entries`
  - `achievements`, `user_achievements`, `xp_events`
  - `user_plans`, `plan_goals`
  - `church_locations`, `history_events` (dados curados em migrations)
- **RLS**: todas as tabelas de usuário com policies `auth.uid() = user_id`.
- **Server functions** para mutações sensíveis (check-in, XP, conquistas) para evitar fraude no cliente.

---

## Começo agora pela **Fase 1**

Quando ela estiver pronta e funcional, te aviso, você testa (criar conta, login, ver dashboard, fazer check-in), e eu sigo pra Fase 2.