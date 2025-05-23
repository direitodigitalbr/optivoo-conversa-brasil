
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de cartão flexível para exibir conteúdo agrupado.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Título do Cartão</CardTitle>
        <CardDescription>Descrição do cartão explicando seu conteúdo.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Conteúdo principal do cartão.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Projeto React</CardTitle>
        <CardDescription>Um projeto incrível usando React e TypeScript.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar</Button>
      </CardFooter>
    </Card>
  ),
};

export const Notification: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Notificações</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Nova mensagem</p>
            <p className="text-sm text-muted-foreground">Você tem uma nova mensagem de João.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};
