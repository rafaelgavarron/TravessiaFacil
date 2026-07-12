import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
   useAnimatedStyle,
   withRepeat,
   withSequence,
   withTiming,
} from "react-native-reanimated";
import MonitoringCard from "@/components/MonitoringCard";
import Card from "@/components/ui/Card";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Cameras() {
   const animatedPulse = useAnimatedStyle(() => ({
      transform: [
         {
            scale: withRepeat(
               withSequence(
                  withTiming(1, { duration: 0 }),
                  withTiming(2.4, { duration: 1800 }),
               ),
               -1,
               false,
            ),
         },
      ],
      opacity: withRepeat(
         withSequence(
            withTiming(0.6, { duration: 0 }),
            withTiming(0, { duration: 1800 }),
         ),
         -1,
         false,
      ),
   }));
   return (
      <ScrollView style={styles.scrollView}>
         <SafeAreaView>
            <View style={styles.containerText}>
               <Text style={styles.text}>Status das travessias</Text>
               <View style={styles.dotContainer}>
                  <View style={styles.solidDot} />
                  <Animated.View style={[styles.pulseDot, animatedPulse]} />
                  <Text style={styles.SemiboldText}>Câmeras ao vivo</Text>
               </View>
            </View>
            <View style={styles.FirstMonitoringCardView}>
               <MonitoringCard
                  titulo="Fila - São Sebastião"
                  listaCameras={[
                     {
                        nome: "Câmera 1",
                        camera: "Câmera 1",
                        videoUrl: "https://placeholder.com",
                     },
                     {
                        nome: "Câmera 2",
                        camera: "Câmera 2",
                        videoUrl: "https://placeholder.com",
                     },
                     {
                        nome: "Câmera 3",
                        camera: "Câmera 3",
                        videoUrl: "https://placeholder.com",
                     },
                  ]}
               />
            </View>
            <View style={styles.MonitoringCardView}>
               <MonitoringCard
                  titulo="Embarque - São Sebastião"
                  listaCameras={[
                     {
                        nome: "Câmera 1",
                        camera: "Câmera 1",
                        videoUrl: "https://placeholder.com",
                     },
                     {
                        nome: "Câmera 2",
                        camera: "Câmera 2",
                        videoUrl: "https://placeholder.com",
                     },
                  ]}
               />
            </View>
            <View style={styles.MonitoringCardView}>
               <MonitoringCard
                  titulo="Fila - Ilhabela"
                  listaCameras={[
                     {
                        nome: "Câmera 1",
                        camera: "Câmera 1",
                        videoUrl: "https://placeholder.com",
                     },
                     {
                        nome: "Câmera 2",
                        camera: "Câmera 2",
                        videoUrl: "https://placeholder.com",
                     },
                  ]}
               />
            </View>
            <View style={styles.LastMonitoringCardView}>
               <MonitoringCard
                  titulo="Embarque - Ilhabela"
                  listaCameras={[
                     {
                        nome: "Câmera 1",
                        camera: "Câmera 1",
                        videoUrl: "https://placeholder.com",
                     },
                     {
                        nome: "Câmera 2",
                        camera: "Câmera 2",
                        videoUrl: "https://placeholder.com",
                     },
                  ]}
               />
            </View>
            <View style={styles.cardContainer}>
               <Card>
                  <View style={styles.card}>
                     <FontAwesome6
                        name="temperature-half"
                        size={26}
                        color="#799DD6"
                     />
                     <Text style={styles.cardText}>TEMPERATURA</Text>
                     <Text style={styles.Temperature}>25°C</Text>
                  </View>
               </Card>
               <Card>
                  <View style={styles.card}>
                     <FontAwesome5 name="wind" size={26} color="#799DD6" />
                     <Text style={styles.cardText}>VENTO</Text>
                     <Text style={styles.Temperature}>10 km/h</Text>
                  </View>
               </Card>
            </View>
         </SafeAreaView>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   scrollView: {
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: "#FFF",
   },
   dotContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
   },
   FilaBalsa: {
      flexDirection: "row",
   },
   cardContainer: {
      flexDirection: "row",
      gap: 9,
      // height: 50,
      // width: 350,
      // marginBottom: 500,
      alignItems: "center",
      justifyContent: "space-between",
   },
   card: {
      height: 128,
      width: 141,
      // marginBottom: 50,
   },
   containerText: {
      flexDirection: "column",
      paddingHorizontal: 16,
   },
   text: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
      color: "#43474F",
      marginBottom: 4,
   },
   SemiboldText: {
      fontFamily: "Manrope_600SemiBold",
      fontSize: 14,
      marginLeft: 16,
      color: "#191C1D",
   },
   solidDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#10B981",
      position: "absolute",
   },
   pulseDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#10B981",
      position: "absolute",
   },
   FirstMonitoringCardView: {
      marginTop: 24,
   },
   MonitoringCardView: {
      marginTop: 16,
   },
   LastMonitoringCardView: {
      marginTop: 16,
      marginBottom: 24,
   },
   cardText: {
      fontFamily: "Manrope_600SemiBold",
      paddingTop: 50,
      fontSize: 12,
      color: "#43474F",
   },
   Temperature: {
      fontFamily: "Manrope_600SemiBold",
      fontSize: 20,
      color: "#43474F",
   },
});
