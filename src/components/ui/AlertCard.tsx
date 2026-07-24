import { Text, StyleSheet, StyleProp, ViewStyle, View } from "react-native";
import Card from "@/components/ui/Card";
import React from "react";
import { useTheme } from "@/context";

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
   const { colors } = useTheme();
   return (
      <Card
         style={[
            styles.Card,
            { backgroundColor: colors.dangerBg },
            style,
         ]}
      >
         <View style={styles.infoContainer}>
            <Text
               style={[
                  styles.categoryText,
                  {
                     color: colors.danger,
                     backgroundColor: colors.dangerBg,
                  },
               ]}
            >
               "icon"
               {category}
            </Text>
            <Text style={[styles.titleText, { color: colors.text }]}>
               {title}
            </Text>
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
   },
   categoryText: {
      fontFamily: "Manrope_700Bold",
      marginRight: "auto",
      borderRadius: 9999,
      paddingHorizontal: 8,
      marginLeft: 5,
      alignSelf: "center",
      fontSize: 12,
   },
   titleText: {
      fontFamily: "Manrope_600SemiBold",
      fontSize: 15,
   },
   infoContainer: {
      flexDirection: "column",
   },
});
