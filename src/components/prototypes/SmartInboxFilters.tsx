
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Filter, 
  MessageCircle, 
  Clock, 
  Star, 
  AlertCircle,
  TrendingUp,
  Users,
  Bot,
  Settings,
  CheckCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SmartFilter {
  id: string;
  name: string;
  description: string;
  type: 'priority' | 'sentiment' | 'engagement' | 'behavioral' | 'temporal';
  isActive: boolean;
  count: number;
  criteria: {
    condition: string;
    value: any;
  }[];
  aiConfidence: number;
}

interface FilteredMessage {
  id: string;
  contactName: string;
  preview: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  sentiment: 'positive' | 'negative' | 'neutral';
  isUnread: boolean;
  tags: string[];
}

const SmartInboxFilters = () => {
  const [filters, setFilters] = useState<SmartFilter[]>([
    {
      id: '1',
      name: 'Leads Quentes',
      description: 'Mensagens de contatos com alta probabilidade de conversão',
      type: 'priority',
      isActive: true,
      count: 8,
      criteria: [
        { condition: 'tag', value: 'hot' },
        { condition: 'lastActivity', value: '< 24h' }
      ],
      aiConfidence: 0.92
    },
    {
      id: '2',
      name: 'Urgente - Suporte',
      description: 'Mensagens indicando problemas ou reclamações urgentes',
      type: 'sentiment',
      isActive: true,
      count: 3,
      criteria: [
        { condition: 'sentiment', value: 'negative' },
        { condition: 'keywords', value: ['problema', 'urgente', 'erro'] }
      ],
      aiConfidence: 0.87
    },
    {
      id: '3',
      name: 'Propostas Pendentes',
      description: 'Follow-up de propostas enviadas aguardando resposta',
      type: 'temporal',
      isActive: true,
      count: 12,
      criteria: [
        { condition: 'lastMessage', value: 'sent_proposal' },
        { condition: 'daysSinceLastReply', value: '> 2' }
      ],
      aiConfidence: 0.78
    },
    {
      id: '4',
      name: 'Engajamento Alto',
      description: 'Contatos que demonstram alto interesse e engajamento',
      type: 'engagement',
      isActive: false,
      count: 15,
      criteria: [
        { condition: 'responseTime', value: '< 1h' },
        { condition: 'messageLength', value: 'long' }
      ],
      aiConfidence: 0.83
    },
    {
      id: '5',
      name: 'Novos Contatos',
      description: 'Primeiras mensagens de novos leads',
      type: 'behavioral',
      isActive: true,
      count: 6,
      criteria: [
        { condition: 'isFirstMessage', value: true },
        { condition: 'createdAt', value: '< 7 days' }
      ],
      aiConfidence: 0.95
    }
  ]);

  const [filteredMessages] = useState<FilteredMessage[]>([
    {
      id: '1',
      contactName: 'Maria Silva',
      preview: 'Olá! Gostaria de mais informações sobre o pacote enterprise...',
      timestamp: '10:30',
      priority: 'high',
      sentiment: 'positive',
      isUnread: true,
      tags: ['leads-quentes', 'enterprise']
    },
    {
      id: '2',
      contactName: 'João Santos',
      preview: 'Estou tendo um problema crítico com o sistema...',
      timestamp: '09:45',
      priority: 'high',
      sentiment: 'negative',
      isUnread: true,
      tags: ['urgente-suporte', 'problema']
    },
    {
      id: '3',
      contactName: 'Ana Costa',
      preview: 'Recebi a proposta ontem, vou analisar e retorno amanhã',
      timestamp: 'Ontem',
      priority: 'medium',
      sentiment: 'neutral',
      isUnread: false,
      tags: ['propostas-pendentes']
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const toggleFilter = (filterId: string) => {
    setFilters(prev => prev.map(filter => 
      filter.id === filterId 
        ? { ...filter, isActive: !filter.isActive }
        : filter
    ));
  };

  const getFilterIcon = (type: string) => {
    switch (type) {
      case 'priority': return <Star className="h-4 w-4" />;
      case 'sentiment': return <AlertCircle className="h-4 w-4" />;
      case 'engagement': return <TrendingUp className="h-4 w-4" />;
      case 'behavioral': return <Users className="h-4 w-4" />;
      case 'temporal': return <Clock className="h-4 w-4" />;
      default: return <Filter className="h-4 w-4" />;
    }
  };

  const getFilterColor = (type: string) => {
    switch (type) {
      case 'priority': return 'border-l-red-500';
      case 'sentiment': return 'border-l-yellow-500';
      case 'engagement': return 'border-l-green-500';
      case 'behavioral': return 'border-l-blue-500';
      case 'temporal': return 'border-l-purple-500';
      default: return 'border-l-gray-500';
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

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😟';
      default: return '😐';
    }
  };

  const activeFilters = filters.filter(f => f.isActive);
  const totalFilteredMessages = activeFilters.reduce((sum, filter) => sum + filter.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Filtros Inteligentes</h2>
          <p className="text-muted-foreground">Organize automaticamente suas mensagens com IA</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {activeFilters.length} filtros ativos • {totalFilteredMessages} mensagens
          </span>
        </div>
      </div>

      <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todos os Filtros</TabsTrigger>
          <TabsTrigger value="active">Ativos ({activeFilters.length})</TabsTrigger>
          <TabsTrigger value="messages">Mensagens Filtradas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filters.map((filter) => (
              <Card key={filter.id} className={`border-l-4 ${getFilterColor(filter.type)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        {getFilterIcon(filter.type)}
                        <CardTitle className="text-lg">{filter.name}</CardTitle>
                        <Badge variant={filter.isActive ? 'default' : 'secondary'}>
                          {filter.count} mensagens
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {filter.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={filter.isActive}
                        onCheckedChange={() => toggleFilter(filter.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Confiança da IA:</span>
                      <span className="font-medium">{Math.round(filter.aiConfidence * 100)}%</span>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Critérios:</Label>
                      <div className="flex flex-wrap gap-1">
                        {filter.criteria.map((criterion, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {criterion.condition}: {criterion.value.toString()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeFilters.map((filter) => (
              <Card key={filter.id} className={`border-l-4 ${getFilterColor(filter.type)}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFilterIcon(filter.type)}
                      <CardTitle className="text-lg">{filter.name}</CardTitle>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{filter.count}</span>
                    <span className="text-sm text-muted-foreground">mensagens capturadas</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {activeFilters.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum filtro ativo</h3>
                <p className="text-muted-foreground text-center">
                  Ative alguns filtros para organizar automaticamente suas mensagens
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <Card key={message.id} className={`hover:shadow-md transition-shadow ${message.isUnread ? 'border-l-4 border-l-primary' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                        {message.contactName.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{message.contactName}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                            {message.priority === 'high' ? 'Alta' : message.priority === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {getSentimentIcon(message.sentiment)}
                          </span>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2 truncate">
                        {message.preview}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {message.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredMessages.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma mensagem filtrada</h3>
                <p className="text-muted-foreground text-center">
                  As mensagens aparecerão aqui quando os filtros capturam novos conteúdos
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartInboxFilters;
