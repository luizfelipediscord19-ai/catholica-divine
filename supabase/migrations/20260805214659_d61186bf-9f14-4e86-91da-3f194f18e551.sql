-- Public read access for forum content (works with the publishable key,
-- so the site keeps working even without the service-role key configured).
GRANT SELECT ON public.forum_secoes TO anon, authenticated;
GRANT SELECT ON public.forum_topicos TO anon, authenticated;
GRANT SELECT ON public.forum_respostas TO anon, authenticated;
GRANT SELECT ON public.conquistas_catalogo TO anon, authenticated;
GRANT SELECT (id, santo_nome, santo_slug, santo_imagem, nivel, apelido) ON public.identidades TO anon, authenticated;

GRANT ALL ON public.forum_secoes TO service_role;
GRANT ALL ON public.forum_topicos TO service_role;
GRANT ALL ON public.forum_respostas TO service_role;
GRANT ALL ON public.forum_reacoes TO service_role;
GRANT ALL ON public.forum_denuncias TO service_role;
GRANT ALL ON public.identidades TO service_role;
GRANT ALL ON public.diario_espiritual TO service_role;
GRANT ALL ON public.leituras_biblia TO service_role;
GRANT ALL ON public.favoritos TO service_role;
GRANT ALL ON public.notas TO service_role;
GRANT ALL ON public.conquistas_catalogo TO service_role;
GRANT ALL ON public.conquistas_usuario TO service_role;

DROP POLICY IF EXISTS "forum_secoes_public_read" ON public.forum_secoes;
CREATE POLICY "forum_secoes_public_read" ON public.forum_secoes
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "forum_topicos_public_read" ON public.forum_topicos;
CREATE POLICY "forum_topicos_public_read" ON public.forum_topicos
  FOR SELECT TO anon, authenticated USING (status = 'aprovado');

DROP POLICY IF EXISTS "forum_respostas_public_read" ON public.forum_respostas;
CREATE POLICY "forum_respostas_public_read" ON public.forum_respostas
  FOR SELECT TO anon, authenticated USING (status = 'aprovado');

DROP POLICY IF EXISTS "conquistas_catalogo_public_read" ON public.conquistas_catalogo;
CREATE POLICY "conquistas_catalogo_public_read" ON public.conquistas_catalogo
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "identidades_public_read" ON public.identidades;
CREATE POLICY "identidades_public_read" ON public.identidades
  FOR SELECT TO anon, authenticated USING (true);