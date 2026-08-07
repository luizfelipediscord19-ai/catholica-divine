DROP FUNCTION IF EXISTS public.reconciliar_identidade_conta(uuid, text);

CREATE OR REPLACE FUNCTION public.reconciliar_identidade_conta(_user_id uuid, _token_anonimo uuid, _email text DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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
  SET texto = COALESCE(public.favoritos.texto, EXCLUDED.texto);
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

REVOKE ALL ON FUNCTION public.reconciliar_identidade_conta(uuid, uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reconciliar_identidade_conta(uuid, uuid, text) TO service_role;