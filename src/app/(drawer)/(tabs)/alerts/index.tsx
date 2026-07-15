import { View, Text, StyleSheet, Switch } from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Card from "@/components/ui/Card";
import { NotificationList } from "@/components/Notifications";
import { MOCK_NOTIFICATIONS } from "@/constants/mockNotifications";

export default function AlertsScreen() {
   const [alerts, setAlerts] = useState(false);

   return (
      <ScrollView style={styles.scrollView}>
         <View style={styles.container}>
            <Text style={styles.textHeader}>Alertas</Text>
            <Text style={styles.textContent}>
               Mantenha-se informado sobre as operações das balsas.
            </Text>
            <Card style={styles.button}>
               <Text style={styles.buttonText}>
                  Receber alertas em tempo real
               </Text>
               <Switch onValueChange={setAlerts} value={alerts} />
            </Card>

            {/* Seção de Notificações Novo Sistema */}
            <View style={styles.notificationsSection}>
               <Text style={styles.sectionTitle}>
                  Notificações em Tempo Real
               </Text>
               <NotificationList notifications={MOCK_NOTIFICATIONS} />
            </View>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   scrollView: {
      paddingHorizontal: 20,
      backgroundColor: "#F8F9FA",
   },
   container: {
      flexDirection: "column",
      marginTop: 10,
      marginBottom: 20,
   },
   textHeader: {
      fontFamily: "Manrope_700Bold",
      fontSize: 24,
      color: "#001E40",
   },
   textContent: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
      color: "#43474F",
   },
   button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16,
      backgroundColor: "#EBEBEB",
   },
   buttonText: {
      fontFamily: "Manrope_600Bold",
      fontSize: 14,
      color: "#191C1D",
   },
   alertCard: {
      // alignItems: "center",
      // marginRight: 120,
   },
   notificationsSection: {
      marginTop: 24,
      marginBottom: 20,
   },
   sectionTitle: {
      fontFamily: "Manrope_700Bold",
      fontSize: 18,
      color: "#001E40",
      marginBottom: 12,
   },
});
