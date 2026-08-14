CREATE TABLE public.noticias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  titulo text NOT NULL,
  resumo text NOT NULL,
  corpo text NOT NULL,
  categoria text NOT NULL DEFAULT 'Igreja',
  tags text[] NOT NULL DEFAULT '{}',
  fonte_nome text,
  fonte_url text,
  imagem_url text,
  autor text,
  publicado_em timestamptz NOT NULL DEFAULT now(),
  destaque boolean NOT NULL DEFAULT false,
  publicada boolean NOT NULL DEFAULT true,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX noticias_publicado_em_idx ON public.noticias (publicado_em DESC);
CREATE INDEX noticias_categoria_idx ON public.noticias (categoria);

GRANT SELECT ON public.noticias TO anon;
GRANT SELECT ON public.noticias TO authenticated;
GRANT ALL ON public.noticias TO service_role;

ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Notícias publicadas são públicas"
  ON public.noticias FOR SELECT
  TO anon, authenticated
  USING (publicada = true AND publicado_em <= now());

CREATE OR REPLACE FUNCTION public.noticias_atualizado_em()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER noticias_set_atualizado_em
  BEFORE UPDATE ON public.noticias
  FOR EACH ROW EXECUTE FUNCTION public.noticias_atualizado_em();