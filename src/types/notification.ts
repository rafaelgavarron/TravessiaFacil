export type NotificationType =
   "intenso" | "manutencao" | "normalizado" | "informativo" | "encerrado";

export interface Notification {
   id: string;
   type: NotificationType;
   category: string;
   title: string;
   description: string;
   timestamp: Date;
   time?: string;
}

export const NOTIFICATION_CONFIG: Record<
   NotificationType,
   {
      color: string;
      icon: string;
      backgroundColor: string;
      borderColor: string;
      iconFamily?: string;
   }
> = {
   intenso: {
      color: "#BA1A1A",
      icon: "warning-amber",
      backgroundColor: "#FEE2E2",
      borderColor: "#BA1A1A",
      iconFamily: "MaterialIcons",
   },
   manutencao: {
      color: "#EA580C",
      icon: "wrench",
      backgroundColor: "#FEF3C7",
      borderColor: "#EA580C",
   },
   normalizado: {
      color: "#2E7D32",
      icon: "check-circle",
      backgroundColor: "#DCFCE7",
      borderColor: "#2E7D32",
   },
   informativo: {
      color: "#2563EB",
      icon: "question-mark",
      backgroundColor: "#DBEAFE",
      borderColor: "#2563EB",
      iconFamily: "MaterialIcons",
   },
   encerrado: {
      color: "#6B7280",
      icon: "clock",
      backgroundColor: "#F3F4F6",
      borderColor: "#9CA3AF",
   },
};
