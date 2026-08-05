ALTER TABLE public.identidades
  ADD COLUMN IF NOT EXISTS user_id uuid,
  ADD COLUMN IF NOT EXISTS email text;

CREATE UNIQUE INDEX IF NOT EXISTS identidades_user_id_key
  ON public.identidades (user_id)
  WHERE user_id IS NOT NULL;