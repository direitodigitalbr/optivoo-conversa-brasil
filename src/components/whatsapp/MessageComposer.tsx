
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, Loader2, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface MessageComposerProps {
  onSend?: (data: MessageData) => void;
  className?: string;
}

interface MessageData {
  phoneNumber: string;
  template: string;
  message: string;
}

const templates = [
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
  }
];

const MessageComposer = ({ onSend, className }: MessageComposerProps) => {
  const [formData, setFormData] = useState<MessageData>({
    phoneNumber: '',
    template: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    setFormData(prev => ({
      ...prev,
      template: templateId,
      message: template?.content || ''
    }));
  };

  const validatePhoneNumber = (phone: string) => {
    // Brazilian phone number validation (simplified)
    const phoneRegex = /^(\+55\s?)?(\(\d{2}\)\s?|\d{2}\s?)?9?\d{4}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits and format as Brazilian number
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 11) {
      return `+55 (${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    return phone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phoneNumber: formatted }));
  };

  const handleSend = async () => {
    if (!formData.phoneNumber || !formData.message) {
      toast.error('Preencha o número e a mensagem');
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error('Número de telefone inválido');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSend) {
        onSend(formData);
      }
      
      toast.success('Mensagem enviada com sucesso!');
      
      // Reset form
      setFormData({
        phoneNumber: '',
        template: '',
        message: ''
      });
    } catch (error) {
      toast.error('Erro ao enviar mensagem');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Enviar Mensagem
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Número do WhatsApp</Label>
          <Input
            id="phone"
            placeholder="(11) 99999-9999"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="template">Template (opcional)</Label>
          <Select
            value={formData.template}
            onValueChange={handleTemplateChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensagem</Label>
          <Textarea
            id="message"
            placeholder="Digite sua mensagem..."
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            rows={4}
            className="resize-none"
          />
          <div className="text-xs text-muted-foreground text-right">
            {formData.message.length}/1000
          </div>
        </div>

        <Button 
          onClick={handleSend}
          disabled={isLoading || !formData.phoneNumber || !formData.message}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Enviar Mensagem
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MessageComposer;
