-- Leitura pública limitada às colunas públicas da identidade (autor do fórum).
GRANT SELECT (id, santo_nome, santo_slug, santo_imagem, nivel, apelido, xp)
  ON public.identidades TO anon, authenticated;
GRANT ALL ON public.identidades TO service_role;

DROP POLICY IF EXISTS identidades_public_autor_read ON public.identidades;
CREATE POLICY identidades_public_autor_read
  ON public.identidades FOR SELECT
  TO anon, authenticated
  USING (true);