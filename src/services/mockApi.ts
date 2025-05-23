
import { 
  mockContacts, 
  mockMessages, 
  mockDashboardMetrics, 
  messageTemplates,
  Contact,
  Message,
  DashboardMetric
} from '@/data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Contacts API
export const contactsApi = {
  async getAll(): Promise<Contact[]> {
    await delay(500);
    return mockContacts;
  },

  async getById(id: string): Promise<Contact | null> {
    await delay(300);
    return mockContacts.find(contact => contact.id === id) || null;
  },

  async create(contact: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> {
    await delay(800);
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    mockContacts.push(newContact);
    return newContact;
  },

  async update(id: string, updates: Partial<Contact>): Promise<Contact | null> {
    await delay(600);
    const index = mockContacts.findIndex(contact => contact.id === id);
    if (index === -1) return null;
    
    mockContacts[index] = { ...mockContacts[index], ...updates };
    return mockContacts[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(400);
    const index = mockContacts.findIndex(contact => contact.id === id);
    if (index === -1) return false;
    
    mockContacts.splice(index, 1);
    return true;
  },

  async search(query: string): Promise<Contact[]> {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    return mockContacts.filter(contact =>
      contact.name.toLowerCase().includes(lowercaseQuery) ||
      contact.phone.toLowerCase().includes(lowercaseQuery) ||
      contact.email?.toLowerCase().includes(lowercaseQuery) ||
      contact.company?.toLowerCase().includes(lowercaseQuery)
    );
  }
};

// Messages API
export const messagesApi = {
  async getByContactId(contactId: string): Promise<Message[]> {
    await delay(400);
    return mockMessages.filter(message => message.contactId === contactId);
  },

  async send(contactId: string, text: string): Promise<Message> {
    await delay(1000);
    const newMessage: Message = {
      id: Date.now().toString(),
      contactId,
      text,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      sender: 'user',
      status: 'sent'
    };
    
    mockMessages.push(newMessage);
    
    // Update contact's last message
    const contactIndex = mockContacts.findIndex(c => c.id === contactId);
    if (contactIndex !== -1) {
      mockContacts[contactIndex].lastMessage = text;
      mockContacts[contactIndex].lastMessageTime = 'Agora';
      mockContacts[contactIndex].unreadCount = 0;
    }
    
    return newMessage;
  },

  async markAsRead(contactId: string): Promise<void> {
    await delay(200);
    // Mark all contact messages as read
    mockMessages.forEach(message => {
      if (message.contactId === contactId && message.sender === 'user') {
        message.status = 'read';
      }
    });
    
    // Update contact unread count
    const contactIndex = mockContacts.findIndex(c => c.id === contactId);
    if (contactIndex !== -1) {
      mockContacts[contactIndex].unreadCount = 0;
    }
  }
};

// Dashboard API
export const dashboardApi = {
  async getMetrics(): Promise<DashboardMetric[]> {
    await delay(600);
    return mockDashboardMetrics;
  },

  async getRecentActivity(): Promise<any[]> {
    await delay(400);
    return [
      {
        id: '1',
        type: 'message',
        title: 'Nova mensagem de Maria Silva',
        time: 'Há 30 minutos',
        icon: 'MessageCircle'
      },
      {
        id: '2',
        type: 'meeting',
        title: 'Reunião agendada com João Santos',
        time: 'Hoje às 15:00',
        icon: 'Calendar'
      },
      {
        id: '3',
        type: 'proposal',
        title: 'Proposta de Marketing Digital visualizada',
        time: 'Ontem às 14:25',
        icon: 'FileText'
      },
      {
        id: '4',
        type: 'contact',
        title: 'Novo contato adicionado: Ana Pereira',
        time: 'Ontem às 10:12',
        icon: 'Users'
      }
    ];
  }
};

// Templates API
export const templatesApi = {
  async getAll() {
    await delay(200);
    return messageTemplates;
  },

  async getById(id: string) {
    await delay(150);
    return messageTemplates.find(template => template.id === id) || null;
  }
};

// Auth API (mock)
export const authApi = {
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    await delay(1500);
    
    // Mock validation
    if (email === 'admin@optivoo.com' && password === 'admin123') {
      return {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: 'João Silva',
          email: email,
          onboardingCompleted: true
        }
      };
    }
    
    throw new Error('Credenciais inválidas');
  },

  async register(email: string, password: string, name: string): Promise<{ token: string; user: any }> {
    await delay(2000);
    
    return {
      token: 'mock-jwt-token',
      user: {
        id: Date.now().toString(),
        name,
        email,
        onboardingCompleted: false
      }
    };
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    await delay(1000);
    return {
      message: 'Link de recuperação enviado para seu email'
    };
  }
};
