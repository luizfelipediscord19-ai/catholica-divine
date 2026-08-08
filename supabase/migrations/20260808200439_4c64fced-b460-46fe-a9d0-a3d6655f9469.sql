GRANT ALL ON TABLE public.forum_denuncias TO service_role;
GRANT ALL ON TABLE public.forum_reacoes TO service_role;

CREATE POLICY "Acesso interno do servidor"
ON public.conquistas_usuario FOR ALL TO service_role
USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor"
ON public.diario_espiritual FOR ALL TO service_role
USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor"
ON public.favoritos FOR ALL TO service_role
USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor"
ON public.forum_denuncias FOR ALL TO service_role
USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor"
ON public.forum_reacoes FOR ALL TO service_role
USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor"
ON public.leituras_biblia FOR ALL TO service_role
USING (true) WITH CHECK (true);

CREATE POLICY "Acesso interno do servidor"
ON public.notas FOR ALL TO service_role
USING (true) WITH CHECK (true);