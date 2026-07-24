import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "@/context";

type CardProps = {
   children: React.ReactNode;
   style?: StyleProp<ViewStyle>;
};

export default function MiniCard({ children, style }: CardProps) {
   const { colors } = useTheme();
   return (
      <View
         style={[
            styles.container,
            { backgroundColor: colors.surfaceVariant },
            style,
         ]}
      >
         {children}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 44,
      borderRadius: 8,
   },
});
