import fs from "fs"; //[cite: 1]
import * as cheerio from "cheerio"; //[cite: 1]
import path from "path";

const TRAVESSIA_URL =
   "https://semil.sp.gov.br/travessias/travessias-automoveis/sao-sebastiao-ilhabela/"; //[cite: 1]
const BASE_CAMERA_URL = "https://dhapp3.azurewebsites.net/cameras/"; //[cite: 1]
const TRAVESSIA_ID = 1950; //[cite: 1]

const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:3000";
const FETCH_TIMEOUT_MS = 15000;

async function fetchWithTimeout(url: string): Promise<Response> {
   const controller = new AbortController();
   const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
   try {
      return await fetch(url, { signal: controller.signal });
   } finally {
      clearTimeout(timeout);
   }
}

async function resolveCameraUrl(iframeSrc: string): Promise<string> {
   //[cite: 1]
   const cameraPageUrl = iframeSrc.startsWith("http") //[cite: 1]
      ? iframeSrc //[cite: 1]
      : `${BASE_CAMERA_URL}${iframeSrc}`; //[cite: 1]
   const response = await fetchWithTimeout(cameraPageUrl); //[cite: 1]
   const html = await response.text(); //[cite: 1]
   const $ = cheerio.load(html); //[cite: 1]
   const imgSrc = $("img#fotocam").attr("src"); //[cite: 1]
   if (!imgSrc) throw new Error(`Imagem não encontrada em ${cameraPageUrl}`); //[cite: 1]
   return new URL(imgSrc, BASE_CAMERA_URL).href; //[cite: 1]
}

// Evita que duas raspagens rodem em paralelo caso uma execução demore
// mais do que o intervalo do setInterval (ex: site lento ou fora do ar)
let rasparEmAndamento = false;

// O novo "Motor" do Worker
async function rasparDados() {
   if (rasparEmAndamento) {
      console.warn(
         `[${new Date().toLocaleTimeString()}] Raspagem anterior ainda em andamento, pulando esta execução.`,
      );
      return;
   }
   rasparEmAndamento = true;

   try {
      console.log(
         `\n[${new Date().toLocaleTimeString()}] Buscando dados na Semil...`,
      );

      const response = await fetchWithTimeout(TRAVESSIA_URL); //[cite: 1]
      const html = await response.text(); //[cite: 1]
      const $ = cheerio.load(html); //[cite: 1]

      const terminals = ["a", "b"] as const; //[cite: 1]
      const maxCameras = 5; //[cite: 1]

      const cameraEntries: [string, string][] = []; //[cite: 1]

      for (const t of terminals) {
         //[cite: 1]
         for (let i = 1; i <= maxCameras; i++) {
            //[cite: 1]
            const iframeSrc = $(`iframe#cam_${t}${i}`).attr("src"); //[cite: 1]
            if (!iframeSrc) continue; //[cite: 1]
            const key = `cam${t.toUpperCase()}${i}`; //[cite: 1]
            cameraEntries.push([key, iframeSrc]); //[cite: 1]
         }
      }

      const cameraUrls: Record<string, string> = {}; //[cite: 1]

      await Promise.all(
         //[cite: 1]
         cameraEntries.map(async ([key, iframeSrc]) => {
            //[cite: 1]
            try {
               const url = await resolveCameraUrl(iframeSrc); //[cite: 1]
               cameraUrls[key] = url; //[cite: 1]
            } catch (err) {
               console.error(`  ✗ ${key}: falhou (${err})`); //[cite: 1]
            }
         }),
      );

      // parseInt com radix explícito + fallback: evita gravar `null` no
      // JSON silenciosamente caso a Semil mude os seletores do HTML
      const parseMinutos = (selector: string): number => {
         const raw = $(selector).text().trim();
         const value = parseInt(raw, 10);
         if (Number.isNaN(value)) {
            console.warn(
               `  ⚠ Não foi possível extrair número de "${selector}" (valor bruto: "${raw}")`,
            );
            return 0;
         }
         return value;
      };

      const data = {
         //[cite: 1]
         id: TRAVESSIA_ID, //[cite: 1]
         terminalA: $(`#menu-travessia-a-${TRAVESSIA_ID}`).text().trim(), //[cite: 1]
         terminalB: $(`#menu-travessia-b-${TRAVESSIA_ID}`).text().trim(), //[cite: 1]
         esperaA: parseMinutos(`#menu-travMinutosA-${TRAVESSIA_ID}`), //[cite: 1]
         esperaB: parseMinutos(`#menu-travMinutosB-${TRAVESSIA_ID}`), //[cite: 1]
         embarcacoes: parseMinutos(`#menu-embarcacao-${TRAVESSIA_ID} .num`), //[cite: 1]
         clima:
            $(`#menu-tempoClima-${TRAVESSIA_ID}`)
               .attr("class")
               ?.replace("minitrav-", "") ?? "", //[cite: 1]
         cameras: cameraUrls, //[cite: 1]
      };

      // Segurança: Cria a pasta 'data' caso ela ainda não exista
      const dir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir, { recursive: true });
      }

      // Escrita atômica: grava em um arquivo temporário e renomeia por cima
      // do time.json. Isso evita que o server.ts leia um arquivo truncado
      // caso a leitura aconteça exatamente durante esta gravação.
      const finalPath = path.join(dir, "time.json");
      const tmpPath = `${finalPath}.tmp`;
      fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
      fs.renameSync(tmpPath, finalPath);
      console.log(
         `✅ Dados gravados com sucesso (${Object.keys(cameraUrls).length} câmeras)`,
      ); //[cite: 1]

      // Notificar o servidor para enviar dados via SSE aos clientes conectados
      fetch(`${SERVER_URL}/api/notify`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
      }).catch((err) =>
         console.warn(`⚠ Aviso: não foi possível notificar o servidor (${err})`),
      );
   } catch (error) {
      // Se a internet cair ou o site der erro 500, o Worker avisa no console mas não derruba o servidor
      console.error("❌ Erro crítico durante a raspagem:", error);
   } finally {
      rasparEmAndamento = false;
   }
}

// 1. Roda a função uma vez imediatamente ao iniciar o script
rasparDados();

// 2. Configura o loop infinito para rodar a cada 60.000 milissegundos (1 minuto)
setInterval(rasparDados, 60000);
