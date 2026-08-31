# Redeploy Vercel — atualizar o site publicado

## Objetivo
Atualizar https://portalcatolico.vercel.app com o novo design da home e das páginas de conteúdo já aplicado no preview.

## Passos
1. Verificar o scan de segurança antes de publicar (`security--get_scan_results`); se houver achados críticos, citá-los ao usuário antes de prosseguir.
2. Publicar o estado atual via `preview_ui--publish` (deploy de frontend).
3. Confirmar a URL publicada e orientar revisão no navegador.

## Observações
- Apenas mudanças de frontend (design da home, cards, hero, faixas de autoridade) — não há alteração de backend nem migração de banco nesta rodada.
- O domínio de produção permanece https://portalcatolico.vercel.app.
