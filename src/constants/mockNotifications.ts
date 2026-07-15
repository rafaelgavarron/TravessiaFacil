import { Notification } from '@/types/notification';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'intenso',
    category: 'Fluxo Intenso',
    title: 'Fila moderada em Ilhabela',
    description: 'Tempo de espera estimado em 90 minutos sentido São Sebastião devido ao alto volume de veículos.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    time: 'há 45 min',
  },
  {
    id: '2',
    type: 'manutencao',
    category: 'Manutenção',
    title: 'Bebedouro Indisponível',
    description: 'A balsa FB-25 está operando com capacidade reduzida para manutenção preventiva no motor auxiliar.',
    timestamp: new Date(),
    time: 'Agora',
  },
  {
    id: '3',
    type: 'normalizado',
    category: 'Normalizado',
    title: 'Operação normalizada',
    description: 'A travessia Santos-Guarujá voltou a operar com 6 embarcações após a dispersão da neblina.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    time: 'há 2 hours',
  },
  {
    id: '4',
    type: 'informativo',
    category: 'Informativo',
    title: 'Novas tarifas vigentes',
    description: 'Consulte os novos valores para veículos leves e pesados que entraram em vigor nesta madrugada.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    time: 'há 5 hours',
  },
  {
    id: '5',
    type: 'encerrado',
    category: 'Encerrado',
    title: 'Pausa para Revezamento',
    description: 'Pausa para revezamento com sucesso da tripulação. Operação retomada normalmente.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    time: '18:30',
  },
];
