
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  tag: 'hot' | 'warm' | 'cold';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  avatar?: string;
  online: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  contactId: string;
  text: string;
  time: string;
  sender: 'user' | 'contact';
  status: 'sent' | 'delivered' | 'read';
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: string;
}

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '+55 11 99999-9999',
    email: 'maria.silva@email.com',
    company: 'Empresa ABC',
    tag: 'hot',
    lastMessage: 'Olá, gostaria de saber mais sobre seus serviços.',
    lastMessageTime: '10:45',
    unreadCount: 2,
    online: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'João Santos',
    phone: '+55 11 88888-8888',
    email: 'joao.santos@empresa.com',
    company: 'Tech Solutions',
    tag: 'warm',
    lastMessage: 'Quando podemos marcar uma reunião?',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    online: false,
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'Ana Pereira',
    phone: '+55 11 77777-7777',
    email: 'ana@startup.com',
    company: 'StartupXYZ',
    tag: 'cold',
    lastMessage: 'Obrigado pelo atendimento!',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    online: false,
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    phone: '+55 11 66666-6666',
    email: 'carlos@negocio.com',
    company: 'Negócio Digital',
    tag: 'hot',
    lastMessage: 'Preciso de uma proposta urgente',
    lastMessageTime: '2 horas',
    unreadCount: 1,
    online: true,
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'Luciana Costa',
    phone: '+55 11 55555-5555',
    email: 'luciana@consultoria.com',
    company: 'Consultoria Plus',
    tag: 'warm',
    lastMessage: 'Vou analisar a proposta e retorno',
    lastMessageTime: '1 dia',
    unreadCount: 0,
    online: false,
    createdAt: '2024-01-11'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    contactId: '1',
    text: 'Olá, gostaria de saber mais sobre seus serviços.',
    time: '10:30',
    sender: 'contact',
    status: 'delivered'
  },
  {
    id: '2',
    contactId: '1',
    text: 'Estou interessada no pacote de marketing digital.',
    time: '10:32',
    sender: 'contact',
    status: 'delivered'
  },
  {
    id: '3',
    contactId: '1',
    text: 'Olá Maria! Tudo bem? Agradeço seu interesse em nossos serviços.',
    time: '10:35',
    sender: 'user',
    status: 'read'
  },
  {
    id: '4',
    contactId: '1',
    text: 'Nosso pacote de marketing digital inclui gestão de redes sociais, SEO e campanhas pagas. Gostaria de receber uma proposta?',
    time: '10:36',
    sender: 'user',
    status: 'read'
  },
  {
    id: '5',
    contactId: '1',
    text: 'Sim, por favor. Qual seria o valor?',
    time: '10:44',
    sender: 'contact',
    status: 'delivered'
  },
  {
    id: '6',
    contactId: '2',
    text: 'Bom dia! Vi sua empresa no LinkedIn.',
    time: 'Ontem 14:20',
    sender: 'contact',
    status: 'delivered'
  },
  {
    id: '7',
    contactId: '2',
    text: 'Olá João! Obrigado pelo contato. Em que posso ajudá-lo?',
    time: 'Ontem 14:25',
    sender: 'user',
    status: 'read'
  },
  {
    id: '8',
    contactId: '2',
    text: 'Quando podemos marcar uma reunião?',
    time: 'Ontem 15:30',
    sender: 'contact',
    status: 'delivered'
  }
];

export const mockDashboardMetrics: DashboardMetric[] = [
  {
    id: '1',
    title: 'Total de Contatos',
    value: 54,
    subtitle: '+8% em relação ao mês passado',
    trend: { value: '+8%', isPositive: true },
    icon: 'Users'
  },
  {
    id: '2',
    title: 'Mensagens Novas',
    value: 12,
    subtitle: '+2 nas últimas 24 horas',
    trend: { value: '+2', isPositive: true },
    icon: 'MessageCircle'
  },
  {
    id: '3',
    title: 'Propostas Enviadas',
    value: 8,
    subtitle: '3 visualizadas, 2 aceitas',
    icon: 'FileText'
  },
  {
    id: '4',
    title: 'Taxa de Resposta',
    value: '89%',
    subtitle: '+5% em relação ao mês passado',
    trend: { value: '+5%', isPositive: true },
    icon: 'TrendingUp'
  },
  {
    id: '5',
    title: 'Leads Quentes',
    value: 15,
    subtitle: '+25% em relação ao mês passado',
    trend: { value: '+25%', isPositive: true },
    icon: 'Flame'
  },
  {
    id: '6',
    title: 'Tempo Médio de Resposta',
    value: '2.5h',
    subtitle: '-30min em relação ao mês passado',
    trend: { value: '-30min', isPositive: true },
    icon: 'Clock'
  }
];

// Template messages for the composer
export const messageTemplates = [
  {
    id: 'welcome',
    name: 'Boas-vindas',
    content: 'Olá! Obrigado por entrar em contato conosco. Como podemos ajudá-lo hoje?'
  },
  {
    id: 'follow_up',
    name: 'Acompanhamento',
    content: 'Olá! Estou entrando em contato para dar continuidade à nossa conversa. Tem alguma dúvida sobre nossa proposta?'
  },
  {
    id: 'meeting',
    name: 'Agendamento',
    content: 'Podemos agendar uma reunião para discutirmos melhor seus objetivos? Tenho alguns horários disponíveis esta semana.'
  },
  {
    id: 'proposal',
    name: 'Enviar Proposta',
    content: 'Conforme conversamos, segue em anexo nossa proposta comercial. Fico à disposição para esclarecer qualquer dúvida!'
  },
  {
    id: 'thanks',
    name: 'Agradecimento',
    content: 'Muito obrigado pelo seu tempo e interesse em nossos serviços. Estaremos sempre à disposição!'
  }
];
