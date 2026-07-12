import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardMetricaProps {
   // Tipagem flexível para aceitar componentes de ícone comuns (Lucide, Vector Icons, etc)
   icone?: React.ComponentType<{ size?: number; color?: string }>;
   titulo: string;
   valor: string | number;
}

export function CardMetrica({
   icone: IconeComponente,
   titulo,
   valor,
}: CardMetricaProps) {
   return (
      <View style={styles.card}>
         {/* Renderiza o ícone passado por prop se ele existir */}
         {IconeComponente && (
            <View style={styles.containerIcone}>
               <IconeComponente size={24} color="#64748b" />
            </View>
         )}

         <Text style={styles.titulo}>{titulo.toUpperCase()}</Text>
         <Text style={styles.valor}>{valor}</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   card: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 16,
      minWidth: 140,
      flex: 1, // Permite que eles fiquem alinhados lado a lado proporcionalmente
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
   },
   containerIcone: {
      marginBottom: 16,
      alignItems: "flex-start",
   },
   titulo: {
      fontSize: 12,
      fontWeight: "600",
      color: "#64748b",
      letterSpacing: 0.5,
      marginBottom: 4,
   },
   valor: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#0f172a",
   },
});
