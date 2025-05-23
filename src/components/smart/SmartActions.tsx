
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Calendar, 
  FileText, 
  Phone, 
  Star, 
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';
import { Contact } from '@/data/mockData';

interface SmartAction {
  id: string;
  type: 'message' | 'call' | 'meeting' | 'proposal' | 'follow-up';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  contactId?: string;
  suggestedTime?: string;
  reasoning: string;
}

interface SmartActionsProps {
  contact?: Contact;
  context?: 'dashboard' | 'contact' | 'conversation';
}

const SmartActions = ({ contact, context = 'dashboard' }: SmartActionsProps) => {
  const [actions, setActions] = useState<SmartAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateSmartActions();
  }, [contact, context]);

  const generateSmartActions = async () => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const baseActions: SmartAction[] = [
      {
        id: '1',
        type: 'follow-up',
        title: 'Seguimento Prioritário',
        description: 'Contatar Maria Silva sobre proposta pendente',
        priority: 'high',
        confidence: 0.89,
        contactId: '1',
        suggestedTime: 'Hoje às 14:00',
        reasoning: 'Cliente demonstrou alto interesse e não respondeu há 2 dias'
      },
      {
        id: '2',
        type: 'proposal',
        title: 'Enviar Proposta',
        description: 'Criar proposta personalizada para João Santos',
        priority: 'medium',
        confidence: 0.76,
        contactId: '2',
        suggestedTime: 'Amanhã',
        reasoning: 'Cliente fez perguntas específicas sobre preços e funcionalidades'
      },
      {
        id: '3',
        type: 'meeting',
        title: 'Agendar Reunião',
        description: 'Reunião de alinhamento com Ana Pereira',
        priority: 'medium',
        confidence: 0.82,
        contactId: '3',
        suggestedTime: 'Esta semana',
        reasoning: 'Cliente mencionou necessidade de discussão mais detalhada'
      }
    ];

    // Filter actions based on context and contact
    let filteredActions = baseActions;
    
    if (contact) {
      filteredActions = baseActions.filter(action => action.contactId === contact.id);
      
      // Add contact-specific actions
      if (contact.tag === 'hot') {
        filteredActions.push({
          id: '4',
          type: 'call',
          title: 'Ligar Urgente',
          description: `Contato quente: ${contact.name}`,
          priority: 'high',
          confidence: 0.94,
          contactId: contact.id,
          suggestedTime: 'Próximos 30 minutos',
          reasoning: 'Lead quente com alta probabilidade de conversão'
        });
      }
    }

    setActions(filteredActions);
    setIsLoading(false);
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'proposal': return <FileText className="h-4 w-4" />;
      case 'follow-up': return <Clock className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  };

  const handleActionClick = (action: SmartAction) => {
    // Here you would implement the actual action logic
    console.log('Executing action:', action);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Ações Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Ações Inteligentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma ação recomendada no momento
            </p>
          ) : (
            actions.map((action) => (
              <div key={action.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full">
                  {getActionIcon(action.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{action.title}</h4>
                    <Badge className={`text-xs px-2 py-0 ${getPriorityColor(action.priority)}`}>
                      {getPriorityLabel(action.priority)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Confiança: {Math.round(action.confidence * 100)}%
                      </div>
                      {action.suggestedTime && (
                        <div className="mt-1">
                          Sugestão: {action.suggestedTime}
                        </div>
                      )}
                    </div>
                    
                    <Button size="sm" variant="outline" onClick={() => handleActionClick(action)}>
                      Executar
                    </Button>
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground italic">
                    {action.reasoning}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartActions;
