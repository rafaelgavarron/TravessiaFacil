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

export default function Config() {
   const [darkMode, setDarkMode] = useState(false);
   const [notifications, setNotifications] = useState(false);
   const fecharAplicativo = () => {
      Alert.alert(
         "Sair do App",
         "Tem certeza que deseja fechar o aplicativo?",
         [
            {
               text: "Não",
               onPress: () => null,
               style: "cancel",
            },
            {
               text: "Sim",
               onPress: () => BackHandler.exitApp(),
            },
         ],
      );
   };
   return (
      <View style={styles.container}>
         <Text style={styles.title}>PREFERÊNCIAS</Text>
         <Card>
            <View style={styles.cardContent}>
               <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather
                     name="moon"
                     size={24}
                     color="#001E40"
                     style={{ marginRight: 8 }}
                  />
                  <Text>Modo Escuro</Text>
               </View>
               <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
         </Card>
         <View>
            <Text style={styles.title}>NOTIFICAÇÕES</Text>
            <Card>
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
            </Card>
         </View>
         <View>
            <Text style={styles.title}>SOBRE</Text>
            <Card>
               <View style={styles.aboutCardContent}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                     <MaterialIcons
                        name="info-outline"
                        size={24}
                        color="black"
                        style={{ marginRight: 8 }}
                     />
                     <Text style={styles.aboutText}>Termos e Privacidade</Text>
                  </View>
                  <MaterialIcons name="open-in-new" size={24} color="black" />
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
                        color="black"
                        style={{ marginRight: 8 }}
                     />
                     <Text style={styles.aboutText}>Versão</Text>
                  </View>
                  <Text style={styles.versionText}> v1.0.0</Text>
               </View>
            </Card>
         </View>
         <View>
            <Pressable style={styles.button} onPress={fecharAplicativo}>
               <Text style={styles.exitText}>Sair</Text>
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      marginHorizontal: 20,
   },
   title: {
      fontFamily: "Manrope_700Bold",
      fontSize: 12,
      marginBottom: 8,
      color: "#737780",
      marginTop: 20,
   },
   button: {
      backgroundColor: "#FFDAD6",
      marginTop: 24,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      // justifyContent: "center",
   },
   exitText: {
      color: "#BA1A1A",
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
      color: "#737780",
   },
   aboutCardContent: {
      justifyContent: "space-between",
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
      paddingBottom: 8,
   },
});
