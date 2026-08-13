CREATE TABLE IF NOT EXISTS public.estudos_conteudo (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identidade_id uuid NOT NULL REFERENCES public.identidades(id) ON DELETE CASCADE,
  tipo text NOT NULL,
  chave text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT estudos_conteudo_unico UNIQUE (identidade_id, tipo, chave)
);

CREATE INDEX IF NOT EXISTS estudos_conteudo_identidade_tipo_idx
  ON public.estudos_conteudo (identidade_id, tipo);

GRANT ALL ON public.estudos_conteudo TO service_role;

ALTER TABLE public.estudos_conteudo ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Acesso interno do servidor" ON public.estudos_conteudo;
CREATE POLICY "Acesso interno do servidor" ON public.estudos_conteudo
  TO service_role USING (true) WITH CHECK (true);

INSERT INTO public.conquistas_catalogo (slug, titulo, descricao, icone, xp) VALUES
  ('catecismo-10', 'Explorador do Catecismo', 'Consultou 10 seções do Catecismo da Igreja Católica.', 'book-open', 60),
  ('conhecedor-catecismo', 'Conhecedor do Catecismo', 'Percorreu todas as seções das quatro partes do Catecismo.', 'library', 150),
  ('filho-de-maria', 'Filho de Maria', 'Estudou 10 conteúdos sobre Nossa Senhora.', 'flower', 100),
  ('caminho-sao-tomas', 'Caminho de São Tomás', 'Concluiu uma trilha de formação de nível avançado.', 'graduation-cap', 200)
ON CONFLICT (slug) DO UPDATE
  SET titulo = EXCLUDED.titulo, descricao = EXCLUDED.descricao, icone = EXCLUDED.icone, xp = EXCLUDED.xp;