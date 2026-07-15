import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Notification } from '@/types/notification';
import { NotificationCard } from './NotificationCard';

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
  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma notificação no momento</Text>
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
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
