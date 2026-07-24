import type { ScrapedData } from "@/types/camera";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export async function fetchTempos(): Promise<ScrapedData> {
   const response = await fetch(`${API_BASE_URL}/api/tempos`);

   if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.error ?? `Erro ao buscar dados (${response.status})`);
   }

   return response.json();
}

/**
 * Inscreve-se no stream SSE do servidor para receber atualizações em tempo real.
 * Retorna uma função de cleanup que desconecta o stream.
 */
export function subscribeToTempos(
   onData: (data: ScrapedData) => void,
   onError?: (error: Error) => void,
): () => void {
   let cancelled = false;
   let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

   async function connect() {
      try {
         const response = await fetch(`${API_BASE_URL}/api/stream`);

         if (!response.ok || !response.body) {
            throw new Error(`SSE indisponível (${response.status})`);
         }

         reader = response.body.getReader();
         const decoder = new TextDecoder();
         let buffer = "";

         while (!cancelled) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // SSE messages are separated by double newline
            const messages = buffer.split("\n\n");
            buffer = messages.pop() ?? "";

            for (const message of messages) {
               const match = message.match(/^data:\s*(.+)$/m);
               if (match) {
                  try {
                     const data = JSON.parse(match[1]) as ScrapedData;
                     onData(data);
                  } catch {
                     // Mensagem malformada, ignorar
                  }
               }
            }
         }
      } catch (err) {
         if (!cancelled) {
            onError?.(err instanceof Error ? err : new Error(String(err)));
         }
      }
   }

   connect();

   return () => {
      cancelled = true;
      reader?.cancel().catch(() => {});
   };
}
