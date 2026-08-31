CREATE TABLE public.liturgia_dia (
  iso DATE PRIMARY KEY,
  celebracao TEXT NOT NULL,
  tempo TEXT,
  cor TEXT,
  ano_liturgico TEXT,
  leituras JSONB NOT NULL DEFAULT '{}'::jsonb,
  fonte TEXT NOT NULL DEFAULT 'cnbb',
  verificado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.liturgia_dia TO anon;
GRANT SELECT ON public.liturgia_dia TO authenticated;
GRANT ALL ON public.liturgia_dia TO service_role;

ALTER TABLE public.liturgia_dia ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leituras da Missa sao publicas"
ON public.liturgia_dia FOR SELECT
USING (true);

CREATE OR REPLACE FUNCTION public.set_updated_at_liturgia()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_liturgia_dia_updated_at
BEFORE UPDATE ON public.liturgia_dia
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at_liturgia();