INSERT INTO public.identidades (santo_nome, santo_slug, apelido)
SELECT 'São João Bosco', 'sao-joao-bosco', 'Moderação'
WHERE NOT EXISTS (SELECT 1 FROM public.identidades WHERE apelido = 'Moderação');

WITH mod AS (SELECT id FROM public.identidades WHERE apelido = 'Moderação' LIMIT 1),
seeds(secao_slug, slug, titulo, corpo) AS (
  VALUES
    ('fe-e-doutrina','boas-vindas-fe-e-doutrina','Boas-vindas: como usar esta seção','Aqui conversamos sobre doutrina, Catecismo e questões da fé. Antes de perguntar, vale conferir a página do Catecismo e o Glossário do portal. Perguntas simples são bem-vindas: ninguém nasce sabendo. Regra de ouro: caridade na forma, firmeza na verdade.'),
    ('sagrada-escritura','por-onde-comecar-a-ler-a-biblia','Por onde começar a ler a Bíblia?','Uma sugestão clássica: Evangelho de Marcos (curto e direto), depois Lucas e Atos, e em paralelo os Salmos para a oração. Cada livro do portal tem uma introdução com contexto, autor e temas. Conte aqui por onde você está começando e como está sendo a leitura.'),
    ('vida-de-oracao','sua-rotina-de-oracao','Como está a sua rotina de oração?','Terço, Liturgia das Horas, leitura orante, oração da manhã e da noite: compartilhe o que funciona para você e o que tem sido difícil. Pequenos passos constantes valem mais que grandes propósitos abandonados na segunda semana.'),
    ('santos-e-testemunhos','um-santo-que-mudou-sua-vida','Um santo que mudou sua vida','Conte sobre um santo cuja história tocou você — e por quê. Se ainda não tem um, veja a página de Santos: são 96 vidas, de mártires dos primeiros séculos a testemunhos do século XX.'),
    ('apologetica','duvidas-mais-comuns-que-voce-ouve','Quais dúvidas você mais ouve sobre a fé católica?','Maria, os santos, o Papa, a confissão, a Eucaristia, a Tradição: liste as objeções que aparecem nas suas conversas do dia a dia. Vamos reunir respostas claras, com base na Escritura, nos Padres e no Catecismo.')
)
INSERT INTO public.forum_topicos (secao_id, identidade_id, slug, titulo, corpo, fixado)
SELECT s.id, m.id, seeds.slug, seeds.titulo, seeds.corpo, true
FROM seeds
JOIN public.forum_secoes s ON s.slug = seeds.secao_slug
CROSS JOIN mod m
WHERE NOT EXISTS (SELECT 1 FROM public.forum_topicos t WHERE t.slug = seeds.slug);