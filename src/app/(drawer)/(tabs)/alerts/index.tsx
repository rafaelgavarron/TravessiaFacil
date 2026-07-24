import { View, Text, StyleSheet, Switch } from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Card from "@/components/ui/Card";
import { NotificationList } from "@/components/Notifications";
import { MOCK_NOTIFICATIONS } from "@/constants/mockNotifications";
import { useTheme } from "@/context";

export default function AlertsScreen() {
   const { colors } = useTheme();
   const [alerts, setAlerts] = useState(false);

   return (
      <ScrollView
         style={[styles.scrollView, { backgroundColor: colors.background }]}
      >
         <View style={styles.container}>
            <Text style={[styles.textHeader, { color: colors.primaryDark }]}>
               Alertas
            </Text>
            <Text style={[styles.textContent, { color: colors.textSecondary }]}>
               Mantenha-se informado sobre as operações das balsas.
            </Text>
            <Card
               style={[
                  styles.button,
                  { backgroundColor: colors.surfaceVariant },
               ]}
            >
               <Text style={[styles.buttonText, { color: colors.text }]}>
                  Receber alertas em tempo real
               </Text>
               <Switch
                  onValueChange={setAlerts}
                  value={alerts}
                  trackColor={{
                     false: colors.switchTrack,
                     true: colors.primary,
                  }}
                  thumbColor={colors.switchThumb}
               />
            </Card>

            {/* Seção de Notificações Novo Sistema */}
            <View style={styles.notificationsSection}>
               <Text
                  style={[styles.sectionTitle, { color: colors.primaryDark }]}
               >
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
   },
   container: {
      flexDirection: "column",
      marginTop: 10,
      marginBottom: 20,
   },
   textHeader: {
      fontFamily: "Manrope_700Bold",
      fontSize: 24,
   },
   textContent: {
      fontFamily: "Manrope_400Regular",
      fontSize: 16,
   },
   button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16,
   },
   buttonText: {
      fontFamily: "Manrope_600Bold",
      fontSize: 14,
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
      marginBottom: 12,
   },
});
