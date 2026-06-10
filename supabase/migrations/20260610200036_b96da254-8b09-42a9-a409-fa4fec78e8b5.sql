CREATE TABLE public.prayer_journal (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_date date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  intention text,
  reflection text,
  prayer_minutes integer NOT NULL DEFAULT 0 CHECK (prayer_minutes >= 0 AND prayer_minutes <= 1440),
  mood text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, entry_date)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.prayer_journal TO authenticated;
GRANT ALL ON public.prayer_journal TO service_role;

ALTER TABLE public.prayer_journal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own journal" ON public.prayer_journal
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own journal" ON public.prayer_journal
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own journal" ON public.prayer_journal
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own journal" ON public.prayer_journal
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER prayer_journal_touch_updated_at
  BEFORE UPDATE ON public.prayer_journal
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX prayer_journal_user_date_idx ON public.prayer_journal (user_id, entry_date DESC);

-- Conquistas do diário
INSERT INTO public.achievements (code, title, description, tier, icon) VALUES
  ('journal_first', 'Primeira Página', 'Registrou sua primeira oração no diário espiritual.', 'bronze', 'book'),
  ('journal_week', 'Semana Refletida', 'Sete dias com reflexão escrita no diário.', 'silver', 'book'),
  ('journal_month', 'Mês Contemplativo', 'Trinta entradas no diário espiritual.', 'gold', 'book'),
  ('prayer_60min', 'Hora Santa', 'Acumulou 60 minutos de oração em um único dia.', 'silver', 'clock')
ON CONFLICT (code) DO NOTHING;