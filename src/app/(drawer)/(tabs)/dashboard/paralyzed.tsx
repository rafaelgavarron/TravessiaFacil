import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import Animated, {
   useAnimatedStyle,
   withRepeat,
   withSequence,
   withTiming,
} from "react-native-reanimated";
import Card from "@/components/ui/Card";
import { ScrollView } from "react-native-gesture-handler";
import MiniCard from "@/components/ui/MiniCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context";
import { useTerminalData } from "@/hooks/useTerminalData";
import { formatTime } from "@/utils/formatTime";

interface ParalyzedProps {
   lastUpdated?: Date | null;
}

export default function Paralyzed({ lastUpdated }: ParalyzedProps = {}) {
   const { colors } = useTheme();
   const shouldFetchOwnData = lastUpdated === undefined;
   const { lastUpdated: fetchedLastUpdated } = useTerminalData({
      enabled: shouldFetchOwnData,
   });
   const effectiveLastUpdated = shouldFetchOwnData
      ? fetchedLastUpdated
      : lastUpdated;

   useEffect(() => {
      SplashScreen.hideAsync();
   }, []);
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
      <ScrollView
         style={{
            flex: 1,
            paddingHorizontal: 35,
            alignContent: "center",
            backgroundColor: colors.background,
         }}
      >
         <View>
            <View
               style={[
                  styles.box,
                  {
                     backgroundColor: colors.dangerBg,
                     borderColor: colors.dangerLight,
                  },
               ]}
            >
               <View style={styles.boxContent}>
                  <View
                     style={[
                        styles.iconContainer,
                        { backgroundColor: colors.danger },
                     ]}
                  >
                     <MaterialIcons
                        style={styles.icon}
                        name="warning-amber"
                        size={24}
                        color={colors.textOnPrimary}
                     />
                  </View>
                  <View style={{ flexDirection: "column" }}>
                     <Text
                        style={[styles.headerBoxText, { color: colors.danger }]}
                     >
                        Operação Paralisada
                     </Text>
                     <Text
                        style={[styles.bodyBoxText, { color: colors.danger }]}
                     >
                        Serviço de travessia interrompido temporariamente devido
                        a fortes rajadas de vento e condições adversas no canal.
                     </Text>
                     <View
                        style={[
                           styles.badgeContainer,
                           { backgroundColor: colors.dangerBg },
                        ]}
                     >
                        <View style={styles.dotContainer}>
                           <Animated.View
                              style={[
                                 styles.pulseDot,
                                 { backgroundColor: colors.danger },
                                 animatedPulse,
                              ]}
                           />
                           <View
                              style={[
                                 styles.solidDot,
                                 { backgroundColor: colors.danger },
                              ]}
                           />
                        </View>
                        <Text
                           style={[styles.badgeText, { color: colors.danger }]}
                        >
                           Última Atualização:{" "}
                           {formatTime(effectiveLastUpdated)}
                        </Text>
                     </View>
                  </View>
               </View>
            </View>
            <View style={{ ...styles.waitTimeContainer }}>
               <Text
                  style={{
                     fontSize: 12,
                     fontFamily: "Manrope_600Bold",
                     color: colors.textSecondary,
                     paddingLeft: 1,
                  }}
               >
                  TEMPO DE ESPERA:
               </Text>
               <Card
                  style={[
                     styles.waitTimeCard,
                     {
                        backgroundColor: colors.surface,
                        shadowColor: colors.shadow,
                     },
                  ]}
               >
                  <MiniCard>
                     <MaterialCommunityIcons
                        name="sail-boat"
                        size={30}
                        color={colors.text}
                     />
                  </MiniCard>
                  <View style={{ flex: 1 }}>
                     <Text
                        style={[
                           styles.waitTimeText,
                           { color: colors.primaryDark },
                        ]}
                     >
                        São Sebastião ➔ Ilhabela
                     </Text>
                     <Card
                        style={[
                           styles.suspendedCard,
                           { backgroundColor: colors.dangerBg },
                        ]}
                     >
                        <Text
                           style={[
                              styles.suspendedCardText,
                              { color: colors.danger },
                           ]}
                        >
                           SERVIÇO SUSPENSO
                        </Text>
                     </Card>
                  </View>
                  <View
                     style={{ alignItems: "center", marginBottom: 12, gap: 11 }}
                  >
                     <Text
                        style={{
                           fontSize: 24,
                           fontFamily: "Manrope_700Bold",
                           color: colors.textMuted,
                        }}
                     >
                        ---
                     </Text>
                     <Text
                        style={{
                           fontSize: 10,
                           fontFamily: "Manrope_400Regular",
                           color: colors.textMuted,
                        }}
                     >
                        PARALISADO
                     </Text>
                  </View>
               </Card>
               <Card
                  style={[
                     styles.waitTimeCard,
                     {
                        backgroundColor: colors.surface,
                        shadowColor: colors.shadow,
                     },
                  ]}
               >
                  <MiniCard>
                     <MaterialIcons
                        name="directions-boat"
                        size={24}
                        color={colors.text}
                     />
                  </MiniCard>
                  <View style={{ flex: 1 }}>
                     <Text
                        style={[
                           styles.waitTimeText,
                           { color: colors.primaryDark },
                        ]}
                     >
                        Ilhabela ➔ São Sebastião
                     </Text>
                     <Card
                        style={[
                           styles.suspendedCard,
                           { backgroundColor: colors.dangerBg },
                        ]}
                     >
                        <Text
                           style={[
                              styles.suspendedCardText,
                              { color: colors.danger },
                           ]}
                        >
                           SERVIÇO SUSPENSO
                        </Text>
                     </Card>
                  </View>
                  <View
                     style={{ alignItems: "center", marginBottom: 12, gap: 11 }}
                  >
                     <Text
                        style={{
                           fontSize: 24,
                           fontFamily: "Manrope_700Bold",
                           color: colors.textMuted,
                        }}
                     >
                        ---
                     </Text>
                     <Text
                        style={{
                           fontSize: 10,
                           fontFamily: "Manrope_400Regular",
                           color: colors.textMuted,
                        }}
                     >
                        PARALISADO
                     </Text>
                  </View>
               </Card>
            </View>
            {/*TODO: FAZER O CLIMATE BOX FALANDO DO PORQUE PAROU A BALSA*/}
            {/*<Card style={{ ...styles.climateBox }}>
               <Text style={{ ...styles.climateBoxText }}>
                  CONDIÇÕES CLIMÁTICAS
               </Text>
               <Text style={{ ...styles.climateBoldText }}>Ventos Fortes:</Text>
               <Text style={{ ...styles.Text }}>Rajadas de até 65km/h</Text>
            </Card>*/}
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   box: {
      height: 192,
      width: "100%",
      marginTop: 24,
      paddingLeft: 24,
      borderRadius: 12,
      borderWidth: 1,
   },
   boxContent: {
      flexDirection: "row",
      paddingVertical: 16,
      marginRight: 16,
   },
   headerBoxText: {
      fontSize: 20,
      marginHorizontal: 16,
      fontFamily: "Manrope_700Bold",
   },
   bodyBoxText: {
      marginTop: 4,
      fontSize: 16,
      marginHorizontal: 16,
      fontFamily: "Manrope_400Regular",
   },
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
   },
   card: {
      borderRadius: 16,
      padding: 32,
      alignItems: "center",
      gap: 12,
      width: 350,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
   },
   title: {
      fontSize: 22,
      fontFamily: "Manrope_700Bold",
   },
   message: {
      fontSize: 16,
      fontFamily: "Manrope_500Medium",
      textAlign: "center",
   },
   icon: {},
   iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: 38,
      height: 35,
      borderRadius: 8,
      marginTop: 5,
   },
   badgeContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginTop: 6,
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
      position: "absolute",
   },
   pulseDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      position: "absolute",
   },
   badgeText: {
      fontSize: 14,
      fontWeight: "500",
   },
   waitTimeContainer: {
      marginTop: 24,
      gap: 16,
   },
   waitTimeCard: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 16,
      width: "100%",
      height: 100,
      padding: 16,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
   },
   waitTimeText: {
      fontSize: 17,
      marginLeft: 9,
      fontFamily: "Manrope_600Bold",
   },
   suspendedCard: {
      alignSelf: "flex-start",
      marginTop: 4,
      marginLeft: 9,
      paddingVertical: 6,
      paddingHorizontal: 8,
      width: "auto",
      borderRadius: 4,
   },
   suspendedCardText: {
      alignItems: "center",
      alignSelf: "center",
      fontSize: 12,
      fontFamily: "Manrope_400Regular",
   },
});
