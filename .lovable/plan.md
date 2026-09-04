# Restaurar controles, refinar a experiência e ativar contas reais

## Objetivo
Devolver os botões ao padrão estável anterior, melhorar a clareza visual sem redesenhar os controles e garantir que cadastro, login, progresso e publicação no fórum funcionem juntos na base oficial do Portal Católico.

## Alterações
1. **Restaurar os botões**
   - Repor o comportamento anterior de texto em uma linha e alvo de toque.
   - Unificar os tamanhos dos dois conjuntos de botões usados pelo portal para eliminar alturas conflitantes.
   - Preservar acessibilidade, estados de carregamento e uso em celular.

2. **Refinar UX/UI geral**
   - Melhorar ritmo, hierarquia e leitura das telas de conta, fórum e painel.
   - Tornar os cards de conversas consistentes com o restante do portal.
   - Evitar controles duplicados e deixar estados vazios, carregamento e erro mais claros.

3. **Conectar conta e fórum reais**
   - Manter apenas um mecanismo de sessão para as chamadas protegidas.
   - Corrigir os atalhos “Entrar” e “Criar conta” para abrirem o modo correto.
   - Reconciliar imediatamente o progresso anônimo ao entrar, preservando santo, XP, favoritos e rascunhos.
   - Validar a criação de conta e postagem contra a base oficial configurada para produção.

## Validação
- Verificar tipos e testes relevantes.
- Testar conta/fórum sem criar um usuário real não solicitado.
- Conferir visualmente desktop e celular, incluindo overflow, alturas e estados dos controles.

## Observação de publicação
A prévia local usa uma base diferente da produção. O código será preparado e validado; para o site publicado funcionar, as variáveis da Vercel devem continuar apontando para a base oficial `zdwjaqtocsyojkfpgzyq`, inclusive a chave secreta de servidor correspondente.
