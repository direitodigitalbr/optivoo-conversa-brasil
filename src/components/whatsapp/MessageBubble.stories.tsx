
import type { Meta, StoryObj } from '@storybook/react';
import MessageBubble from './MessageBubble';

const meta: Meta<typeof MessageBubble> = {
  title: 'WhatsApp/MessageBubble',
  component: MessageBubble,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de bolha de mensagem para conversas do WhatsApp.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sender: {
      control: 'select',
      options: ['user', 'contact'],
      description: 'Quem enviou a mensagem',
    },
    status: {
      control: 'select',
      options: ['sent', 'delivered', 'read'],
      description: 'Status da mensagem',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OutgoingMessage: Story = {
  args: {
    id: '1',
    text: 'Olá! Como você está?',
    time: '14:30',
    sender: 'user',
    status: 'read',
  },
};

export const IncomingMessage: Story = {
  args: {
    id: '2',
    text: 'Oi! Estou bem, obrigado por perguntar.',
    time: '14:32',
    sender: 'contact',
    contactName: 'João Silva',
  },
};

export const LongMessage: Story = {
  args: {
    id: '3',
    text: 'Esta é uma mensagem muito longa para testar como o componente se comporta com textos extensos. Precisa quebrar linhas adequadamente e manter a formatação.',
    time: '14:35',
    sender: 'user',
    status: 'delivered',
  },
};

export const MessageSent: Story = {
  args: {
    id: '4',
    text: 'Mensagem enviada',
    time: '14:40',
    sender: 'user',
    status: 'sent',
  },
};
