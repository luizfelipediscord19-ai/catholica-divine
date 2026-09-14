# Correção de indexação do Portal Católico

## Objetivo
Corrigir os sinais técnicos que hoje podem confundir ou impedir o Google, sem forçar a indexação de páginas privadas, duplicadas ou sem valor de busca.

## Alterações
1. Separar a página principal de Novenas da estrutura usada pelas páginas individuais, eliminando o segundo endereço canônico que aparece nas 12 novenas.
2. Simplificar o `robots.txt`: manter bloqueados somente os endereços técnicos (`/api/`) e permitir que o Google acesse páginas com `noindex` e variações de leitura para compreender corretamente suas instruções e seus endereços canônicos.
3. Manter fora da indexação as páginas pessoais e operacionais: Painel, Favoritos, Login, redefinição de senha, confirmação de e-mail e Busca interna.
4. Validar novamente todos os 1.916 endereços dos cinco mapas do site, conferindo resposta, redirecionamento, canonical e `noindex`.
5. Conferir a renderização da página de Novenas e de uma novena individual no computador e no celular.

## O que os cinco motivos significam
- **Página alternativa com canonical adequada:** geralmente é uma exclusão correta de uma variação duplicada. O conflito real das novenas será corrigido.
- **Página com redirecionamento:** é normal quando um endereço antigo encaminha ao definitivo; nenhum endereço atualmente incluído no mapa redireciona.
- **Bloqueada pelo robots.txt:** será reduzido ao mínimo técnico, deixando o Google ler `noindex` e canonical.
- **Detectada, mas não indexada:** o Google conhece a página, mas ainda não decidiu rastreá-la; mapa, links internos e conteúdo acessível já serão verificados.
- **Rastreada, mas não indexada:** depende também da avaliação de qualidade e duplicidade do Google; não existe comando que obrigue a inclusão.

## Limite da correção
O relatório enviado não mostra quais URLs pertencem a cada categoria. Depois destas correções, o Google precisa rastrear novamente o portal; os números não mudam imediatamente e páginas privadas/duplicadas continuarão corretamente fora do índice.
