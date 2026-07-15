import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Notification, NOTIFICATION_CONFIG } from "@/types/notification";

interface NotificationCardProps {
   notification: Notification;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
   notification,
}) => {
   const config = NOTIFICATION_CONFIG[notification.type];

   return (
      <View style={[styles.container, { borderLeftColor: config.color }]}>
         <View style={styles.header}>
            <View
               style={[
                  styles.iconContainer,
                  { backgroundColor: config.backgroundColor },
               ]}
            >
               {config.iconFamily === "MaterialIcons" ? (
                  <MaterialIcons
                     name={config.icon as any}
                     size={24}
                     color={config.color}
                  />
               ) : (
                  <MaterialCommunityIcons
                     name={config.icon as any}
                     size={24}
                     color={config.color}
                  />
               )}
            </View>

            <View style={styles.headerContent}>
               <Text style={[styles.category, { color: config.color }]}>
                  {notification.category.toUpperCase()}
               </Text>
               <Text style={styles.time}>{notification.time}</Text>
            </View>
         </View>

         <View style={styles.content}>
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.description}>{notification.description}</Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      borderLeftWidth: 4,
      padding: 16,
      marginBottom: 12,
   },
   header: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
   },
   iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
   },
   headerContent: {
      flex: 1,
      justifyContent: "center",
   },
   category: {
      fontSize: 12,
      fontWeight: "600",
      marginBottom: 2,
   },
   time: {
      fontSize: 12,
      color: "#9CA3AF",
      fontWeight: "500",
   },
   content: {
      paddingLeft: 56,
   },
   title: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1F2937",
      marginBottom: 4,
   },
   description: {
      fontSize: 14,
      color: "#6B7280",
      lineHeight: 20,
   },
});
