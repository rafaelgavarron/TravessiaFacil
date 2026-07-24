import React, { useState } from "react";
import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   RefreshControl,
} from "react-native";
import { NotificationList } from "./NotificationList";
import { MOCK_NOTIFICATIONS } from "@/constants/mockNotifications";
import { Notification } from "@/types/notification";
import { useTheme } from "@/context";

/**
 * Exemplo de tela que usa os componentes de notificação.
 *
 * Para usar com seu backend:
 * 1. Substitua MOCK_NOTIFICATIONS por dados vindos da API
 * 2. Implemente a função onRefresh para buscar novas notificações
 * 3. Adicione listeners WebSocket/polling conforme necessário
 *
 * Estrutura esperada do backend:
 * {
 *   id: string;
 *   type: 'intenso' | 'manutencao' | 'normalizado' | 'informativo' | 'encerrado';
 *   category: string;
 *   title: string;
 *   description: string;
 *   timestamp: ISO string;
 *   time?: string;
 * }
 */

export const NotificationsScreen: React.FC = () => {
   const { colors } = useTheme();
   const [notifications, setNotifications] =
      useState<Notification[]>(MOCK_NOTIFICATIONS);
   const [refreshing, setRefreshing] = useState(false);

   const handleRefresh = async () => {
      setRefreshing(true);
      try {
         // TODO: Implementar chamada ao backend aqui
         // const response = await api.getNotifications();
         // setNotifications(response);

         // Por enquanto, simula um delay
         await new Promise((resolve) => setTimeout(resolve, 1500));
      } finally {
         setRefreshing(false);
      }
   };

   return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
         <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Notificações</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Status da travessia</Text>
         </View>

         <ScrollView
            refreshControl={
               <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
               />
            }
         >
            <NotificationList
               notifications={notifications}
               onRefresh={handleRefresh}
               refreshing={refreshing}
            />
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   header: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      paddingTop: 12,
      borderBottomWidth: 1,
   },
   headerTitle: {
      fontSize: 24,
      fontWeight: "700",
   },
   headerSubtitle: {
      fontSize: 14,
      marginTop: 4,
   },
});
