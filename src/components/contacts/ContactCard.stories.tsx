
import type { Meta, StoryObj } from '@storybook/react';
import ContactCard from './ContactCard';

const meta: Meta<typeof ContactCard> = {
  title: 'Contacts/ContactCard',
  component: ContactCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Cartão de contato com informações detalhadas e ações disponíveis.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'select',
      options: ['hot', 'warm', 'cold'],
      description: 'Tag de classificação do contato',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    name: 'João Silva',
    phone: '+55 11 99999-9999',
    email: 'joao@email.com',
    company: 'Empresa ABC',
    tag: 'hot',
    lastMessage: 'Olá, gostaria de saber mais sobre o produto.',
    lastMessageTime: '14:30',
    unreadCount: 3,
  },
};

export const WithoutEmail: Story = {
  args: {
    id: '2',
    name: 'Maria Santos',
    phone: '+55 11 88888-8888',
    company: 'Startup XYZ',
    tag: 'warm',
    lastMessage: 'Quando podemos agendar uma reunião?',
    lastMessageTime: '10:15',
    unreadCount: 1,
  },
};

export const ColdLead: Story = {
  args: {
    id: '3',
    name: 'Pedro Oliveira',
    phone: '+55 11 77777-7777',
    email: 'pedro@empresa.com',
    tag: 'cold',
    lastMessage: 'Obrigado pela informação.',
    lastMessageTime: 'Ontem',
  },
};

export const NoMessages: Story = {
  args: {
    id: '4',
    name: 'Ana Costa',
    phone: '+55 11 66666-6666',
    email: 'ana@email.com',
    company: 'Consultoria 123',
  },
};
