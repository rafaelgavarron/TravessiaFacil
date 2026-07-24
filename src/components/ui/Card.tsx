import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@/context";

type CardProps = {
   children: React.ReactNode;
   style?: StyleProp<ViewStyle>;
};

export default function Card({ children, style }: CardProps) {
   const { colors } = useTheme();
   return (
      <View style={[styles.container, { backgroundColor: colors.surface }, style]}>
         {children}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      borderRadius: 12,
      padding: 16,
      elevation: 3,
   },
});
