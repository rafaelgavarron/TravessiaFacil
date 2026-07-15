// Exemplo de como usar o sistema de notificações

import { useNotifications } from "@/context";
import { Text } from "react-native";

// Em qualquer componente, você pode acessar e manipular notificações:

export function ExampleComponent() {
  const { unreadCount, addNotification, setUnreadCount, clearNotifications } = useNotifications();

  // Adicionar uma notificação
  const handleAddNotification = () => {
    addNotification(1); // Adiciona 1 notificação
  };

  // Adicionar múltiplas notificações
  const handleAddMultiple = () => {
    addNotification(5); // Adiciona 5 notificações
  };

  // Limpar todas as notificações
  const handleClearNotifications = () => {
    clearNotifications();
  };

  // Definir um número específico
  const handleSetCount = () => {
    setUnreadCount(10);
  };

  return (
    <>
      {/* O badge aparecerá automaticamente na sidebar quando unreadCount > 0 */}
      <Text>Total de notificações não lidas: {unreadCount}</Text>
    </>
  );
}

/*
  INTEGRAÇÃO COM BACKEND:
  
  1. Quando a app inicia, busque o número de notificações não lidas do backend:
     useEffect(() => {
       fetch('/api/notifications/unread-count')
         .then(res => res.json())
         .then(data => setUnreadCount(data.count));
     }, [setUnreadCount]);
  
  2. Configure WebSocket/polling para atualizar em tempo real:
     socket.on('notification:new', () => {
       addNotification(1);
     });
  
  3. Quando o usuário acessar a página de alertas, limpe as notificações:
     useEffect(() => {
       clearNotifications();
     }, [clearNotifications]);
*/
