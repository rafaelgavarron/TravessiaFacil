import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Cameras() {
   return (
      <ScrollView style={styles.scrollView}>
         <View style={styles.containerText}>
            <Text style={styles.text}>Status das travessias</Text>
            <Text style={styles.SemiboldText}>Câmeras ao vivo</Text>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   scrollView: {
      // flex: 1,
      paddingHorizontal: 20,
      backgroundColor: "#FFF",
   },
   containerText: {
      flex: 1,
      flexDirection: "column",
      padding: 16,
   },
   text: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
      color: "#000",
      // marginBottom: 8,
   },
   SemiboldText: {
      fontFamily: "Manrope_600SemiBold",
      fontSize: 14,
      color: "#191C1D",
   },
});
