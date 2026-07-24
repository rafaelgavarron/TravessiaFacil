import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
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
import { useTerminalData } from "@/hooks/useTerminalData";

import Paralyzed from "./paralyzed";
import { useTheme } from "@/context";

export default function Dashboard() {
   const { colors } = useTheme();
   const { data, loading, error, lastUpdated } = useTerminalData();

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

   const terminalData = data;

   if (terminalData.esperaA === 0 && terminalData.esperaB === 0)
      return <Paralyzed lastUpdated={lastUpdated} />;

   function getFlowInfo(espera: number) {
      if (espera <= 30 && espera > 0)
         return {
            label: "Fluxo Leve",
            icon: "check-circle-outline",
            iconColor: colors.successDark,
            textColor: colors.successDark,
            badgeBg: colors.successBg,
            timeColor: colors.primaryDark,
         } as const;
      if (espera <= 60 && espera > 30)
         return {
            icon: "warning-amber",
            label: "Fluxo Intenso",
            iconColor: colors.warning,
            textColor: colors.warning,
            badgeBg: colors.warningBg,
            timeColor: colors.warning,
         };
      return {
         label: "Muito Intenso",
         icon: "error-outline",
         iconColor: colors.danger,
         textColor: colors.danger,
         badgeBg: colors.dangerBg,
         timeColor: colors.danger,
      } as const;
   }

   function getWeatherInfo(clima: string) {
      const weatherMap: Record<
         string,
         {
            icon: string;
            iconLibrary: "MaterialIcons" | "MaterialCommunityIcons";
            label: string;
         }
      > = {
         "claro-dia": {
            icon: "sunny",
            iconLibrary: "MaterialIcons",
            label: "Céu Limpo",
         },
         "claro-noite": {
            icon: "nights-stay",
            iconLibrary: "MaterialIcons",
            label: "Céu Limpo",
         },
         "parcialmente-nublado-dia": {
            icon: "weather-partly-cloudy",
            iconLibrary: "MaterialCommunityIcons",
            label: "Parcialmente Nublado",
         },
         "parcialmente-nublado-noite": {
            icon: "weather-night-partly-cloudy",
            iconLibrary: "MaterialCommunityIcons",
            label: "Parcialmente Nublado",
         },
         parcialmente: {
            icon: "weather-partly-cloudy",
            iconLibrary: "MaterialCommunityIcons",
            label: "Parcialmente Nublado",
         },
         "encoberto-dia": {
            icon: "cloud",
            iconLibrary: "MaterialIcons",
            label: "Céu Encoberto",
         },
         "encoberto-noite": {
            icon: "cloud",
            iconLibrary: "MaterialIcons",
            label: "Céu Encoberto",
         },
         nublado: {
            icon: "cloud",
            iconLibrary: "MaterialIcons",
            label: "Nublado",
         },
         "chuva-dia": {
            icon: "weather-rainy",
            iconLibrary: "MaterialCommunityIcons",
            label: "Chuva",
         },
         "chuva-noite": {
            icon: "weather-rainy",
            iconLibrary: "MaterialCommunityIcons",
            label: "Chuva",
         },
         chuva: {
            icon: "weather-rainy",
            iconLibrary: "MaterialCommunityIcons",
            label: "Chuva",
         },
      };

      return (
         weatherMap[clima] || {
            icon: "cloud",
            iconLibrary: "MaterialIcons" as const,
            label: "Clima Indefinido",
         }
      );
   }


   return (
      <ScrollView
         showsVerticalScrollIndicator={false}
         style={{ backgroundColor: colors.background }}
         contentContainerStyle={{ paddingHorizontal: 20 }}
      >
         <View>
            <View style={[styles.box, { backgroundColor: colors.primary }]}>
               <View style={{ ...styles.boxContent }}>
                  <Text
                     style={[
                        styles.headerBoxText,
                        { color: colors.textOnPrimary },
                     ]}
                  >
                     BEM-VINDO A BORDO!
                  </Text>
                  <Text
                     style={[
                        styles.bodyBoxText,
                        { color: colors.textOnPrimary },
                     ]}
                  >
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
               <Text style={[styles.atualStatus, { color: colors.primary }]}>
                  Status Atual
               </Text>
               <View
                  style={[
                     styles.badgeContainer,
                     {
                        backgroundColor: colors.successBg,
                        borderColor: colors.borderLight,
                     },
                  ]}
               >
                  <View style={styles.dotContainer}>
                     <Animated.View
                        style={[
                           styles.pulseDot,
                           { backgroundColor: colors.success },
                           animatedPulse,
                        ]}
                     />
                     <View
                        style={[
                           styles.solidDot,
                           { backgroundColor: colors.success },
                        ]}
                     />
                  </View>
                  <Text
                     style={[styles.badgeText, { color: colors.successDark }]}
                  >
                     Operação Normal
                  </Text>
               </View>
            </View>
            <View style={{ gap: 16, marginTop: 16 }}>
               <Card>
                  <View style={{ flexDirection: "row" }}>
                     <MiniCard>
                        <MaterialCommunityIcons
                           name="sail-boat"
                           size={24}
                           color={colors.text}
                        />
                     </MiniCard>
                     <View style={{ flex: 1 }}>
                        <Text
                           style={{
                              marginTop: 1,
                              marginLeft: 12,
                              color: colors.textSecondary,
                           }}
                        >
                           SENTIDO
                        </Text>
                        <Text
                           style={[styles.path, { color: colors.primaryDark }]}
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
                     <Text
                        style={{
                           ...styles.pathTime,
                           color: getFlowInfo(terminalData.esperaA)
                              .textColor as any,
                        }}
                     >
                        {terminalData.esperaA}
                     </Text>
                     <Text
                        style={[
                           styles.pathTimeText,
                           { color: colors.textSecondary },
                        ]}
                     >
                        minutos
                     </Text>
                     <View
                        style={{
                           ...styles.badgeContainerStream,
                           backgroundColor: getFlowInfo(terminalData.esperaA)
                              .badgeBg,
                        }}
                     >
                        <MaterialIcons
                           name={getFlowInfo(terminalData.esperaA).icon as any}
                           size={24}
                           color={
                              getFlowInfo(terminalData.esperaA).iconColor as any
                           }
                        />
                        <Text
                           style={{
                              color: getFlowInfo(terminalData.esperaA)
                                 .textColor,
                              ...styles.badgeTextStreamDanger,
                           }}
                        >
                           {getFlowInfo(terminalData.esperaA).label}
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
                              color={colors.text}
                           />
                        </MiniCard>
                        <View style={{ flex: 1 }}>
                           <Text
                              style={{
                                 marginTop: 1,
                                 marginLeft: 12,
                                 color: colors.textSecondary,
                              }}
                           >
                              SENTIDO
                           </Text>
                           <Text
                              style={[
                                 styles.path,
                                 { color: colors.primaryDark },
                              ]}
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
                        <Text
                           style={{
                              ...styles.pathTimeDanger,
                              color: getFlowInfo(terminalData.esperaB)
                                 .textColor as any,
                           }}
                        >
                           {terminalData.esperaB}
                        </Text>
                        <Text
                           style={[
                              styles.pathTimeText,
                              { color: colors.textSecondary },
                           ]}
                        >
                           minutos
                        </Text>
                        <View
                           style={{
                              ...styles.badgeContainerStreamDanger,
                              backgroundColor: getFlowInfo(terminalData.esperaB)
                                 .badgeBg,
                           }}
                        >
                           <MaterialIcons
                              name={
                                 getFlowInfo(terminalData.esperaB).icon as any
                              }
                              size={24}
                              color={
                                 getFlowInfo(terminalData.esperaB)
                                    .iconColor as any
                              }
                           />
                           <Text
                              style={{
                                 ...styles.badgeTextStreamDanger,
                                 color: getFlowInfo(terminalData.esperaB)
                                    .textColor as any,
                              }}
                           >
                              {getFlowInfo(terminalData.esperaB).label}
                           </Text>
                        </View>
                     </View>
                  </Card>
               </View>
               <InfoCard>
                  <View
                     style={[
                        styles.InfoCard,
                        { backgroundColor: colors.surfaceVariant },
                     ]}
                  >
                     <View style={{ ...styles.InfoCardContent }}>
                        <MaterialCommunityIcons
                           name="anchor"
                           size={24}
                           color={colors.text}
                        />
                        <View>
                           <Text
                              style={[
                                 styles.InfoCardTextHeader,
                                 { color: colors.textSecondary },
                              ]}
                           >
                              LOGÍSTICA
                           </Text>
                           <Text
                              style={[
                                 styles.InfoCardText,
                                 { color: colors.primaryDark },
                              ]}
                           >
                              {`${terminalData.embarcacoes} Embarcações operando`}
                           </Text>
                        </View>
                     </View>
                     <View
                        style={{ ...styles.InfoCardContent, paddingTop: 16 }}
                     >
                        {(() => {
                           const weatherInfo = getWeatherInfo(terminalData.clima);
                           const IconComponent =
                              weatherInfo.iconLibrary === "MaterialIcons"
                                 ? MaterialIcons
                                 : MaterialCommunityIcons;

                           return (
                              <>
                                 <IconComponent
                                    name={weatherInfo.icon as any}
                                    size={24}
                                    color={colors.text}
                                 />
                                 <View>
                                    <Text
                                       style={[
                                          styles.InfoCardTextHeader,
                                          { color: colors.textSecondary },
                                       ]}
                                    >
                                       CLIMA
                                    </Text>
                                    <Text
                                       style={[
                                          styles.InfoCardText,
                                          { color: colors.primaryDark },
                                       ]}
                                    >
                                       {weatherInfo.label}
                                    </Text>
                                 </View>
                              </>
                           );
                        })()}
                     </View>
                     {/*<View
                         style={{ ...styles.InfoCardContent, paddingTop: 16 }}
                      >
                          <MaterialIcons name="waves" size={24} color={colors.text} />
                         <View>
                            <Text style={[styles.InfoCardTextHeader, { color: colors.textSecondary }]}>
                               MARÉ
                            </Text>
                            <Text style={[styles.InfoCardText, { color: colors.primaryDark }]}>
                               Maré Calma
                            </Text>
                         </View>
                      </View>*/}
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
      width: "100%",
      marginTop: 24,
      paddingLeft: 24,
      borderRadius: 12,
   },
   boxContent: {
      paddingVertical: 70,
   },
   headerBoxText: {
      fontSize: 12,
      fontFamily: "Manrope_500Bold",
   },
   bodyBoxText: {
      marginTop: -5,
      fontSize: 24,
      fontFamily: "Manrope_700Bold",
   },
   atualStatus: {
      fontSize: 20,
      fontFamily: "Manrope_600SemiBold",
   },
   badgeContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderWidth: 1,
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
   path: {
      marginTop: -6,
      marginLeft: 12,
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
      alignSelf: "auto",
      flexDirection: "row",
      gap: 4,
   },
   badgeContainerStreamDanger: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 9999,
      marginLeft: "auto",
      alignSelf: "baseline",
      flexDirection: "row",
      gap: 4,
   },

   badgeTextStream: {
      fontSize: 14,
      fontFamily: "Manrope_600SemiBold",
   },
   badgeTextStreamDanger: {
      fontSize: 14,
      fontFamily: "Manrope_600SemiBold",
   },
   pathTime: {
      marginLeft: 5,
      fontSize: 30,
      fontFamily: "Manrope_700Bold",
   },
   pathTimeDanger: {
      marginLeft: 5,
      fontSize: 30,
      fontFamily: "Manrope_700Bold",
   },

   pathTimeText: {
      fontSize: 16,
      fontFamily: "Manrope_600SemiBold",
   },
   InfoCard: {
      width: "100%",
      height: "auto",
      borderRadius: 12,
      marginTop: 8,
      paddingLeft: 16,
      paddingTop: 24,
      paddingBottom: 24,
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
   },
   InfoCardText: {
      marginLeft: 16,
      fontFamily: "Manrope_600SemiBold",
      fontSize: 16,
   },
});
