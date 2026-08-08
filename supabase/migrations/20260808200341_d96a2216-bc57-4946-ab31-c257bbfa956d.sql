GRANT ALL ON TABLE public.identidades TO service_role;
GRANT ALL ON TABLE public.favoritos TO service_role;
GRANT ALL ON TABLE public.leituras_biblia TO service_role;
GRANT ALL ON TABLE public.notas TO service_role;
GRANT ALL ON TABLE public.diario_espiritual TO service_role;
GRANT ALL ON TABLE public.conquistas_catalogo TO service_role;
GRANT ALL ON TABLE public.conquistas_usuario TO service_role;

GRANT SELECT ON TABLE public.conquistas_catalogo TO authenticated;

GRANT USAGE ON SCHEMA public TO service_role;
GRANT EXECUTE ON FUNCTION public.reconciliar_identidade_conta(uuid, uuid, text) TO service_role;
REVOKE EXECUTE ON FUNCTION public.reconciliar_identidade_conta(uuid, uuid, text) FROM PUBLIC, anon, authenticated;