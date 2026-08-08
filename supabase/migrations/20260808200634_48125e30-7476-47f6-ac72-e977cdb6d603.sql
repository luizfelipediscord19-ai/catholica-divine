REVOKE EXECUTE ON FUNCTION public.portal_garantir_identidade(uuid, text, text, text) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.portal_obter_painel(uuid) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.portal_escolher_santo(uuid, text, text, text) FROM anon, authenticated;
DROP FUNCTION public.portal_garantir_identidade(uuid, text, text, text);
DROP FUNCTION public.portal_obter_painel(uuid);
DROP FUNCTION public.portal_escolher_santo(uuid, text, text, text);