-- 1) Least privilege: nenhuma escrita para papéis públicos
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
REVOKE SELECT ON ALL TABLES IN SCHEMA public FROM anon, authenticated;

GRANT SELECT ON public.conquistas_catalogo TO anon, authenticated;
GRANT SELECT ON public.forum_secoes TO anon, authenticated;
GRANT SELECT ON public.forum_topicos TO anon, authenticated;
GRANT SELECT ON public.forum_respostas TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- 2) Política morta / dado sensível: identidades só pelo servidor
DROP POLICY IF EXISTS identidades_public_read ON public.identidades;

-- 3) XP atômico
CREATE OR REPLACE FUNCTION public.somar_xp(_identidade_id uuid, _delta integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_xp integer;
BEGIN
  UPDATE public.identidades
  SET xp = GREATEST(xp + _delta, 0),
      nivel = floor(sqrt(GREATEST(xp + _delta, 0)::numeric / 50))::integer + 1
  WHERE id = _identidade_id
  RETURNING xp INTO v_xp;
  RETURN COALESCE(v_xp, 0);
END;
$$;

REVOKE ALL ON FUNCTION public.somar_xp(uuid, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.somar_xp(uuid, integer) TO service_role;

-- 4) Índices das consultas quentes
CREATE INDEX IF NOT EXISTS idx_notas_identidade ON public.notas (identidade_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_favoritos_identidade ON public.favoritos (identidade_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diario_identidade ON public.diario_espiritual (identidade_id, data DESC);

-- 5) Limite de uso da IA persistido
CREATE TABLE IF NOT EXISTS public.ia_uso (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chave text NOT NULL,
  janela timestamptz NOT NULL,
  contagem integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (chave, janela)
);

GRANT ALL ON public.ia_uso TO service_role;
ALTER TABLE public.ia_uso ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Acesso interno do servidor" ON public.ia_uso
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER touch_ia_uso BEFORE UPDATE ON public.ia_uso
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX IF NOT EXISTS idx_ia_uso_janela ON public.ia_uso (janela);

-- Registra uma requisição e devolve a contagem da janela atual.
CREATE OR REPLACE FUNCTION public.registrar_uso_ia(_chave text, _janela timestamptz)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v integer;
BEGIN
  INSERT INTO public.ia_uso (chave, janela, contagem)
  VALUES (_chave, _janela, 1)
  ON CONFLICT (chave, janela) DO UPDATE SET contagem = public.ia_uso.contagem + 1
  RETURNING contagem INTO v;
  DELETE FROM public.ia_uso WHERE janela < now() - interval '1 day';
  RETURN v;
END;
$$;

REVOKE ALL ON FUNCTION public.registrar_uso_ia(text, timestamptz) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.registrar_uso_ia(text, timestamptz) TO service_role;