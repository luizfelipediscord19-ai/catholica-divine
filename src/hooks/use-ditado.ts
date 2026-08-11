import { useCallback, useEffect, useRef, useState } from "react";

export type EstadoDitado = "inativo" | "gravando" | "transcrevendo";

/** Formato de gravação suportado pelo navegador atual. */
function escolherMime(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  const candidatos = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  return candidatos.find((t) => MediaRecorder.isTypeSupported(t));
}

/**
 * Ditado por voz: grava o microfone e devolve o texto transcrito no servidor.
 * Funciona em qualquer navegador com MediaRecorder (inclusive iOS/Safari),
 * ao contrário da Web Speech API.
 */
export function useDitado(onTexto: (texto: string) => void) {
  const [estado, setEstado] = useState<EstadoDitado>("inativo");
  const [erro, setErro] = useState<string | null>(null);
  const [suportado, setSuportado] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const pedacosRef = useRef<Blob[]>([]);
  const paradaLimiteRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSuportado(
      typeof window !== "undefined" &&
        typeof MediaRecorder !== "undefined" &&
        !!navigator.mediaDevices?.getUserMedia,
    );
  }, []);

  const limpar = useCallback(() => {
    if (paradaLimiteRef.current) {
      clearTimeout(paradaLimiteRef.current);
      paradaLimiteRef.current = null;
    }
    recorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    recorderRef.current = null;
    pedacosRef.current = [];
  }, []);

  useEffect(() => () => limpar(), [limpar]);

  const enviar = useCallback(
    async (blob: Blob) => {
      setEstado("transcrevendo");
      try {
        const corpo = new FormData();
        const extensao = blob.type.includes("mp4") ? "m4a" : blob.type.includes("ogg") ? "ogg" : "webm";
        corpo.append("audio", blob, `ditado.${extensao}`);

        const resposta = await fetch("/api/transcrever", { method: "POST", body: corpo });
        if (!resposta.ok) {
          const texto = await resposta.text();
          throw new Error(texto || "Não foi possível transcrever o áudio.");
        }
        const dados = (await resposta.json()) as { texto?: string };
        const texto = (dados.texto ?? "").trim();
        if (!texto) {
          setErro("Não consegui ouvir nada. Tente falar mais perto do microfone.");
          return;
        }
        onTexto(texto);
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Falha ao transcrever o áudio.");
      } finally {
        setEstado("inativo");
      }
    },
    [onTexto],
  );

  const parar = useCallback(() => {
    const gravador = recorderRef.current;
    if (gravador && gravador.state !== "inactive") gravador.stop();
  }, []);

  const iniciar = useCallback(async () => {
    setErro(null);
    if (!suportado) {
      setErro("Este navegador não permite gravar áudio.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      const mimeType = escolherMime();
      const gravador = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      recorderRef.current = gravador;
      pedacosRef.current = [];

      gravador.ondataavailable = (e) => {
        if (e.data.size > 0) pedacosRef.current.push(e.data);
      };
      gravador.onstop = () => {
        const tipo = gravador.mimeType || mimeType || "audio/webm";
        const blob = new Blob(pedacosRef.current, { type: tipo });
        limpar();
        if (blob.size < 1200) {
          setEstado("inativo");
          setErro("Gravação muito curta. Segure e fale a sua pergunta.");
          return;
        }
        void enviar(blob);
      };

      gravador.start();
      setEstado("gravando");
      // Trava de segurança: nunca gravar mais de 60 s.
      paradaLimiteRef.current = setTimeout(() => parar(), 60_000);
    } catch {
      setEstado("inativo");
      setErro("Preciso da sua permissão para usar o microfone.");
    }
  }, [enviar, limpar, parar, suportado]);

  const alternar = useCallback(() => {
    if (estado === "gravando") parar();
    else if (estado === "inativo") void iniciar();
  }, [estado, iniciar, parar]);

  return { estado, erro, suportado, iniciar, parar, alternar, limparErro: () => setErro(null) };
}
