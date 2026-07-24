import { useCallback, useEffect, useRef, useState } from "react";
import { fetchTempos, subscribeToTempos } from "@/services/api";
import type { ScrapedData } from "@/types/camera";

interface UseTerminalDataOptions {
   intervalMs?: number;
   enabled?: boolean;
}

interface UseTerminalDataResult {
   data: ScrapedData | null;
   loading: boolean;
   error: string | null;
   lastUpdated: Date | null;
}

const DEFAULT_INTERVAL_MS = 5_000;
const SSE_RECONNECT_MS = 3_000;

export function useTerminalData(
   options: UseTerminalDataOptions = {},
): UseTerminalDataResult {
   const { intervalMs = DEFAULT_INTERVAL_MS, enabled = true } = options;

   const [data, setData] = useState<ScrapedData | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

   const mountedRef = useRef(true);
   const sseUnsubscribeRef = useRef<(() => void) | null>(null);
   const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

   const stopPolling = useCallback(() => {
      if (pollTimerRef.current) {
         clearInterval(pollTimerRef.current);
         pollTimerRef.current = null;
      }
   }, []);

   const loadData = useCallback(async () => {
      try {
         const result = await fetchTempos();
         if (mountedRef.current) {
            setData(result);
            setError(null);
            setLoading(false);
            setLastUpdated(new Date());
         }
      } catch (err) {
         if (mountedRef.current) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
            setLoading(false);
         }
      }
   }, []);

   const startSSE = useCallback(() => {
      sseUnsubscribeRef.current = subscribeToTempos(
         (newData) => {
            if (mountedRef.current) {
               setData(newData);
               setError(null);
               setLoading(false);
               setLastUpdated(new Date());
            }
         },
         () => {
            // SSE falhou → fallback para polling curto
            console.warn("SSE indisponível, usando polling como fallback");
            if (mountedRef.current && !pollTimerRef.current) {
               loadData();
               pollTimerRef.current = setInterval(loadData, intervalMs);
            }
         },
      );
   }, [loadData, intervalMs]);

   useEffect(() => {
      if (!enabled) {
         setLoading(false);
         return;
      }

      mountedRef.current = true;

      // Buscar dados iniciais
      loadData();

      // Iniciar SSE
      startSSE();

      return () => {
         mountedRef.current = false;
         sseUnsubscribeRef.current?.();
         sseUnsubscribeRef.current = null;
         stopPolling();
      };
   }, [enabled, loadData, startSSE, stopPolling]);

   return { data, loading, error, lastUpdated };
}
