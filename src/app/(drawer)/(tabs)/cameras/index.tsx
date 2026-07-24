import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
   useAnimatedStyle,
   withRepeat,
   withSequence,
   withTiming,
} from "react-native-reanimated";
import MonitoringCard from "@/components/MonitoringCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@/context";
import { useTerminalData } from "@/hooks/useTerminalData";
import type { Camera, CameraGroup, ScrapedData } from "@/types/camera";

const CAMERA_LABELS: Record<string, string> = {
   camA1: "Câmera 1",
   camA2: "Câmera 2",
   camA3: "Câmera 3",
   camA4: "Câmera 4",
   camA5: "Câmera 5",
   camB1: "Câmera 1",
   camB2: "Câmera 2",
   camB3: "Câmera 3",
   camB4: "Câmera 4",
};

function buildCameraGroups(data: ScrapedData): CameraGroup[] {
   const groups: CameraGroup[] = [];

   const terminalACameras: Camera[] = Object.entries(data.cameras)
      .filter(([key]) => key.startsWith("camA"))
      .sort()
      .map(([key, url]) => ({
         id: key,
         nome: CAMERA_LABELS[key] ?? key,
         imageUrl: url,
      }));

   if (terminalACameras.length > 0) {
      groups.push({
         titulo: `Fila - ${data.terminalA}`,
         cameras: terminalACameras,
      });
   }

   const terminalBCameras: Camera[] = Object.entries(data.cameras)
      .filter(([key]) => key.startsWith("camB"))
      .sort()
      .map(([key, url]) => ({
         id: key,
         nome: CAMERA_LABELS[key] ?? key,
         imageUrl: url,
      }));

   if (terminalBCameras.length > 0) {
      groups.push({
         titulo: `Fila - ${data.terminalB}`,
         cameras: terminalBCameras,
      });
   }

   return groups;
}

export default function Cameras() {
   const { colors } = useTheme();
   const { data, loading, error } = useTerminalData();

   const cameraGroups = data ? buildCameraGroups(data) : [];

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

   if (loading) {
      return (
         <View
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: colors.background,
            }}
         >
            <ActivityIndicator size="large" color={colors.primary} />
         </View>
      );
   }

   if (error || !data) {
      return (
         <View
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: colors.background,
               padding: 24,
            }}
         >
            <MaterialIcons name="cloud-off" size={48} color={colors.danger} />
            <Text
               style={{
                  marginTop: 12,
                  fontSize: 16,
                  fontFamily: "Manrope_600SemiBold",
                  color: colors.text,
                  textAlign: "center",
               }}
            >
               {error ?? "Sem conexão com o servidor"}
            </Text>
         </View>
      );
   }

   return (
      <ScrollView
         style={[styles.scrollView, { backgroundColor: colors.background }]}
      >
         <View style={styles.containerText}>
            <Text style={[styles.text, { color: colors.textSecondary }]}>
               Status das travessias
            </Text>
            <View style={styles.dotContainer}>
               <View
                  style={[styles.solidDot, { backgroundColor: colors.success }]}
               />
               <Animated.View
                  style={[
                     styles.pulseDot,
                     { backgroundColor: colors.success },
                     animatedPulse,
                  ]}
               />
               <Text style={[styles.SemiboldText, { color: colors.text }]}>
                  Câmeras ao vivo
               </Text>
            </View>
         </View>

         {cameraGroups.map((group, index) => (
            <View
               key={group.titulo}
               style={
                  index === 0
                     ? styles.FirstMonitoringCardView
                     : styles.MonitoringCardView
               }
            >
               <MonitoringCard
                  titulo={group.titulo}
                  listaCameras={group.cameras}
               />
            </View>
         ))}

         {/*<View style={styles.cardContainer}>
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
         </View>*/}
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   scrollView: {
      paddingHorizontal: 20,
      paddingTop: 10,
   },
   dotContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
   },
   cardContainer: {
      flexDirection: "row",
      marginBottom: 30,
      gap: 9,
      alignItems: "center",
      justifyContent: "space-between",
   },
   card: {
      height: 128,
      width: 141,
   },
   containerText: {
      flexDirection: "column",
      paddingHorizontal: 16,
   },
   text: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
      marginBottom: 4,
   },
   SemiboldText: {
      fontFamily: "Manrope_600SemiBold",
      fontSize: 14,
      marginLeft: 16,
   },
   solidDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      position: "absolute",
   },
   pulseDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      position: "absolute",
   },
   FirstMonitoringCardView: {
      marginTop: 24,
   },
   MonitoringCardView: {
      marginTop: 16,
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
