CREATE OR REPLACE FUNCTION public.portal_garantir_identidade(
  _token uuid,
  _santo_slug text,
  _santo_nome text,
  _santo_imagem text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r public.identidades%ROWTYPE;
BEGIN
  IF _token IS NOT NULL THEN
    SELECT * INTO r FROM public.identidades WHERE token = _token;
  END IF;

  IF r.id IS NULL THEN
    INSERT INTO public.identidades (santo_slug, santo_nome, santo_imagem)
    VALUES (left(_santo_slug, 120), left(_santo_nome, 160), _santo_imagem)
    RETURNING * INTO r;
  END IF;

  RETURN jsonb_build_object(
    'token', r.token,
    'identidade', jsonb_build_object(
      'id', r.id,
      'santoSlug', r.santo_slug,
      'santoNome', r.santo_nome,
      'santoImagem', r.santo_imagem,
      'santoEscolhido', r.santo_escolhido,
      'apelido', r.apelido,
      'xp', r.xp,
      'nivel', r.nivel,
      'streak', r.streak,
      'melhorStreak', r.melhor_streak,
      'ultimaOracao', r.ultima_oracao
    )
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.portal_obter_painel(_token uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r public.identidades%ROWTYPE;
BEGIN
  SELECT * INTO r FROM public.identidades WHERE token = _token;
  IF r.id IS NULL THEN
    RAISE EXCEPTION 'Identidade não encontrada.';
  END IF;

  RETURN jsonb_build_object(
    'tokenAtual', r.token,
    'identidade', jsonb_build_object(
      'id', r.id, 'santoSlug', r.santo_slug, 'santoNome', r.santo_nome,
      'santoImagem', r.santo_imagem, 'santoEscolhido', r.santo_escolhido,
      'apelido', r.apelido, 'xp', r.xp, 'nivel', r.nivel,
      'streak', r.streak, 'melhorStreak', r.melhor_streak,
      'ultimaOracao', r.ultima_oracao
    ),
    'rezouHoje', r.ultima_oracao = current_date,
    'diarioHoje', (SELECT to_jsonb(d) - 'id' - 'identidade_id' - 'data' - 'created_at' - 'updated_at' FROM public.diario_espiritual d WHERE d.identidade_id = r.id AND d.data = current_date LIMIT 1),
    'leituras', COALESCE((SELECT jsonb_agg(jsonb_build_object('livro', l.livro, 'capitulo', l.capitulo)) FROM public.leituras_biblia l WHERE l.identidade_id = r.id), '[]'::jsonb),
    'ultimaLeitura', (SELECT jsonb_build_object('livro', l.livro, 'capitulo', l.capitulo, 'created_at', l.created_at) FROM public.leituras_biblia l WHERE l.identidade_id = r.id ORDER BY l.created_at DESC LIMIT 1),
    'favoritos', COALESCE((SELECT jsonb_agg(jsonb_build_object('livro', f.livro, 'capitulo', f.capitulo, 'versiculo', f.versiculo, 'texto', f.texto) ORDER BY f.created_at DESC) FROM (SELECT * FROM public.favoritos WHERE identidade_id = r.id ORDER BY created_at DESC LIMIT 50) f), '[]'::jsonb),
    'notas', COALESCE((SELECT jsonb_agg(jsonb_build_object('id', n.id, 'livro', n.livro, 'capitulo', n.capitulo, 'versiculo', n.versiculo, 'conteudo', n.conteudo, 'updated_at', n.updated_at) ORDER BY n.updated_at DESC) FROM (SELECT * FROM public.notas WHERE identidade_id = r.id ORDER BY updated_at DESC LIMIT 50) n), '[]'::jsonb),
    'conquistas', COALESCE((SELECT jsonb_agg(jsonb_build_object('slug', c.slug, 'titulo', c.titulo, 'descricao', c.descricao, 'icone', c.icone, 'xp', c.xp, 'desbloqueada', EXISTS (SELECT 1 FROM public.conquistas_usuario u WHERE u.identidade_id = r.id AND u.conquista_slug = c.slug))) FROM public.conquistas_catalogo c), '[]'::jsonb)
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.portal_escolher_santo(
  _token uuid,
  _santo_slug text,
  _santo_nome text,
  _santo_imagem text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r public.identidades%ROWTYPE;
BEGIN
  UPDATE public.identidades
  SET santo_slug = left(_santo_slug, 120), santo_nome = left(_santo_nome, 160),
      santo_imagem = _santo_imagem, santo_escolhido = true, updated_at = now()
  WHERE token = _token
  RETURNING * INTO r;
  IF r.id IS NULL THEN RAISE EXCEPTION 'Identidade não encontrada.'; END IF;
  RETURN jsonb_build_object(
    'id', r.id, 'santoSlug', r.santo_slug, 'santoNome', r.santo_nome,
    'santoImagem', r.santo_imagem, 'santoEscolhido', r.santo_escolhido,
    'apelido', r.apelido, 'xp', r.xp, 'nivel', r.nivel,
    'streak', r.streak, 'melhorStreak', r.melhor_streak,
    'ultimaOracao', r.ultima_oracao
  );
END;
$$;

REVOKE ALL ON FUNCTION public.portal_garantir_identidade(uuid, text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.portal_obter_painel(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.portal_escolher_santo(uuid, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.portal_garantir_identidade(uuid, text, text, text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.portal_obter_painel(uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.portal_escolher_santo(uuid, text, text, text) TO anon, authenticated, service_role;