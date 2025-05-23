
import { useState, useRef, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, Send, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá! Sou seu assistente IA do Optivoo CRM. Como posso ajudar você hoje?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample assistant suggestions
  const suggestions = [
    'Como preparar uma proposta para cliente?',
    'Analisar desempenho dos leads',
    'Sugerir respostas para mensagens',
    'Resumir interações com cliente'
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response;
      
      if (input.toLowerCase().includes('proposta')) {
        response = "Para preparar uma proposta eficiente, você pode usar nosso gerador de propostas. Vá para a seção 'Propostas' e preencha os dados do cliente. Dicas importantes:\n\n1. Seja específico sobre entregas\n2. Destaque o valor, não apenas o preço\n3. Inclua prazos claros\n4. Adicione depoimentos de clientes anteriores";
      } else if (input.toLowerCase().includes('lead') || input.toLowerCase().includes('desempenho')) {
        response = "Analisando seus leads atuais: Você tem 15 leads qualificados como 'quentes', um aumento de 25% em relação ao mês anterior. 3 deles estão prontos para receber propostas. Recomendo priorizar os contatos com Maria Silva e João Santos, que demonstraram grande interesse nos últimos 7 dias.";
      } else if (input.toLowerCase().includes('mensagem') || input.toLowerCase().includes('resposta')) {
        response = "Posso ajudar a elaborar respostas para mensagens de clientes. Para maior eficiência, forneça o contexto da conversa e o que você deseja comunicar. Com base no tom de voz escolhido nas suas configurações, vou criar respostas personalizadas alinhadas com sua marca.";
      } else {
        response = "Entendi sua solicitação. Como assistente do Optivoo CRM, posso ajudar com:\n\n- Análise de dados de clientes\n- Sugestões para qualificação de leads\n- Criação de propostas personalizadas\n- Preparação de respostas para mensagens\n\nPoderia fornecer mais detalhes sobre o que você precisa?";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assistente IA</h1>
        <p className="text-muted-foreground">Tire dúvidas e obtenha insights inteligentes</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-15rem)]">
            <CardHeader className="border-b">
              <CardTitle className="text-xl">Seu assistente</CardTitle>
              <CardDescription>
                Treinado para ajudar com CRM, propostas, leads e comunicação
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-[calc(100%-5rem)]">
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`flex gap-3 max-w-[80%] ${
                          message.role === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <div className={`
                          h-8 w-8 rounded-full flex items-center justify-center 
                          ${message.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'}
                        `}>
                          {message.role === 'user' 
                            ? <User size={16} /> 
                            : <Bot size={16} />
                          }
                        </div>
                        <div 
                          className={`
                            rounded-lg p-3 
                            ${message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'}
                          `}
                        >
                          <p className="whitespace-pre-line">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground">
                          <Bot size={16} />
                        </div>
                        <div className="rounded-lg p-3 bg-muted flex items-center">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2">Elaborando resposta...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || input.trim() === ''}
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Sugestões</CardTitle>
              <CardDescription>
                Pergunte ao assistente sobre:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium text-sm mb-2">Dica</h3>
                <p className="text-xs text-muted-foreground">
                  O assistente IA integra dados de contatos e conversas para fornecer respostas mais relevantes ao seu negócio.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
