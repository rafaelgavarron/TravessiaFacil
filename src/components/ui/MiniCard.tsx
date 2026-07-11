import { View, StyleSheet } from "react-native";
import React from "react";

export default function MiniCard({ children }: { children: React.ReactNode }) {
   return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#F2F4F5",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 44,
      borderRadius: 8,
   },
});
