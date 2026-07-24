import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Notification } from '@/types/notification';
import { NotificationCard } from './NotificationCard';
import { useTheme } from "@/context";

interface NotificationListProps {
  notifications: Notification[];
  onRefresh?: () => void;
  refreshing?: boolean;
  paddingHorizontal?: number;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  paddingHorizontal = 0,
}) => {
  const { colors } = useTheme();

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.textMuted }]}>Nenhuma notificação no momento</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingHorizontal }]}>
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
