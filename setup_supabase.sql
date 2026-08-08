-- ============================================================
-- PORTAL CATOLICO - configuracao completa do banco (SQL Editor)
-- Rode este script UMA VEZ em um projeto Supabase novo e vazio.
-- Cria tabelas, indices, triggers, funcoes, RLS, permissoes e dados iniciais.
-- ============================================================
BEGIN;

-- ===== ESTRUTURA, RLS E POLITICAS =====


CREATE FUNCTION public.reconciliar_identidade_conta(_user_id uuid, _token_anonimo uuid, _email text DEFAULT NULL::text) RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  v_conta public.identidades%ROWTYPE;
  v_anonima public.identidades%ROWTYPE;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'user required' USING ERRCODE = '22023';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtext(_user_id::text));

  SELECT * INTO v_conta FROM public.identidades
  WHERE user_id = _user_id FOR UPDATE;

  IF _token_anonimo IS NOT NULL THEN
    SELECT * INTO v_anonima FROM public.identidades
    WHERE token = _token_anonimo AND (user_id IS NULL OR user_id = _user_id)
    FOR UPDATE;
  END IF;

  IF v_conta.id IS NULL AND v_anonima.id IS NOT NULL THEN
    UPDATE public.identidades
    SET user_id = _user_id, email = COALESCE(_email, email)
    WHERE id = v_anonima.id RETURNING * INTO v_conta;
    RETURN v_conta.token;
  END IF;

  IF v_conta.id IS NULL THEN RETURN NULL; END IF;

  UPDATE public.identidades SET email = COALESCE(_email, email) WHERE id = v_conta.id;
  IF v_anonima.id IS NULL OR v_anonima.id = v_conta.id THEN RETURN v_conta.token; END IF;

  INSERT INTO public.diario_espiritual
    (identidade_id, data, intencao, reflexao, minutos, created_at, updated_at)
  SELECT v_conta.id, data, intencao, reflexao, minutos, created_at, updated_at
  FROM public.diario_espiritual WHERE identidade_id = v_anonima.id
  ON CONFLICT (identidade_id, data) DO UPDATE SET
    intencao = COALESCE(NULLIF(public.diario_espiritual.intencao, ''), EXCLUDED.intencao),
    reflexao = COALESCE(NULLIF(public.diario_espiritual.reflexao, ''), EXCLUDED.reflexao),
    minutos = GREATEST(public.diario_espiritual.minutos, EXCLUDED.minutos),
    updated_at = GREATEST(public.diario_espiritual.updated_at, EXCLUDED.updated_at);
  DELETE FROM public.diario_espiritual WHERE identidade_id = v_anonima.id;

  INSERT INTO public.conquistas_usuario (identidade_id, conquista_slug, created_at)
  SELECT v_conta.id, conquista_slug, created_at FROM public.conquistas_usuario
  WHERE identidade_id = v_anonima.id ON CONFLICT (identidade_id, conquista_slug) DO NOTHING;
  DELETE FROM public.conquistas_usuario WHERE identidade_id = v_anonima.id;

  INSERT INTO public.leituras_biblia (identidade_id, livro, capitulo, created_at)
  SELECT v_conta.id, livro, capitulo, created_at FROM public.leituras_biblia
  WHERE identidade_id = v_anonima.id ON CONFLICT (identidade_id, livro, capitulo) DO NOTHING;
  DELETE FROM public.leituras_biblia WHERE identidade_id = v_anonima.id;

  INSERT INTO public.favoritos (identidade_id, livro, capitulo, versiculo, texto, created_at)
  SELECT v_conta.id, livro, capitulo, versiculo, texto, created_at FROM public.favoritos
  WHERE identidade_id = v_anonima.id
  ON CONFLICT (identidade_id, livro, capitulo, versiculo) DO UPDATE
    SET texto = COALESCE(NULLIF(public.favoritos.texto, ''), EXCLUDED.texto);
  DELETE FROM public.favoritos WHERE identidade_id = v_anonima.id;

  UPDATE public.notas SET identidade_id = v_conta.id WHERE identidade_id = v_anonima.id;
  UPDATE public.forum_topicos SET identidade_id = v_conta.id WHERE identidade_id = v_anonima.id;
  UPDATE public.forum_respostas SET identidade_id = v_conta.id WHERE identidade_id = v_anonima.id;
  UPDATE public.forum_denuncias SET identidade_id = v_conta.id WHERE identidade_id = v_anonima.id;

  INSERT INTO public.forum_reacoes (identidade_id, topico_id, resposta_id, tipo, created_at)
  SELECT v_conta.id, r.topico_id, r.resposta_id, r.tipo, r.created_at
  FROM public.forum_reacoes r WHERE r.identidade_id = v_anonima.id
    AND NOT EXISTS (SELECT 1 FROM public.forum_reacoes d
      WHERE d.identidade_id = v_conta.id AND d.tipo = r.tipo
        AND d.topico_id IS NOT DISTINCT FROM r.topico_id
        AND d.resposta_id IS NOT DISTINCT FROM r.resposta_id);
  DELETE FROM public.forum_reacoes WHERE identidade_id = v_anonima.id;

  UPDATE public.identidades SET
    xp = v_conta.xp + v_anonima.xp,
    nivel = floor(sqrt(GREATEST(v_conta.xp + v_anonima.xp, 0)::numeric / 50))::integer + 1,
    streak = GREATEST(v_conta.streak, v_anonima.streak),
    melhor_streak = GREATEST(v_conta.melhor_streak, v_anonima.melhor_streak),
    ultima_oracao = GREATEST(v_conta.ultima_oracao, v_anonima.ultima_oracao),
    email = COALESCE(_email, v_conta.email)
  WHERE id = v_conta.id;

  DELETE FROM public.identidades WHERE id = v_anonima.id;
  RETURN v_conta.token;
END;
$$;

CREATE FUNCTION public.touch_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.conquistas_catalogo (
    slug text NOT NULL,
    titulo text NOT NULL,
    descricao text NOT NULL,
    icone text,
    xp integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.conquistas_usuario (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identidade_id uuid NOT NULL,
    conquista_slug text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.diario_espiritual (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identidade_id uuid NOT NULL,
    data date DEFAULT CURRENT_DATE NOT NULL,
    intencao text,
    reflexao text,
    minutos integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.favoritos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identidade_id uuid NOT NULL,
    livro text NOT NULL,
    capitulo integer NOT NULL,
    versiculo integer NOT NULL,
    texto text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.forum_denuncias (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identidade_id uuid,
    topico_id uuid,
    resposta_id uuid,
    motivo text NOT NULL,
    comentario text,
    situacao text DEFAULT 'pendente'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT forum_denuncias_alvo_check CHECK ((((topico_id IS NOT NULL) AND (resposta_id IS NULL)) OR ((topico_id IS NULL) AND (resposta_id IS NOT NULL))))
);

CREATE TABLE public.forum_reacoes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identidade_id uuid NOT NULL,
    topico_id uuid,
    resposta_id uuid,
    tipo text DEFAULT 'amem'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT reacao_alvo_unico CHECK ((((topico_id IS NOT NULL) AND (resposta_id IS NULL)) OR ((topico_id IS NULL) AND (resposta_id IS NOT NULL))))
);

CREATE TABLE public.forum_respostas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    topico_id uuid NOT NULL,
    identidade_id uuid NOT NULL,
    corpo text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    status text DEFAULT 'em_revisao'::text NOT NULL
);

CREATE TABLE public.forum_secoes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL,
    nome text NOT NULL,
    descricao text,
    ordem integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.forum_topicos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    secao_id uuid NOT NULL,
    identidade_id uuid NOT NULL,
    titulo text NOT NULL,
    slug text NOT NULL,
    corpo text NOT NULL,
    fixado boolean DEFAULT false NOT NULL,
    trancado boolean DEFAULT false NOT NULL,
    respostas_count integer DEFAULT 0 NOT NULL,
    ultima_atividade timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    status text DEFAULT 'em_revisao'::text NOT NULL
);

CREATE TABLE public.identidades (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    token uuid DEFAULT gen_random_uuid() NOT NULL,
    santo_slug text NOT NULL,
    santo_nome text NOT NULL,
    santo_imagem text,
    apelido text,
    xp integer DEFAULT 0 NOT NULL,
    nivel integer DEFAULT 1 NOT NULL,
    streak integer DEFAULT 0 NOT NULL,
    melhor_streak integer DEFAULT 0 NOT NULL,
    ultima_oracao date,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid,
    email text,
    santo_escolhido boolean DEFAULT false NOT NULL
);

CREATE TABLE public.leituras_biblia (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identidade_id uuid NOT NULL,
    livro text NOT NULL,
    capitulo integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.notas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    identidade_id uuid NOT NULL,
    livro text NOT NULL,
    capitulo integer NOT NULL,
    versiculo integer,
    conteudo text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.conquistas_catalogo
    ADD CONSTRAINT conquistas_catalogo_pkey PRIMARY KEY (slug);

ALTER TABLE ONLY public.conquistas_usuario
    ADD CONSTRAINT conquistas_usuario_identidade_id_conquista_slug_key UNIQUE (identidade_id, conquista_slug);

ALTER TABLE ONLY public.conquistas_usuario
    ADD CONSTRAINT conquistas_usuario_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.diario_espiritual
    ADD CONSTRAINT diario_espiritual_identidade_id_data_key UNIQUE (identidade_id, data);

ALTER TABLE ONLY public.diario_espiritual
    ADD CONSTRAINT diario_espiritual_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_identidade_id_livro_capitulo_versiculo_key UNIQUE (identidade_id, livro, capitulo, versiculo);

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.forum_denuncias
    ADD CONSTRAINT forum_denuncias_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.forum_reacoes
    ADD CONSTRAINT forum_reacoes_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.forum_respostas
    ADD CONSTRAINT forum_respostas_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.forum_secoes
    ADD CONSTRAINT forum_secoes_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.forum_secoes
    ADD CONSTRAINT forum_secoes_slug_key UNIQUE (slug);

ALTER TABLE ONLY public.forum_topicos
    ADD CONSTRAINT forum_topicos_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.forum_topicos
    ADD CONSTRAINT forum_topicos_slug_key UNIQUE (slug);

ALTER TABLE ONLY public.identidades
    ADD CONSTRAINT identidades_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.identidades
    ADD CONSTRAINT identidades_token_key UNIQUE (token);

ALTER TABLE ONLY public.leituras_biblia
    ADD CONSTRAINT leituras_biblia_identidade_id_livro_capitulo_key UNIQUE (identidade_id, livro, capitulo);

ALTER TABLE ONLY public.leituras_biblia
    ADD CONSTRAINT leituras_biblia_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_pkey PRIMARY KEY (id);

CREATE INDEX forum_respostas_status_idx ON public.forum_respostas USING btree (status);

CREATE INDEX forum_topicos_status_idx ON public.forum_topicos USING btree (status);

CREATE UNIQUE INDEX identidades_user_id_key ON public.identidades USING btree (user_id) WHERE (user_id IS NOT NULL);

CREATE INDEX idx_forum_respostas_topico ON public.forum_respostas USING btree (topico_id, created_at);

CREATE INDEX idx_forum_topicos_secao ON public.forum_topicos USING btree (secao_id, ultima_atividade DESC);

CREATE UNIQUE INDEX idx_reacao_resposta ON public.forum_reacoes USING btree (identidade_id, resposta_id, tipo) WHERE (resposta_id IS NOT NULL);

CREATE UNIQUE INDEX idx_reacao_topico ON public.forum_reacoes USING btree (identidade_id, topico_id, tipo) WHERE (topico_id IS NOT NULL);

CREATE TRIGGER touch_diario BEFORE UPDATE ON public.diario_espiritual FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER touch_forum_denuncias BEFORE UPDATE ON public.forum_denuncias FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER touch_forum_respostas BEFORE UPDATE ON public.forum_respostas FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER touch_forum_topicos BEFORE UPDATE ON public.forum_topicos FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER touch_identidades BEFORE UPDATE ON public.identidades FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER touch_notas BEFORE UPDATE ON public.notas FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE ONLY public.conquistas_usuario
    ADD CONSTRAINT conquistas_usuario_conquista_slug_fkey FOREIGN KEY (conquista_slug) REFERENCES public.conquistas_catalogo(slug) ON DELETE CASCADE;

ALTER TABLE ONLY public.conquistas_usuario
    ADD CONSTRAINT conquistas_usuario_identidade_id_fkey FOREIGN KEY (identidade_id) REFERENCES public.identidades(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.diario_espiritual
    ADD CONSTRAINT diario_espiritual_identidade_id_fkey FOREIGN KEY (identidade_id) REFERENCES public.identidades(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_identidade_id_fkey FOREIGN KEY (identidade_id) REFERENCES public.identidades(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.forum_denuncias
    ADD CONSTRAINT forum_denuncias_identidade_id_fkey FOREIGN KEY (identidade_id) REFERENCES public.identidades(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.forum_denuncias
    ADD CONSTRAINT forum_denuncias_resposta_id_fkey FOREIGN KEY (resposta_id) REFERENCES public.forum_respostas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.forum_denuncias
    ADD CONSTRAINT forum_denuncias_topico_id_fkey FOREIGN KEY (topico_id) REFERENCES public.forum_topicos(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.forum_reacoes
    ADD CONSTRAINT forum_reacoes_identidade_id_fkey FOREIGN KEY (identidade_id) REFERENCES public.identidades(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.forum_reacoes
    ADD CONSTRAINT forum_reacoes_resposta_id_fkey FOREIGN KEY (resposta_id) REFERENCES public.forum_respostas(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.forum_reacoes
    ADD CONSTRAINT forum_reacoes_topico_id_fkey FOREIGN KEY (topico_id) REFERENCES public.forum_topicos(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.forum_respostas
    ADD CONSTRAINT forum_respostas_identidade_id_fkey FOREIGN KEY (identidade_id) REFERENCES public.identidades(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.forum_respostas
    ADD CONSTRAINT forum_respostas_topico_id_fkey FOREIGN KEY (topico_id) REFERENCES public.forum_topicos(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.forum_topicos
    ADD CONSTRAINT forum_topicos_identidade_id_fkey FOREIGN KEY (identidade_id) REFERENCES public.identidades(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.forum_topicos
    ADD CONSTRAINT forum_topicos_secao_id_fkey FOREIGN KEY (secao_id) REFERENCES public.forum_secoes(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.leituras_biblia
    ADD CONSTRAINT leituras_biblia_identidade_id_fkey FOREIGN KEY (identidade_id) REFERENCES public.identidades(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_identidade_id_fkey FOREIGN KEY (identidade_id) REFERENCES public.identidades(id) ON DELETE CASCADE;

CREATE POLICY "Acesso interno do servidor" ON public.conquistas_usuario TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor" ON public.diario_espiritual TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor" ON public.favoritos TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor" ON public.forum_denuncias TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor" ON public.forum_reacoes TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor" ON public.leituras_biblia TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor" ON public.notas TO service_role USING (true) WITH CHECK (true);

ALTER TABLE public.conquistas_catalogo ENABLE ROW LEVEL SECURITY;

CREATE POLICY conquistas_catalogo_public_read ON public.conquistas_catalogo FOR SELECT TO authenticated, anon USING (true);

ALTER TABLE public.conquistas_usuario ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.diario_espiritual ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.forum_denuncias ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.forum_reacoes ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.forum_respostas ENABLE ROW LEVEL SECURITY;

CREATE POLICY forum_respostas_public_read ON public.forum_respostas FOR SELECT TO authenticated, anon USING ((status = 'aprovado'::text));

ALTER TABLE public.forum_secoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY forum_secoes_public_read ON public.forum_secoes FOR SELECT TO authenticated, anon USING (true);

ALTER TABLE public.forum_topicos ENABLE ROW LEVEL SECURITY;

CREATE POLICY forum_topicos_public_read ON public.forum_topicos FOR SELECT TO authenticated, anon USING ((status = 'aprovado'::text));

ALTER TABLE public.identidades ENABLE ROW LEVEL SECURITY;

CREATE POLICY identidades_public_read ON public.identidades FOR SELECT TO authenticated, anon USING (true);

ALTER TABLE public.leituras_biblia ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.notas ENABLE ROW LEVEL SECURITY;


-- ===== PERMISSOES DA DATA API =====
GRANT ALL ON public.identidades TO service_role;
GRANT SELECT ON public.identidades TO anon, authenticated;
GRANT ALL ON public.forum_secoes TO service_role;
GRANT SELECT ON public.forum_secoes TO anon, authenticated;
GRANT ALL ON public.forum_topicos TO service_role;
GRANT SELECT ON public.forum_topicos TO anon, authenticated;
GRANT ALL ON public.forum_respostas TO service_role;
GRANT SELECT ON public.forum_respostas TO anon, authenticated;
GRANT ALL ON public.forum_reacoes TO service_role;
GRANT ALL ON public.forum_denuncias TO service_role;
GRANT ALL ON public.favoritos TO service_role;
GRANT ALL ON public.notas TO service_role;
GRANT ALL ON public.leituras_biblia TO service_role;
GRANT ALL ON public.diario_espiritual TO service_role;
GRANT ALL ON public.conquistas_catalogo TO service_role;
GRANT SELECT ON public.conquistas_catalogo TO anon, authenticated;
GRANT ALL ON public.conquistas_usuario TO service_role;
GRANT EXECUTE ON FUNCTION public.reconciliar_identidade_conta(uuid, uuid, text) TO service_role;

-- ===== DADOS INICIAIS (secoes do forum e conquistas) =====


INSERT INTO public.conquistas_catalogo VALUES ('primeira-oracao', 'Primeiro Amém', 'Registrou a primeira oração no diário.', 'sparkles', 20, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('streak-3', 'Perseverança', 'Três dias consecutivos de oração.', 'flame', 40, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('streak-7', 'Semana Santa', 'Sete dias consecutivos de oração.', 'flame', 80, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('streak-30', 'Mês de Graça', 'Trinta dias consecutivos de oração.', 'crown', 250, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('streak-100', 'Centúria Orante', 'Cem dias consecutivos de oração.', 'crown', 800, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('primeiro-capitulo', 'Primeira Página', 'Leu o primeiro capítulo da Bíblia.', 'book-open', 20, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('dez-capitulos', 'Leitor Assíduo', 'Leu dez capítulos da Bíblia.', 'book-open', 60, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('evangelho-completo', 'Evangelizado', 'Concluiu um Evangelho inteiro.', 'scroll', 200, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('primeiro-favorito', 'Palavra Guardada', 'Guardou o primeiro versículo favorito.', 'bookmark', 15, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('primeira-nota', 'Escriba', 'Escreveu a primeira anotação pessoal.', 'pen-line', 15, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('primeiro-topico', 'Voz na Ágora', 'Abriu o primeiro tópico no fórum.', 'message-circle', 30, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.conquistas_catalogo VALUES ('dez-respostas', 'Irmão Solícito', 'Respondeu dez vezes no fórum.', 'users', 90, '2026-08-02 15:02:40.907022+00');

INSERT INTO public.forum_secoes VALUES ('a7bdf8cc-14f1-4191-87a8-bc3043c7805b', 'fe-e-doutrina', 'Fé e Doutrina', 'Dúvidas sobre dogmas, Catecismo e magistério.', 1, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.forum_secoes VALUES ('d79138ab-3797-4949-a613-2e4378ade683', 'sagrada-escritura', 'Sagrada Escritura', 'Estudo e partilha da Palavra de Deus.', 2, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.forum_secoes VALUES ('c9d85ba7-b4d3-43f3-bd55-a1ff4c47ac7e', 'vida-de-oracao', 'Vida de Oração', 'Rosário, Liturgia das Horas, devoções e silêncio.', 3, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.forum_secoes VALUES ('1a9ca546-d7fb-473b-bf12-9f1c92f9f0c7', 'santos-e-testemunhos', 'Santos e Testemunhos', 'Vidas dos santos e graças recebidas.', 4, '2026-08-02 15:02:40.907022+00');
INSERT INTO public.forum_secoes VALUES ('eca5c5e7-8bf7-49a6-89e2-fe6463c89c7b', 'apologetica', 'Apologética', 'Como responder às objeções à fé católica.', 5, '2026-08-02 15:02:40.907022+00');


COMMIT;
