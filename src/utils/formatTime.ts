export function formatTime(date: Date | null): string {
   if (!date) return "--:--";

   return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
   });
}
