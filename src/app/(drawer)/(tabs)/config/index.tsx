import Card from "@/components/ui/Card";
import {
   View,
   Text,
   StyleSheet,
   Pressable,
   BackHandler,
   Alert,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Switch } from "react-native-gesture-handler";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/context";

export default function Config() {
   const { isDark, setDarkMode, colors } = useTheme();
   const [notifications, setNotifications] = useState(false);
   // const fecharAplicativo = () => {
   //    Alert.alert(
   //       "Sair do App",
   //       "Tem certeza que deseja fechar o aplicativo?",
   //       [
   //          {
   //             text: "Não",
   //             onPress: () => null,
   //             style: "cancel",
   //          },
   //          {
   //             text: "Sim",
   //             onPress: () => BackHandler.exitApp(),
   //          },
   //       ],
   //    );
   // };
   return (
      <View
         style={[
            styles.container,
            { backgroundColor: colors.background, flex: 1 },
         ]}
      >
         <Text style={[styles.title, { color: colors.textMuted }]}>
            PREFERÊNCIAS
         </Text>
         <Card>
            <View style={styles.cardContent}>
               <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather
                     name="moon"
                     size={24}
                     color={colors.primaryDark}
                     style={{ marginRight: 8 }}
                  />
                  <Text style={{ color: colors.text }}>Modo Escuro</Text>
               </View>
               <Switch
                  value={isDark}
                  onValueChange={setDarkMode}
                  trackColor={{
                     false: colors.switchTrack,
                     true: colors.primary,
                  }}
                  thumbColor={colors.switchThumb}
               />
            </View>
         </Card>
         {/*<View>*/}
         {/*<Text style={styles.title}>NOTIFICAÇÕES</Text>*/}
         {/*<Card>
               <View style={styles.cardContent}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                     <MaterialIcons
                        name="notifications-none"
                        size={24}
                        color="#001E40"
                        style={{ marginRight: 8 }}
                     />
                     <View style={styles.notification}>
                        <Text>Alertas de Travessia</Text>
                        <Text style={{ color: "#737780" }}>
                           Mudanças de status em tempo real
                        </Text>
                     </View>
                  </View>
                  <Switch
                     value={notifications}
                     onValueChange={setNotifications}
                  />
               </View>
            </Card>*/}
         {/*</View>*/}
         <View>
            <Text style={[styles.title, { color: colors.textMuted }]}>
               SOBRE
            </Text>
            <Card>
               <View
                  style={[
                     styles.aboutCardContent,
                     { borderBottomColor: colors.border },
                  ]}
               >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                     <MaterialIcons
                        name="info-outline"
                        size={24}
                        color={colors.text}
                        style={{ marginRight: 8 }}
                     />
                     <Text style={[styles.aboutText, { color: colors.text }]}>
                        Termos e Privacidade
                     </Text>
                  </View>
                  <MaterialIcons
                     name="open-in-new"
                     size={24}
                     color={colors.text}
                  />
               </View>
               <View
                  style={{
                     flexDirection: "row",
                     alignItems: "center",
                     paddingTop: 8,
                     justifyContent: "space-between",
                  }}
               >
                  <View
                     style={{
                        flexDirection: "row",
                        alignItems: "center",
                     }}
                  >
                     <MaterialCommunityIcons
                        name="check-decagram-outline"
                        size={24}
                        color={colors.text}
                        style={{ marginRight: 8 }}
                     />
                     <Text style={[styles.aboutText, { color: colors.text }]}>
                        Versão
                     </Text>
                  </View>
                  <Text
                     style={[styles.versionText, { color: colors.textMuted }]}
                  >
                     {" "}
                     v1.0.0
                  </Text>
               </View>
            </Card>
         </View>
         <View>
            {/*<Pressable style={styles.button} onPress={fecharAplicativo}>
               <Text style={styles.exitText}>Sair</Text>
            </Pressable>*/}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 20,
   },
   title: {
      fontFamily: "Manrope_700Bold",
      fontSize: 12,
      marginBottom: 8,
      marginTop: 20,
   },
   button: {
      marginTop: 24,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
   },
   exitText: {
      fontSize: 16,
      fontFamily: "Manrope_700Bold",
   },
   buttonText: {
      flexDirection: "row",
      alignItems: "center",
   },
   cardContent: {
      justifyContent: "space-between",
      flexDirection: "row",
   },
   notification: {
      fontFamily: "Manrope_400Regular",
      flexDirection: "column",
      fontSize: 12,
   },
   aboutText: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
   },
   versionText: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
   },
   aboutCardContent: {
      justifyContent: "space-between",
      flexDirection: "row",
      borderBottomWidth: 1,
      paddingBottom: 8,
   },
});
