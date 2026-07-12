import { View, StyleSheet } from "react-native";

export default function Card({ children }: { children: React.ReactNode }) {
   return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
   container: {
      // height: 140,
      // width: 350,
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      padding: 16,
      elevation: 3,
   },
});
