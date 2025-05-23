import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Settings = () => {
  const [formValues, setFormValues] = useState({
    name: 'João Silva',
    email: 'joao@exemplo.com',
    password: '',
    confirmPassword: '',
    businessHours: {
      start: '09:00',
      end: '18:00',
    },
    notifyNewMessages: true,
    notifyLeadActivity: true,
    notifyProposalViewed: true,
    saveWhatAppMessages: true,
    useAIAssistant: true,
    apiKeys: {
      whatsapp: '••••••••••••••••',
      google: '••••••••••••••••',
      openai: '',
    },
  });

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNestedInputChange = (
    parent: string,
    key: string,
    value: string | boolean
  ) => {
    setFormValues((prev) => {
      const parentObj = prev[parent as keyof typeof prev];
      
      // Fix: Ensure parentObj is treated as an object before spreading
      if (typeof parentObj === 'object' && parentObj !== null) {
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [key]: value,
          },
        };
      }
      
      // If not an object, handle differently
      return {
        ...prev,
        [parent]: {
          [key]: value,
        },
      };
    });
  };

  const handleSaveProfile = () => {
    toast.success('Perfil atualizado com sucesso');
  };

  const handleSaveNotifications = () => {
    toast.success('Preferências de notificação atualizadas');
  };

  const handleSaveIntegrations = () => {
    toast.success('Integrações atualizadas com sucesso');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e integrações</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações pessoais</CardTitle>
              <CardDescription>
                Atualize suas informações de conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={formValues.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formValues.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-lg font-medium">Alterar senha</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha atual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={formValues.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={formValues.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-lg font-medium">Horário de atendimento</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-hours-start">Horário de início</Label>
                    <Input
                      id="business-hours-start"
                      type="time"
                      value={formValues.businessHours.start}
                      onChange={(e) =>
                        handleNestedInputChange('businessHours', 'start', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-hours-end">Horário de término</Label>
                    <Input
                      id="business-hours-end"
                      type="time"
                      value={formValues.businessHours.end}
                      onChange={(e) =>
                        handleNestedInputChange('businessHours', 'end', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile}>Salvar alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de notificação</CardTitle>
              <CardDescription>
                Personalize como e quando deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-messages">Novas mensagens</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando novos clientes enviarem mensagens
                    </p>
                  </div>
                  <Switch
                    id="notify-messages"
                    checked={formValues.notifyNewMessages}
                    onCheckedChange={(checked) =>
                      handleNestedInputChange('notifyNewMessages', '', checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-leads">Atividade de leads</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando um lead mudar de status
                    </p>
                  </div>
                  <Switch
                    id="notify-leads"
                    checked={formValues.notifyLeadActivity}
                    onCheckedChange={(checked) =>
                      handleNestedInputChange('notifyLeadActivity', '', checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-proposals">Propostas visualizadas</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações quando um cliente visualizar uma proposta
                    </p>
                  </div>
                  <Switch
                    id="notify-proposals"
                    checked={formValues.notifyProposalViewed}
                    onCheckedChange={(checked) =>
                      handleNestedInputChange('notifyProposalViewed', '', checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Salvar preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrações e APIs</CardTitle>
              <CardDescription>
                Configure as integrações com serviços externos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="save-whatsapp">WhatsApp 360dialog</Label>
                    <p className="text-sm text-muted-foreground">
                      Sincronizar e salvar histórico de conversas
                    </p>
                  </div>
                  <Switch
                    id="save-whatsapp"
                    checked={formValues.saveWhatAppMessages}
                    onCheckedChange={(checked) =>
                      handleNestedInputChange('saveWhatAppMessages', '', checked)
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-api">Chave de API WhatsApp</Label>
                  <Input
                    id="whatsapp-api"
                    value={formValues.apiKeys.whatsapp}
                    onChange={(e) =>
                      handleNestedInputChange('apiKeys', 'whatsapp', e.target.value)
                    }
                    type="password"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="use-ai">Assistente IA</Label>
                    <p className="text-sm text-muted-foreground">
                      Usar IA para sugestões e análises
                    </p>
                  </div>
                  <Switch
                    id="use-ai"
                    checked={formValues.useAIAssistant}
                    onCheckedChange={(checked) =>
                      handleNestedInputChange('useAIAssistant', '', checked)
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="openai-api">Chave de API OpenAI</Label>
                  <Input
                    id="openai-api"
                    value={formValues.apiKeys.openai}
                    onChange={(e) =>
                      handleNestedInputChange('apiKeys', 'openai', e.target.value)
                    }
                    placeholder="sk-..."
                    type="password"
                  />
                </div>

                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="google-api">Chave de API Google Calendar</Label>
                  <Input
                    id="google-api"
                    value={formValues.apiKeys.google}
                    onChange={(e) =>
                      handleNestedInputChange('apiKeys', 'google', e.target.value)
                    }
                    type="password"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Usada para sincronizar eventos e reuniões
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveIntegrations}>Salvar integrações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
