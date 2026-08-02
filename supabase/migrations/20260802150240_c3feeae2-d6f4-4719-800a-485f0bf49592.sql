-- =========================================================
-- Portal Católico — base completa (sem contas de usuário)
-- Acesso exclusivamente via server functions (service_role).
-- =========================================================

-- 1. IDENTIDADES ANÔNIMAS -------------------------------------------------
CREATE TABLE public.identidades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  santo_slug TEXT NOT NULL,
  santo_nome TEXT NOT NULL,
  santo_imagem TEXT,
  apelido TEXT,
  xp INTEGER NOT NULL DEFAULT 0,
  nivel INTEGER NOT NULL DEFAULT 1,
  streak INTEGER NOT NULL DEFAULT 0,
  melhor_streak INTEGER NOT NULL DEFAULT 0,
  ultima_oracao DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.identidades TO service_role;
ALTER TABLE public.identidades ENABLE ROW LEVEL SECURITY;

-- 2. DIÁRIO ESPIRITUAL ----------------------------------------------------
CREATE TABLE public.diario_espiritual (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identidade_id UUID NOT NULL REFERENCES public.identidades(id) ON DELETE CASCADE,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  intencao TEXT,
  reflexao TEXT,
  minutos INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (identidade_id, data)
);
GRANT ALL ON public.diario_espiritual TO service_role;
ALTER TABLE public.diario_espiritual ENABLE ROW LEVEL SECURITY;

-- 3. CONQUISTAS -----------------------------------------------------------
CREATE TABLE public.conquistas_catalogo (
  slug TEXT NOT NULL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  icone TEXT,
  xp INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.conquistas_catalogo TO service_role;
ALTER TABLE public.conquistas_catalogo ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.conquistas_usuario (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identidade_id UUID NOT NULL REFERENCES public.identidades(id) ON DELETE CASCADE,
  conquista_slug TEXT NOT NULL REFERENCES public.conquistas_catalogo(slug) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (identidade_id, conquista_slug)
);
GRANT ALL ON public.conquistas_usuario TO service_role;
ALTER TABLE public.conquistas_usuario ENABLE ROW LEVEL SECURITY;

-- 4. BÍBLIA ---------------------------------------------------------------
CREATE TABLE public.leituras_biblia (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identidade_id UUID NOT NULL REFERENCES public.identidades(id) ON DELETE CASCADE,
  livro TEXT NOT NULL,
  capitulo INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (identidade_id, livro, capitulo)
);
GRANT ALL ON public.leituras_biblia TO service_role;
ALTER TABLE public.leituras_biblia ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.favoritos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identidade_id UUID NOT NULL REFERENCES public.identidades(id) ON DELETE CASCADE,
  livro TEXT NOT NULL,
  capitulo INTEGER NOT NULL,
  versiculo INTEGER NOT NULL,
  texto TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (identidade_id, livro, capitulo, versiculo)
);
GRANT ALL ON public.favoritos TO service_role;
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.notas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identidade_id UUID NOT NULL REFERENCES public.identidades(id) ON DELETE CASCADE,
  livro TEXT NOT NULL,
  capitulo INTEGER NOT NULL,
  versiculo INTEGER,
  conteudo TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.notas TO service_role;
ALTER TABLE public.notas ENABLE ROW LEVEL SECURITY;

-- 5. FÓRUM AGORA ECCLESIAE ------------------------------------------------
CREATE TABLE public.forum_secoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.forum_secoes TO service_role;
ALTER TABLE public.forum_secoes ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.forum_topicos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  secao_id UUID NOT NULL REFERENCES public.forum_secoes(id) ON DELETE CASCADE,
  identidade_id UUID NOT NULL REFERENCES public.identidades(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  corpo TEXT NOT NULL,
  fixado BOOLEAN NOT NULL DEFAULT false,
  trancado BOOLEAN NOT NULL DEFAULT false,
  respostas_count INTEGER NOT NULL DEFAULT 0,
  ultima_atividade TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.forum_topicos TO service_role;
ALTER TABLE public.forum_topicos ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_forum_topicos_secao ON public.forum_topicos (secao_id, ultima_atividade DESC);

CREATE TABLE public.forum_respostas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topico_id UUID NOT NULL REFERENCES public.forum_topicos(id) ON DELETE CASCADE,
  identidade_id UUID NOT NULL REFERENCES public.identidades(id) ON DELETE CASCADE,
  corpo TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.forum_respostas TO service_role;
ALTER TABLE public.forum_respostas ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_forum_respostas_topico ON public.forum_respostas (topico_id, created_at);

CREATE TABLE public.forum_reacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identidade_id UUID NOT NULL REFERENCES public.identidades(id) ON DELETE CASCADE,
  topico_id UUID REFERENCES public.forum_topicos(id) ON DELETE CASCADE,
  resposta_id UUID REFERENCES public.forum_respostas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL DEFAULT 'amem',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT reacao_alvo_unico CHECK (
    (topico_id IS NOT NULL AND resposta_id IS NULL) OR
    (topico_id IS NULL AND resposta_id IS NOT NULL)
  )
);
GRANT ALL ON public.forum_reacoes TO service_role;
ALTER TABLE public.forum_reacoes ENABLE ROW LEVEL SECURITY;
CREATE UNIQUE INDEX idx_reacao_topico ON public.forum_reacoes (identidade_id, topico_id, tipo) WHERE topico_id IS NOT NULL;
CREATE UNIQUE INDEX idx_reacao_resposta ON public.forum_reacoes (identidade_id, resposta_id, tipo) WHERE resposta_id IS NOT NULL;

-- 6. TRIGGERS updated_at --------------------------------------------------
CREATE TRIGGER touch_identidades BEFORE UPDATE ON public.identidades
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_diario BEFORE UPDATE ON public.diario_espiritual
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_notas BEFORE UPDATE ON public.notas
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_forum_topicos BEFORE UPDATE ON public.forum_topicos
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_forum_respostas BEFORE UPDATE ON public.forum_respostas
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- 7. SEEDS ---------------------------------------------------------------
INSERT INTO public.forum_secoes (slug, nome, descricao, ordem) VALUES
  ('fe-e-doutrina', 'Fé e Doutrina', 'Dúvidas sobre dogmas, Catecismo e magistério.', 1),
  ('sagrada-escritura', 'Sagrada Escritura', 'Estudo e partilha da Palavra de Deus.', 2),
  ('vida-de-oracao', 'Vida de Oração', 'Rosário, Liturgia das Horas, devoções e silêncio.', 3),
  ('santos-e-testemunhos', 'Santos e Testemunhos', 'Vidas dos santos e graças recebidas.', 4),
  ('apologetica', 'Apologética', 'Como responder às objeções à fé católica.', 5);

INSERT INTO public.conquistas_catalogo (slug, titulo, descricao, icone, xp) VALUES
  ('primeira-oracao', 'Primeiro Amém', 'Registrou a primeira oração no diário.', 'sparkles', 20),
  ('streak-3', 'Perseverança', 'Três dias consecutivos de oração.', 'flame', 40),
  ('streak-7', 'Semana Santa', 'Sete dias consecutivos de oração.', 'flame', 80),
  ('streak-30', 'Mês de Graça', 'Trinta dias consecutivos de oração.', 'crown', 250),
  ('streak-100', 'Centúria Orante', 'Cem dias consecutivos de oração.', 'crown', 800),
  ('primeiro-capitulo', 'Primeira Página', 'Leu o primeiro capítulo da Bíblia.', 'book-open', 20),
  ('dez-capitulos', 'Leitor Assíduo', 'Leu dez capítulos da Bíblia.', 'book-open', 60),
  ('evangelho-completo', 'Evangelizado', 'Concluiu um Evangelho inteiro.', 'scroll', 200),
  ('primeiro-favorito', 'Palavra Guardada', 'Guardou o primeiro versículo favorito.', 'bookmark', 15),
  ('primeira-nota', 'Escriba', 'Escreveu a primeira anotação pessoal.', 'pen-line', 15),
  ('primeiro-topico', 'Voz na Ágora', 'Abriu o primeiro tópico no fórum.', 'message-circle', 30),
  ('dez-respostas', 'Irmão Solícito', 'Respondeu dez vezes no fórum.', 'users', 90);