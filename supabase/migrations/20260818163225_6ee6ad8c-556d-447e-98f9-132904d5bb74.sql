GRANT SELECT ON public.forum_reacoes TO anon, authenticated;

DROP POLICY IF EXISTS forum_reacoes_public_read ON public.forum_reacoes;
CREATE POLICY forum_reacoes_public_read
  ON public.forum_reacoes FOR SELECT
  TO anon, authenticated
  USING (true);