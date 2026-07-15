import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNotifications } from "../context/NotificationContext";

interface NotificationBadgeProps {
  size?: "small" | "medium" | "large";
}

export function NotificationBadge({ size = "small" }: NotificationBadgeProps) {
  const { unreadCount } = useNotifications();

  const styles = useMemo(
    () => getStyles(size),
    [size]
  );

  if (unreadCount === 0) {
    return null;
  }

  return (
    <View style={styles.badge}>
      {unreadCount > 99 ? (
        <Text style={styles.badgeText}>99+</Text>
      ) : (
        <Text style={styles.badgeText}>{unreadCount}</Text>
      )}
    </View>
  );
}

function getStyles(size: "small" | "medium" | "large") {
  const sizeConfig = {
    small: {
      width: 20,
      height: 20,
      fontSize: 11,
      padding: 2,
    },
    medium: {
      width: 24,
      height: 24,
      fontSize: 12,
      padding: 3,
    },
    large: {
      width: 32,
      height: 32,
      fontSize: 14,
      padding: 4,
    },
  };

  const config = sizeConfig[size];

  return StyleSheet.create({
    badge: {
      width: config.width,
      height: config.height,
      borderRadius: config.width / 2,
      backgroundColor: "#FF3B30",
      justifyContent: "center",
      alignItems: "center",
      padding: config.padding,
    },
    badgeText: {
      color: "#FFF",
      fontSize: config.fontSize,
      fontWeight: "700",
      fontFamily: "Manrope_700Bold",
    },
  });
}
