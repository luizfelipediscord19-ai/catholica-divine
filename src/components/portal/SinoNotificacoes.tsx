import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Award,
  Bell,
  BellOff,
  BellRing,
  BookOpen,
  Crown,
  Flame,
  ListChecks,
  MessageCircle,
  PenLine,
  Sparkles,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import { useNotificacoes } from "@/hooks/use-notificacoes";
import type { TipoNotificacao } from "@/lib/notificacoes";
import {
  ativarNotificacoesDispositivo,
  desativarNotificacoesDispositivo,
  estadoNotificacoesDispositivo,
  type SuporteNotificacao,
} from "@/lib/notificacoes-dispositivo";

const ICONES: Record<TipoNotificacao, LucideIcon> = {
  conquista: Award,
  nivel: Crown,
  leitura: BookOpen,
  tarefa: ListChecks,
  oracao: Flame,
  nota: PenLine,
  forum: MessageCircle,
  sistema: Sparkles,
};

function tempoRelativo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "agora";
  if (s < 3600) return `${Math.floor(s / 60)} min`;
  if (s < 86400) return `${Math.floor(s / 3600)} h`;
  return `${Math.floor(s / 86400)} d`;
}

export function SinoNotificacoes() {
  const { notificacoes, naoLidas, marcarTodasLidas, marcarLida, limpar } = useNotificacoes();
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: MouseEvent) => {
      if (caixa.current && !caixa.current.contains(e.target as Node)) setAberto(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("mousedown", fora);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", fora);
      document.removeEventListener("keydown", esc);
    };
  }, [aberto]);

  return (
    <div className="relative" ref={caixa}>
      <button
        type="button"
        onClick={() => {
          setAberto((v) => !v);
          if (!aberto) marcarTodasLidas();
        }}
        aria-label={`Notificações${naoLidas > 0 ? ` (${naoLidas} não lidas)` : ""}`}
        aria-expanded={aberto}
        className="relative grid size-11 place-items-center rounded-full border border-gold/20 text-paper/70 transition-premium hover:border-gold/60 hover:text-gold focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <Bell className="size-4" aria-hidden="true" />
        {naoLidas > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold leading-4 text-deep">
            {naoLidas > 9 ? "9+" : naoLidas}
          </span>
        ) : null}
      </button>

      {aberto ? (
        <div
          role="dialog"
          aria-label="Notificações"
          className="fixed left-2 right-2 top-[4.5rem] z-[80] max-h-[70vh] overflow-y-auto border border-gold/25 bg-background/98 shadow-2xl backdrop-blur sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+0.5rem)] sm:w-80"
        >
          <div className="flex items-center justify-between border-b border-gold/15 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold">Notificações</p>
            {notificacoes.length > 0 ? (
              <button
                onClick={limpar}
                className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="size-3" aria-hidden="true" /> Limpar
              </button>
            ) : null}
          </div>

          <AvisosNoAparelho />


          {notificacoes.length === 0 ? (
            <p className="px-4 py-8 text-center text-xs text-muted-foreground">
              Nenhuma notificação por aqui. Suas conquistas, leituras e tarefas aparecerão neste
              espaço.
            </p>
          ) : (
            <ul className="divide-y divide-gold/10">
              {notificacoes.map((n) => {
                const Icone = ICONES[n.tipo] ?? Sparkles;
                const conteudo = (
                  <div className="flex gap-3 px-4 py-3 text-left">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-gold/25 text-gold">
                      <Icone className="size-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-foreground">{n.titulo}</p>
                      {n.mensagem ? (
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {n.mensagem}
                        </p>
                      ) : null}
                      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                        {tempoRelativo(n.criadaEm)}
                      </p>
                    </div>
                  </div>
                );
                return (
                  <li key={n.id} className={n.lida ? "" : "bg-gold/[0.04]"}>
                    {n.href ? (
                      <Link
                        to={n.href}
                        onClick={() => {
                          marcarLida(n.id);
                          setAberto(false);
                        }}
                        className="block hover:bg-gold/5"
                      >
                        {conteudo}
                      </Link>
                    ) : (
                      conteudo
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

/** Permite receber os avisos do portal também no aparelho (telefone/desktop). */
function AvisosNoAparelho() {
  const [estado, setEstado] = useState<SuporteNotificacao>("indisponivel");

  useEffect(() => setEstado(estadoNotificacoesDispositivo()), []);

  if (estado === "indisponivel") return null;

  return (
    <div className="border-b border-gold/10 bg-gold/[0.03] px-4 py-3">
      {estado === "liberado" ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Avisos no aparelho <span className="text-gold">ativados</span>.
          </p>
          <button
            onClick={() => {
              desativarNotificacoesDispositivo();
              setEstado("pendente");
            }}
            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
          >
            <BellOff className="size-3" aria-hidden="true" /> Desligar
          </button>
        </div>
      ) : estado === "bloqueado" ? (
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          As notificações estão bloqueadas nas configurações do navegador. Libere o site para
          receber avisos no telefone.
        </p>
      ) : (
        <div className="space-y-2">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Receba orações, leituras e conquistas direto no seu telefone.
          </p>
          <button
            onClick={async () => setEstado(await ativarNotificacoesDispositivo())}
            className="inline-flex items-center gap-2 bg-gold px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-deep hover:bg-paper"
          >
            <BellRing className="size-3" aria-hidden="true" /> Ativar no aparelho
          </button>
        </div>
      )}
    </div>
  );
}
