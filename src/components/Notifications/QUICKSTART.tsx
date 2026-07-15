/**
 * QUICK START - Exemplo de uso dos componentes de notificação
 * 
 * Este arquivo mostra como integrar os componentes de notificação
 * em suas páginas/screens existentes.
 */

import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { NotificationList, NotificationCard } from '@/components/Notifications';
import { MOCK_NOTIFICATIONS } from '@/constants/mockNotifications';
import { Notification } from '@/types/notification';

// ============================================
// 1. USO SIMPLES - Mostrar lista de notificações
// ============================================

export function MyPage() {
  return (
    <NotificationList 
      notifications={MOCK_NOTIFICATIONS}
    />
  );
}

// ============================================
// 2. COM REFRESH - Adicionar funcionalidade de atualizar
// ============================================

export function MyPageWithRefresh() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // TODO: Buscar do backend
      // const response = await fetch('/api/notifications');
      // setNotifications(await response.json());
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <NotificationList
      notifications={notifications}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
}

// ============================================
// 3. INTEGRAÇÃO COM BACKEND - Exemplo completo
// ============================================

export function NotificationsPageWithBackend() {
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setError(null);
      const response = await fetch('/api/notifications');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar notificações');
      }

      const data = await response.json();
      setNotificationList(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao buscar notificações:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>Erro: {error}</Text>;
  }

  return (
    <NotificationList
      notifications={notificationList}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
}

// ============================================
// 4. NOTIFICAÇÃO INDIVIDUAL - Mostrar apenas uma
// ============================================

export function NotificationDetail({ notificationId }: { notificationId: string }) {
  const notification = MOCK_NOTIFICATIONS.find(n => n.id === notificationId);

  if (!notification) {
    return <Text>Notificação não encontrada</Text>;
  }

  return <NotificationCard notification={notification} />;
}

// ============================================
// 5. TIPOS DE NOTIFICAÇÃO - Criando notificações programaticamente
// ============================================

export function createNotification(
  type: 'intenso' | 'manutencao' | 'normalizado' | 'informativo' | 'encerrado',
  title: string,
  description: string
): Notification {
  return {
    id: Math.random().toString(),
    type,
    category: {
      intenso: 'Fluxo Intenso',
      manutencao: 'Manutenção',
      normalizado: 'Normalizado',
      informativo: 'Informativo',
      encerrado: 'Encerrado',
    }[type],
    title,
    description,
    timestamp: new Date(),
    time: 'Agora',
  };
}

// ============================================
// 6. LISTENER EM TEMPO REAL - WebSocket
// ============================================

export function NotificationsWithRealtime() {
  const [notificationList, setNotificationList] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  useEffect(() => {
    // Conectar ao WebSocket
    const ws = new WebSocket('wss://seu-backend.com/ws/notifications');

    ws.onopen = () => {
      console.log('Conectado ao servidor de notificações');
    };

    ws.onmessage = (event) => {
      try {
        const newNotification: Notification = JSON.parse(event.data);
        // Adicionar nova notificação no início da lista
        setNotificationList(prev => [newNotification, ...prev]);
      } catch (err) {
        console.error('Erro ao processar notificação:', err);
      }
    };

    ws.onerror = (error) => {
      console.error('Erro WebSocket:', error);
    };

    ws.onclose = () => {
      console.log('Desconectado do servidor de notificações');
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <NotificationList notifications={notificationList} />
  );
}
