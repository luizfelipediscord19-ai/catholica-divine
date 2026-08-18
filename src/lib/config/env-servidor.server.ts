// Server-only. Normaliza os nomes das variáveis de ambiente do backend.
//
// Na hospedagem (Vercel) é comum a chave secreta do backend estar salva com
// outro nome (SUPABASE_SECRET_KEY, SUPABASE_SECRET_KEYS, ...) ou apenas com o
// prefixo VITE_. Sem SUPABASE_SERVICE_ROLE_KEY o painel espiritual e a escrita
// no fórum quebram ("Não foi possível criar a identidade"), mesmo com a leitura
// pública funcionando. Aqui aceitamos os apelidos mais comuns.
//
// Deve ser chamado dentro do fetch do servidor: no runtime de edge o ambiente
// só é ligado ao process.env no momento da requisição.

function primeiro(...nomes: string[]): string | undefined {
  for (const nome of nomes) {
    const valor = process.env[nome];
    if (valor && valor.trim()) return valor.trim();
  }
  return undefined;
}

function definir(alvo: string, valor: string | undefined) {
  if (valor && !process.env[alvo]) process.env[alvo] = valor;
}

let avisado = false;

export function normalizarEnvBackend() {
  definir("SUPABASE_URL", primeiro("SUPABASE_URL", "VITE_SUPABASE_URL"));
  definir(
    "SUPABASE_PUBLISHABLE_KEY",
    primeiro(
      "SUPABASE_PUBLISHABLE_KEY",
      "VITE_SUPABASE_PUBLISHABLE_KEY",
      "SUPABASE_ANON_KEY",
      "VITE_SUPABASE_ANON_KEY",
    ),
  );
  definir(
    "SUPABASE_SERVICE_ROLE_KEY",
    primeiro(
      "SUPABASE_SERVICE_ROLE_KEY",
      "SUPABASE_SECRET_KEY",
      "SUPABASE_SECRET_KEYS",
      "SUPABASE_SERVICE_KEY",
      "SERVICE_ROLE_KEY",
    ),
  );

  if (!process.env["SUPABASE_SERVICE_ROLE_KEY"] && !avisado) {
    avisado = true;
    console.error(
      "[Portal] SUPABASE_SERVICE_ROLE_KEY ausente na hospedagem: painel espiritual, " +
        "diário e escrita no fórum ficarão indisponíveis até a chave secreta do backend ser configurada.",
    );
  }
}
