import { View, Text, StyleSheet, StyleProp, ViewStyle, ViewProps } from "react-native";
import Animated, {
   useAnimatedStyle,
   withRepeat,
   withTiming,
   withSequence,
} from "react-native-reanimated";
import Card from "@/components/ui/Card";
import MiniCard from "@/components/ui/MiniCard";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import InfoCard from "@/components/ui/InfoCard";
import { ScrollView } from "react-native-gesture-handler";

export default function Dashboard() {
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
   interface CardProps extends ViewProps {
      children: React.ReactNode;
      /** Define a cor da barra lateral esquerda de destaque. Se não fornecido, o card será normal. */
      accentColor?: string;
      style?: StyleProp<ViewStyle>;
   }

   return (
      <ScrollView
         showsVerticalScrollIndicator={false}
         style={{ backgroundColor: "#F8F9FA" }}
      >
         <View
            style={{
               flex: 1,
               alignSelf: "center",
            }}
         >
            <View style={styles.box}>
               <View style={{ ...styles.boxContent }}>
                  <Text style={{ ...styles.headerBoxText }}>
                     BEM-VINDO A BORDO!
                  </Text>
                  <Text style={{ ...styles.bodyBoxText }}>
                     Planeje sua travessia.
                  </Text>
               </View>
            </View>
            <View
               style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                  alignSelf: "flex-start",
                  gap: 65,
               }}
            >
               <Text style={{ ...styles.atualStatus }}>Status Atual</Text>
               <View style={styles.badgeContainer}>
                  <View style={styles.dotContainer}>
                     <Animated.View style={[styles.pulseDot, animatedPulse]} />
                     <View style={styles.solidDot} />
                  </View>
                  <Text style={styles.badgeText}>Operação Normal</Text>
               </View>
            </View>
            <View style={{ gap: 16, marginTop: 16 }}>
               <Card>
                  <View style={{ flexDirection: "row" }}>
                     <MiniCard>
                        <MaterialCommunityIcons
                           name="sail-boat"
                           size={24}
                           color="black"
                        />
                     </MiniCard>
                     <View style={{ flex: 1 }}>
                        <Text
                           style={{
                              marginTop: 1,
                              marginLeft: 12,
                              color: "#43474F",
                           }}
                        >
                           SENTIDO
                        </Text>
                        <Text
                           style={{
                              ...styles.path,
                           }}
                        >
                           São Sebastião → Ilhabela
                        </Text>
                     </View>
                  </View>
                  <View
                     style={{
                        ...styles.pathTimeContainer,
                     }}
                  >
                     <Text style={{ ...styles.pathTime }}>30</Text>
                     <Text style={{ ...styles.pathTimeText }}>minutos</Text>
                     <View style={styles.badgeContainerStream}>
                        <MaterialCommunityIcons
                           name="check-circle-outline"
                           size={24}
                           color="#065F46"
                        />
                        <Text style={{ ...styles.badgeTextStream }}>
                           Fluxo Leve
                        </Text>
                     </View>
                  </View>
               </Card>
               <View style={{ gap: 16 }}>
                  <Card>
                     <View style={{ flexDirection: "row" }}>
                        <MiniCard>
                           <MaterialIcons
                              name="directions-boat"
                              size={24}
                              color="black"
                           />
                        </MiniCard>
                        <View style={{ flex: 1 }}>
                           <Text
                              style={{
                                 marginTop: 1,
                                 marginLeft: 12,
                                 color: "#43474F",
                              }}
                           >
                              SENTIDO
                           </Text>
                           <Text
                              style={{
                                 ...styles.path,
                              }}
                           >
                              Ilhabela → São Sebastião
                           </Text>
                        </View>
                     </View>
                     <View
                        style={{
                           ...styles.pathTimeContainer,
                        }}
                     >
                        <Text style={{ ...styles.pathTimeDanger }}>120</Text>
                        <Text style={{ ...styles.pathTimeText }}>minutos</Text>
                        <View style={styles.badgeContainerStreamDanger}>
                           <MaterialIcons
                              name="warning-amber"
                              size={24}
                              color="#93000A"
                           />
                           <Text style={{ ...styles.badgeTextStreamDanger }}>
                              Fluxo Intenso
                           </Text>
                        </View>
                     </View>
                  </Card>
               </View>
               <InfoCard>
                  <View style={{ ...styles.InfoCard }}>
                     <View style={{ ...styles.InfoCardContent }}>
                        <MaterialCommunityIcons
                           name="anchor"
                           size={24}
                           color="black"
                        />
                        <View>
                           <Text style={{ ...styles.InfoCardTextHeader }}>
                              LOGÍSTICA
                           </Text>
                           <Text style={{ ...styles.InfoCardText }}>
                              6 Embarcações operando
                           </Text>
                        </View>
                     </View>
                     <View
                        style={{ ...styles.InfoCardContent, paddingTop: 16 }}
                     >
                        <MaterialIcons name="sunny" size={24} color="black" />
                        <View>
                           <Text style={{ ...styles.InfoCardTextHeader }}>
                              CLIMA
                           </Text>
                           <Text style={{ ...styles.InfoCardText }}>
                              Céu Limpo
                           </Text>
                        </View>
                     </View>
                     <View
                        style={{ ...styles.InfoCardContent, paddingTop: 16 }}
                     >
                        <MaterialIcons name="waves" size={24} color="black" />
                        <View>
                           <Text style={{ ...styles.InfoCardTextHeader }}>
                              MARÉ
                           </Text>
                           <Text style={{ ...styles.InfoCardText }}>
                              Maré Calma
                           </Text>
                        </View>
                     </View>
                  </View>
               </InfoCard>
            </View>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   box: {
      height: 192,
      width: 350,
      marginTop: 24,
      alignSelf: "center",
      paddingLeft: 24,
      backgroundColor: "#003366",
      borderRadius: 12,
   },
   boxContent: {
      paddingVertical: 70,
   },
   headerBoxText: {
      fontSize: 12,
      fontFamily: "Manrope_500Bold",
      color: "#FFF",
   },
   bodyBoxText: {
      marginTop: -5,
      fontSize: 24,
      fontFamily: "Manrope_700Bold",
      color: "#FFF",
   },
   atualStatus: {
      fontSize: 20,
      fontFamily: "Manrope_600SemiBold",
      color: "#003366",
   },
   badgeContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#EDFBF7",
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: "#D2F4EB",
      alignSelf: "flex-start",
   },
   dotContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginRight: 8,
      width: 14,
      height: 14,
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
   badgeText: {
      color: "#064E3B",
      fontSize: 14,
      fontWeight: "500",
   },
   path: {
      marginTop: -6,
      marginLeft: 12,
      color: "#001E40",
      fontSize: 20,
      fontFamily: "Manrope_600SemiBold",
   },
   pathTimeContainer: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "baseline",
      gap: 7,
   },
   badgeContainerStream: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 9999,
      marginLeft: "auto",
      alignSelf: "baseline",
      backgroundColor: "#D1FAE5",
      flexDirection: "row",
      gap: 4,
   },
   badgeContainerStreamDanger: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 9999,
      marginLeft: "auto",
      alignSelf: "baseline",
      backgroundColor: "#FFDAD6",
      flexDirection: "row",
      gap: 4,
   },

   badgeTextStream: {
      color: "#065F46",
      fontSize: 14,
      fontFamily: "Manrope_600SemiBold",
   },
   badgeTextStreamDanger: {
      color: "#93000A",
      fontSize: 14,
      fontFamily: "Manrope_600SemiBold",
   },
   pathTime: {
      marginLeft: 5,
      color: "#001E40",
      fontSize: 30,
      fontFamily: "Manrope_700Bold",
   },
   pathTimeDanger: {
      marginLeft: 5,
      color: "#BA1A1A",
      fontSize: 30,
      fontFamily: "Manrope_700Bold",
   },

   pathTimeText: {
      color: "#43474F",
      fontSize: 16,
      fontFamily: "Manrope_600SemiBold",
   },
   InfoCard: {
      width: 350,
      height: 192,
      backgroundColor: "#EBEBEB",
      // elevation: 4,
      borderRadius: 12,
      marginTop: 8,
      paddingLeft: 16,
      paddingTop: 24,
      marginBottom: 20,
   },
   InfoCardContent: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 16,
   },
   InfoCardTextHeader: {
      marginLeft: 16,
      fontFamily: "Manrope_600Bold",
      fontSize: 12,
      color: "#43474F",
   },
   InfoCardText: {
      marginLeft: 16,
      // marginTop: 6,
      color: "#001E40",
      fontFamily: "Manrope_600SemiBold",
      fontSize: 16,
   },
});
