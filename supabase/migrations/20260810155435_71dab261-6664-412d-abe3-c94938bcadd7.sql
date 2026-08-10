CREATE TABLE IF NOT EXISTS public.push_dispositivos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  fuso_offset INTEGER NOT NULL DEFAULT 0,
  horarios JSONB NOT NULL DEFAULT '{}'::jsonb,
  ultimo_envio JSONB NOT NULL DEFAULT '{}'::jsonb,
  ativo BOOLEAN NOT NULL DEFAULT true,
  falhas INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.push_dispositivos TO service_role;

ALTER TABLE public.push_dispositivos ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS push_dispositivos_ativo_idx ON public.push_dispositivos (ativo);

CREATE OR REPLACE FUNCTION public.push_dispositivos_touch()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS push_dispositivos_updated_at ON public.push_dispositivos;
CREATE TRIGGER push_dispositivos_updated_at
BEFORE UPDATE ON public.push_dispositivos
FOR EACH ROW EXECUTE FUNCTION public.push_dispositivos_touch();