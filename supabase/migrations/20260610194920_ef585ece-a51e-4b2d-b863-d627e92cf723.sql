-- Catálogo público dos livros
CREATE TABLE public.bible_books (
  slug text PRIMARY KEY,
  name text NOT NULL,
  abbrev text NOT NULL,
  testament text NOT NULL CHECK (testament IN ('AT','NT')),
  sort_order integer NOT NULL,
  chapter_count integer NOT NULL,
  is_deuterocanonical boolean NOT NULL DEFAULT false,
  api_slug text
);
GRANT SELECT ON public.bible_books TO anon, authenticated;
GRANT ALL ON public.bible_books TO service_role;
ALTER TABLE public.bible_books ENABLE ROW LEVEL SECURITY;
CREATE POLICY bible_books_public_read ON public.bible_books FOR SELECT USING (true);

-- Favoritos
CREATE TABLE public.bible_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  book_slug text NOT NULL REFERENCES public.bible_books(slug) ON DELETE CASCADE,
  chapter integer NOT NULL,
  verse integer NOT NULL,
  verse_text text,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, book_slug, chapter, verse)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bible_bookmarks TO authenticated;
GRANT ALL ON public.bible_bookmarks TO service_role;
ALTER TABLE public.bible_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY bm_select_own ON public.bible_bookmarks FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY bm_insert_own ON public.bible_bookmarks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY bm_update_own ON public.bible_bookmarks FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY bm_delete_own ON public.bible_bookmarks FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Notas por capítulo
CREATE TABLE public.bible_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  book_slug text NOT NULL REFERENCES public.bible_books(slug) ON DELETE CASCADE,
  chapter integer NOT NULL,
  content text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, book_slug, chapter)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bible_notes TO authenticated;
GRANT ALL ON public.bible_notes TO service_role;
ALTER TABLE public.bible_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY bn_select_own ON public.bible_notes FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY bn_insert_own ON public.bible_notes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY bn_update_own ON public.bible_notes FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY bn_delete_own ON public.bible_notes FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER bible_notes_touch BEFORE UPDATE ON public.bible_notes FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed: 73 livros católicos (ordem litúrgica, contagem de capítulos padrão)
INSERT INTO public.bible_books (slug,name,abbrev,testament,sort_order,chapter_count,is_deuterocanonical,api_slug) VALUES
('genesis','Gênesis','Gn','AT',1,50,false,'genesis'),
('exodo','Êxodo','Ex','AT',2,40,false,'exodus'),
('levitico','Levítico','Lv','AT',3,27,false,'leviticus'),
('numeros','Números','Nm','AT',4,36,false,'numbers'),
('deuteronomio','Deuteronômio','Dt','AT',5,34,false,'deuteronomy'),
('josue','Josué','Js','AT',6,24,false,'joshua'),
('juizes','Juízes','Jz','AT',7,21,false,'judges'),
('rute','Rute','Rt','AT',8,4,false,'ruth'),
('1samuel','1 Samuel','1Sm','AT',9,31,false,'1 samuel'),
('2samuel','2 Samuel','2Sm','AT',10,24,false,'2 samuel'),
('1reis','1 Reis','1Rs','AT',11,22,false,'1 kings'),
('2reis','2 Reis','2Rs','AT',12,25,false,'2 kings'),
('1cronicas','1 Crônicas','1Cr','AT',13,29,false,'1 chronicles'),
('2cronicas','2 Crônicas','2Cr','AT',14,36,false,'2 chronicles'),
('esdras','Esdras','Esd','AT',15,10,false,'ezra'),
('neemias','Neemias','Ne','AT',16,13,false,'nehemiah'),
('tobias','Tobias','Tb','AT',17,14,true,null),
('judite','Judite','Jt','AT',18,16,true,null),
('ester','Ester','Est','AT',19,10,false,'esther'),
('1macabeus','1 Macabeus','1Mc','AT',20,16,true,null),
('2macabeus','2 Macabeus','2Mc','AT',21,15,true,null),
('jo','Jó','Jó','AT',22,42,false,'job'),
('salmos','Salmos','Sl','AT',23,150,false,'psalms'),
('proverbios','Provérbios','Pr','AT',24,31,false,'proverbs'),
('eclesiastes','Eclesiastes','Ecl','AT',25,12,false,'ecclesiastes'),
('cantares','Cântico dos Cânticos','Ct','AT',26,8,false,'song of solomon'),
('sabedoria','Sabedoria','Sb','AT',27,19,true,null),
('eclesiastico','Eclesiástico (Sirácida)','Eclo','AT',28,51,true,null),
('isaias','Isaías','Is','AT',29,66,false,'isaiah'),
('jeremias','Jeremias','Jr','AT',30,52,false,'jeremiah'),
('lamentacoes','Lamentações','Lm','AT',31,5,false,'lamentations'),
('baruc','Baruc','Br','AT',32,6,true,null),
('ezequiel','Ezequiel','Ez','AT',33,48,false,'ezekiel'),
('daniel','Daniel','Dn','AT',34,14,false,'daniel'),
('oseias','Oseias','Os','AT',35,14,false,'hosea'),
('joel','Joel','Jl','AT',36,3,false,'joel'),
('amos','Amós','Am','AT',37,9,false,'amos'),
('abdias','Abdias','Ab','AT',38,1,false,'obadiah'),
('jonas','Jonas','Jn','AT',39,4,false,'jonah'),
('miqueias','Miqueias','Mq','AT',40,7,false,'micah'),
('naum','Naum','Na','AT',41,3,false,'nahum'),
('habacuc','Habacuc','Hab','AT',42,3,false,'habakkuk'),
('sofonias','Sofonias','Sf','AT',43,3,false,'zephaniah'),
('ageu','Ageu','Ag','AT',44,2,false,'haggai'),
('zacarias','Zacarias','Zc','AT',45,14,false,'zechariah'),
('malaquias','Malaquias','Ml','AT',46,4,false,'malachi'),
('mateus','Mateus','Mt','NT',47,28,false,'matthew'),
('marcos','Marcos','Mc','NT',48,16,false,'mark'),
('lucas','Lucas','Lc','NT',49,24,false,'luke'),
('joao','João','Jo','NT',50,21,false,'john'),
('atos','Atos dos Apóstolos','At','NT',51,28,false,'acts'),
('romanos','Romanos','Rm','NT',52,16,false,'romans'),
('1corintios','1 Coríntios','1Cor','NT',53,16,false,'1 corinthians'),
('2corintios','2 Coríntios','2Cor','NT',54,13,false,'2 corinthians'),
('galatas','Gálatas','Gl','NT',55,6,false,'galatians'),
('efesios','Efésios','Ef','NT',56,6,false,'ephesians'),
('filipenses','Filipenses','Fl','NT',57,4,false,'philippians'),
('colossenses','Colossenses','Cl','NT',58,4,false,'colossians'),
('1tessalonicenses','1 Tessalonicenses','1Ts','NT',59,5,false,'1 thessalonians'),
('2tessalonicenses','2 Tessalonicenses','2Ts','NT',60,3,false,'2 thessalonians'),
('1timoteo','1 Timóteo','1Tm','NT',61,6,false,'1 timothy'),
('2timoteo','2 Timóteo','2Tm','NT',62,4,false,'2 timothy'),
('tito','Tito','Tt','NT',63,3,false,'titus'),
('filemon','Filêmon','Fm','NT',64,1,false,'philemon'),
('hebreus','Hebreus','Hb','NT',65,13,false,'hebrews'),
('tiago','Tiago','Tg','NT',66,5,false,'james'),
('1pedro','1 Pedro','1Pe','NT',67,5,false,'1 peter'),
('2pedro','2 Pedro','2Pe','NT',68,3,false,'2 peter'),
('1joao','1 João','1Jo','NT',69,5,false,'1 john'),
('2joao','2 João','2Jo','NT',70,1,false,'2 john'),
('3joao','3 João','3Jo','NT',71,1,false,'3 john'),
('judas','Judas','Jd','NT',72,1,false,'jude'),
('apocalipse','Apocalipse','Ap','NT',73,22,false,'revelation');

-- Conquistas de leitura
INSERT INTO public.achievements (code,title,description,tier,icon,sort_order) VALUES
('bible_first_chapter','Primeira leitura','Leu o primeiro capítulo bíblico','bronze','book',100),
('bible_10_chapters','Leitor iniciante','10 capítulos lidos','bronze','book-open',101),
('bible_50_chapters','Leitor assíduo','50 capítulos lidos','silver','book-open',102),
('bible_100_chapters','Leitor dedicado','100 capítulos lidos','gold','book-marked',103),
('bible_book_joao','Evangelho de João','Completou o Evangelho de João','silver','cross',110),
('bible_book_salmos','Salmista','Completou os 150 Salmos','gold','music',111),
('bible_nt_complete','Novo Testamento','Completou o Novo Testamento','gold','sparkles',120),
('bible_complete','Bíblia completa','Leu toda a Bíblia','gold','crown',130)
ON CONFLICT (code) DO NOTHING;