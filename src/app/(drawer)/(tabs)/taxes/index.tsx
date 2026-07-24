import { StyleSheet, Image, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "@/context";

export default function Taxes() {
   const { width } = useWindowDimensions();
   const { colors } = useTheme();

   return (
      <ScrollView
         style={[styles.scrollView, { backgroundColor: colors.background }]}
      >
         <Image
            source={require("@/assets/taxes_1.png")}
            style={[styles.image, { width: width - 32 }]}
            resizeMode="contain"
         />
         <Image
            source={require("@/assets/taxes_2.png")}
            style={[styles.image, { width: width - 32 }]}
            resizeMode="contain"
         />
         <Image
            source={require("@/assets/taxes_3.png")}
            style={[styles.image, { width: width - 32 }]}
            resizeMode="contain"
         />
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   scrollView: {
      flex: 1,
   },
   image: {
      alignSelf: "center",
   },
});
