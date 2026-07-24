import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "time.json");
const PORT = Number(process.env.PORT) || 3000;

// ── SSE Client Registry ──────────────────────────────────────────────
type SSEClient = {
   controller: ReadableStreamDefaultController;
   alive: boolean;
};

const sseClients = new Set<SSEClient>();

function broadcastToClients(data: unknown) {
   const payload = `data: ${JSON.stringify(data)}\n\n`;
   for (const client of sseClients) {
      try {
         client.controller.enqueue(new TextEncoder().encode(payload));
      } catch {
         client.alive = false;
         sseClients.delete(client);
      }
   }
}

// ── Server ───────────────────────────────────────────────────────────
const app = new Elysia()
   .use(cors())

   .get("/", () => {
      return { status: "API Travessia Fácil operante!" };
   })

   // ── Endpoint original: leitura do arquivo ──
   .get("/api/tempos", ({ set }) => {
      if (!fs.existsSync(DATA_FILE_PATH)) {
         set.status = 503;
         return { error: "Os dados da Semil ainda estão sendo processados." };
      }
      try {
         const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
         return JSON.parse(data);
      } catch (error) {
         console.error("❌ Erro ao ler/parsear time.json:", error);
         set.status = 500;
         return { error: "Falha ao ler os dados da Semil. Tente novamente." };
      }
   })

   // ── SSE: clientes conectam aqui para receber atualizações em tempo real ──
   .get("/api/stream", () => {
      let client: SSEClient;

      const stream = new ReadableStream({
         start(controller) {
            client = { controller, alive: true };
            sseClients.add(client);

            console.log(
               `[SSE] Cliente conectado (${sseClients.size} total)`,
            );

            // Enviar dados atuais na conexão inicial
            if (fs.existsSync(DATA_FILE_PATH)) {
               try {
                  const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
                  const payload = `data: ${data}\n\n`;
                  controller.enqueue(new TextEncoder().encode(payload));
               } catch {
                  // Arquivo pode estar sendo reescrito pelo worker
               }
            }
         },
         cancel() {
            if (client!) {
               client.alive = false;
               sseClients.delete(client);
               console.log(
                  `[SSE] Cliente desconectado (${sseClients.size} restantes)`,
               );
            }
         },
      });

      return new Response(stream, {
         status: 200,
         headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            "Access-Control-Allow-Origin": "*",
         },
      });
   })

   // ── Worker notifica o servidor quando há dados novos ──
   .post("/api/notify", async ({ body }) => {
      console.log(
         `[Notify] Dados recebidos do Worker, broadcasting para ${sseClients.size} cliente(s)`,
      );
      broadcastToClients(body);
      return { ok: true, clients: sseClients.size };
   })

   .listen(PORT);

console.log(`🦊 API do Travessia Fácil rodando na porta ${app.server?.port}`);
