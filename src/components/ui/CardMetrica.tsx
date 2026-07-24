import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/context";

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
   const { colors } = useTheme();
   return (
      <View
         style={[
            styles.card,
            {
               backgroundColor: colors.surface,
               shadowColor: colors.shadow,
            },
         ]}
      >
         {/* Renderiza o ícone passado por prop se ele existir */}
         {IconeComponente && (
            <View style={styles.containerIcone}>
               <IconeComponente size={24} color={colors.textSecondary} />
            </View>
         )}

         <Text style={[styles.titulo, { color: colors.textSecondary }]}>
            {titulo.toUpperCase()}
         </Text>
         <Text style={[styles.valor, { color: colors.primaryDark }]}>
            {valor}
         </Text>
      </View>
   );
}

const styles = StyleSheet.create({
   card: {
      borderRadius: 16,
      padding: 16,
      minWidth: 140,
      flex: 1, // Permite que eles fiquem alinhados lado a lado proporcionalmente
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
      letterSpacing: 0.5,
      marginBottom: 4,
   },
   valor: {
      fontSize: 24,
      fontWeight: "bold",
   },
});
