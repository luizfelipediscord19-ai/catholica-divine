ALTER TABLE public.forum_topicos
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'em_revisao';
ALTER TABLE public.forum_respostas
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'em_revisao';

UPDATE public.forum_topicos SET status = 'aprovado' WHERE status = 'em_revisao';
UPDATE public.forum_respostas SET status = 'aprovado' WHERE status = 'em_revisao';

CREATE INDEX IF NOT EXISTS forum_topicos_status_idx ON public.forum_topicos (status);
CREATE INDEX IF NOT EXISTS forum_respostas_status_idx ON public.forum_respostas (status);

CREATE TABLE public.forum_denuncias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identidade_id uuid REFERENCES public.identidades(id) ON DELETE SET NULL,
  topico_id uuid REFERENCES public.forum_topicos(id) ON DELETE CASCADE,
  resposta_id uuid REFERENCES public.forum_respostas(id) ON DELETE CASCADE,
  motivo text NOT NULL,
  comentario text,
  situacao text NOT NULL DEFAULT 'pendente',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT forum_denuncias_alvo_check CHECK (
    (topico_id IS NOT NULL AND resposta_id IS NULL)
    OR (topico_id IS NULL AND resposta_id IS NOT NULL)
  )
);

GRANT ALL ON public.forum_denuncias TO service_role;

ALTER TABLE public.forum_denuncias ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER touch_forum_denuncias
  BEFORE UPDATE ON public.forum_denuncias
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();