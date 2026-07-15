import React, { createContext, useContext, useState, useCallback } from "react";

interface NotificationContextType {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  addNotification: (count?: number) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = useCallback((count: number = 1) => {
    setUnreadCount((prev) => prev + count);
  }, []);

  const clearNotifications = useCallback(() => {
    setUnreadCount(0);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ unreadCount, setUnreadCount, addNotification, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  }
  return context;
}
