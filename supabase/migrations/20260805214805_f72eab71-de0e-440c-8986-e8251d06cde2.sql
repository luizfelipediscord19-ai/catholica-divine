REVOKE SELECT ON public.identidades FROM anon, authenticated;
GRANT SELECT (id, santo_nome, santo_slug, santo_imagem, nivel, apelido) ON public.identidades TO anon, authenticated;