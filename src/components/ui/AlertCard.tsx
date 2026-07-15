import { Text, StyleSheet, StyleProp, ViewStyle, View } from "react-native";
import Card from "@/components/ui/Card";
import React from "react";
export default function AlertCard({
   category,
   title,
   style,
   children,
}: {
   category?: string;
   title?: string;
   style?: StyleProp<ViewStyle>;
   children?: React.ReactNode;
}) {
   return (
      <Card style={[styles.Card, style]}>
         <View style={styles.infoContainer}>
            <Text style={styles.categoryText}>
               "icon"
               {category}
            </Text>
            <Text style={styles.titleText}>{title}</Text>
            <View>{children}</View>
         </View>
      </Card>
   );
}
const styles = StyleSheet.create({
   Card: {
      width: "100%",
      height: 128,
      marginTop: 20,
      backgroundColor: "#f1d",
   },
   categoryText: {
      fontFamily: "Manrope_700Bold",
      marginRight: "auto",
      borderRadius: 9999,
      paddingHorizontal: 8,
      marginLeft: 5,
      alignSelf: "center",
      fontSize: 12,
      color: "#BA1A1A",
      backgroundColor: "#FFDAD6",
   },
   titleText: {
      fontFamily: "Manrope_600SemiBold",
      fontSize: 15,
      color: "#191C1D",
   },
   infoContainer: {
      flexDirection: "column",
      // alignItems: "center",
   },
});
