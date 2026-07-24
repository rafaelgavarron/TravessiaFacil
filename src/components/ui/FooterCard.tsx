import React from "react";
import {
   View,
   StyleSheet,
   ViewProps,
   StyleProp,
   ViewStyle,
} from "react-native";
import { useTheme } from "@/context";

// 1. Tipagem forte e extensível
interface CardProps extends ViewProps {
   children: React.ReactNode;
   /** Define a cor da barra lateral esquerda de destaque. Se não fornecido, o card será normal. */
   accentColor?: string;
   style?: StyleProp<ViewStyle>;
}

export default function FooterCard({
   children,
   accentColor,
   style,
   ...rest
}: CardProps) {
   const { colors } = useTheme();
   return (
      <View
         style={[
            styles.container,
            { backgroundColor: colors.surface, shadowColor: colors.shadow },
            // 2. Aplicação condicional do estilo
            accentColor
               ? { borderLeftWidth: 6, borderLeftColor: accentColor }
               : null,
            style,
         ]}
         {...rest}
      >
         {children}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      borderRadius: 8,
      padding: 16,
      elevation: 3,
      // Sombra para iOS (boa prática manter consistência cross-platform)
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      // Garante que o conteúdo interno não vaze por cima da borda arredondada
      overflow: "hidden",
   },
});
