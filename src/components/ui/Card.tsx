import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type CardProps = {
   children: React.ReactNode;
   style?: StyleProp<ViewStyle>;
};

export default function Card({ children, style }: CardProps) {
   return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
   container: {
      // height: 140,
      // width: 350,
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      elevation: 3,
   },
});
