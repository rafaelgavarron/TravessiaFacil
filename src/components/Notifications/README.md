# 📢 Sistema de Notificações - Guia de Uso

## Estrutura de Componentes

### 1. **Types** (`src/types/notification.ts`)
Define a tipagem e configuração de notificações:

```typescript
// Tipos disponíveis
type NotificationType = 
  | 'intenso'      // Fluxo intenso (vermelho)
  | 'manutencao'   // Manutenção (laranja)
  | 'normalizado'  // Normalizado (verde)
  | 'informativo'  // Informativo (azul)
  | 'encerrado'    // Encerrado (cinza)

// Estrutura de uma notificação
interface Notification {
  id: string;                    // ID único
  type: NotificationType;        // Tipo da notificação
  category: string;              // Ex: "Fluxo Intenso"
  title: string;                 // Título principal
  description: string;           // Descrição detalhada
  timestamp: Date;               // Data/hora da notificação
  time?: string;                 // Ex: "há 45 min", "Agora", "18:30"
}
```

### 2. **NotificationCard**
Componente que renderiza uma notificação individual.

```typescript
import { NotificationCard } from '@/components/Notifications';

// Uso
<NotificationCard 
  notification={{
    id: '1',
    type: 'intenso',
    category: 'Fluxo Intenso',
    title: 'Fila moderada em Ilhabela',
    description: 'Tempo de espera estimado em 90 minutos...',
    timestamp: new Date(),
    time: 'há 45 min'
  }}
/>
```

### 3. **NotificationList**
Componente que renderiza uma lista de notificações com suporte a refresh.

```typescript
import { NotificationList } from '@/components/Notifications';

// Uso
<NotificationList
  notifications={notifications}
  onRefresh={handleRefresh}
  refreshing={refreshing}
/>
```

### 4. **NotificationsScreen**
Exemplo completo de tela com notificações (veja em `NotificationsScreen.tsx`).

## 🔌 Integrando com o Backend

### Estrutura esperada da API

```typescript
// GET /api/notifications
{
  data: [
    {
      id: string;
      type: 'intenso' | 'manutencao' | 'normalizado' | 'informativo' | 'encerrado';
      category: string;
      title: string;
      description: string;
      timestamp: ISO string;
      time?: string;
    },
    // ... mais notificações
  ]
}
```

### Exemplo de integração

```typescript
import { useEffect, useState } from 'react';
import { NotificationList } from '@/components/Notifications';
import { Notification } from '@/types/notification';

export const MyNotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Buscar notificações ao montar
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data.data);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <NotificationList
      notifications={notifications}
      onRefresh={fetchNotifications}
      refreshing={refreshing}
    />
  );
};
```

## 🎨 Personalizações

### Adicionar novo tipo de notificação

1. Adicione o tipo em `src/types/notification.ts`:

```typescript
export type NotificationType = 
  | 'intenso' 
  | 'manutencao' 
  | 'normalizado' 
  | 'informativo' 
  | 'encerrado'
  | 'seu-novo-tipo';  // <-- novo tipo
```

2. Adicione a configuração de cores:

```typescript
export const NOTIFICATION_CONFIG: Record<NotificationType, {...}> = {
  // ... tipos existentes
  'seu-novo-tipo': {
    color: '#FF0000',
    icon: 'icon-name',
    backgroundColor: '#FFE0E0',
    borderColor: '#FF0000',
  },
};
```

### Customizar estilos

Os estilos estão definidos em cada componente usando `StyleSheet`. Você pode:

1. **Modificar core styles** - Edite os `StyleSheet` dentro dos arquivos
2. **Passar estilos customizados** - Estenda o componente para aceitar props de estilo
3. **Criar variantes** - Crie versões diferentes dos componentes (e.g., `NotificationCardCompact`)

## 📱 Suporte para Push Notifications

Para integrar com notificações push:

1. Configure `expo-notifications`:
```bash
npx expo install expo-notifications
```

2. Adicione listeners em seu screen/página:
```typescript
import * as Notifications from 'expo-notifications';

useEffect(() => {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      // Trate a notificação aqui
      const notification = response.notification.request.content.data;
      handleNotificationReceived(notification);
    }
  );

  return () => subscription.remove();
}, []);
```

## 🔄 WebSocket/Real-time

Para notificações em tempo real:

```typescript
useEffect(() => {
  const ws = new WebSocket('wss://seu-backend.com/notifications');
  
  ws.onmessage = (event) => {
    const newNotification = JSON.parse(event.data);
    setNotifications(prev => [newNotification, ...prev]);
  };

  return () => ws.close();
}, []);
```

## 📋 Checklist para Backend

- [ ] Endpoint GET `/api/notifications` retorna lista
- [ ] Endpoint POST `/api/notifications` para criar notificação
- [ ] Implementar tipos corretos (`intenso`, `manutencao`, etc)
- [ ] Adicionar timestamps válidos
- [ ] Implementar paginação se necessário
- [ ] Adicionar filtros por tipo/categoria
- [ ] Implementar WebSocket para atualizações em tempo real
- [ ] Configurar push notifications com FCM/APNs

## 📁 Arquivos Criados

```
src/
├── types/
│   └── notification.ts          # Tipos e configurações
├── components/
│   └── Notifications/
│       ├── NotificationCard.tsx      # Componente de card
│       ├── NotificationList.tsx      # Componente de lista
│       ├── NotificationsScreen.tsx   # Exemplo de screen
│       └── index.ts                  # Exports
└── constants/
    └── mockNotifications.ts      # Dados de exemplo
```

---

Pronto para implementar o backend! 🚀
