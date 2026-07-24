import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNotifications } from "../context/NotificationContext";
import { useTheme } from "@/context";

interface NotificationBadgeProps {
  size?: "small" | "medium" | "large";
}

export function NotificationBadge({ size = "small" }: NotificationBadgeProps) {
  const { unreadCount } = useNotifications();
  const { colors } = useTheme();

  const styles = useMemo(
    () => getStyles(size, colors),
    [size, colors]
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

function getStyles(size: "small" | "medium" | "large", colors: { danger: string; textOnPrimary: string }) {
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
      backgroundColor: colors.danger,
      justifyContent: "center",
      alignItems: "center",
      padding: config.padding,
    },
    badgeText: {
      color: colors.textOnPrimary,
      fontSize: config.fontSize,
      fontWeight: "700",
      fontFamily: "Manrope_700Bold",
    },
  });
}
