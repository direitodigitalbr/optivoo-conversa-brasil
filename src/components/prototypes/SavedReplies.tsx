
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Tag,
  MessageSquare,
  Clock
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface SavedReply {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: 'welcome' | 'follow-up' | 'support' | 'sales' | 'closing';
  usageCount: number;
  lastUsed?: string;
  createdAt: string;
}

const SavedReplies = () => {
  const [replies, setReplies] = useState<SavedReply[]>([
    {
      id: '1',
      title: 'Boas-vindas Inicial',
      content: 'Olá! Muito obrigado por entrar em contato conosco. Estou aqui para ajudá-lo(a) com todas as suas dúvidas sobre nossos serviços. Como posso auxiliá-lo(a) hoje?',
      tags: ['boas-vindas', 'primeiro-contato'],
      category: 'welcome',
      usageCount: 24,
      lastUsed: '2024-01-20',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Acompanhamento de Proposta',
      content: 'Olá! Espero que esteja bem. Estou entrando em contato para dar continuidade à nossa conversa sobre a proposta que enviamos. Teve a oportunidade de analisá-la? Fico à disposição para esclarecer qualquer dúvida.',
      tags: ['proposta', 'acompanhamento'],
      category: 'follow-up',
      usageCount: 18,
      lastUsed: '2024-01-19',
      createdAt: '2024-01-05'
    },
    {
      id: '3',
      title: 'Suporte Técnico',
      content: 'Entendo sua situação e vou ajudá-lo(a) a resolver isso o mais rápido possível. Poderia me fornecer mais detalhes sobre o problema que está enfrentando? Assim posso direcioná-lo(a) para a melhor solução.',
      tags: ['suporte', 'problema', 'ajuda'],
      category: 'support',
      usageCount: 31,
      lastUsed: '2024-01-20',
      createdAt: '2024-01-03'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingReply, setEditingReply] = useState<SavedReply | null>(null);

  const categories = [
    { value: 'all', label: 'Todas' },
    { value: 'welcome', label: 'Boas-vindas' },
    { value: 'follow-up', label: 'Acompanhamento' },
    { value: 'support', label: 'Suporte' },
    { value: 'sales', label: 'Vendas' },
    { value: 'closing', label: 'Fechamento' }
  ];

  const filteredReplies = replies.filter(reply => {
    const matchesSearch = reply.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reply.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reply.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || reply.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCopyReply = (reply: SavedReply) => {
    navigator.clipboard.writeText(reply.content);
    toast.success('Resposta copiada para a área de transferência');
    
    // Update usage count
    setReplies(prev => prev.map(r => 
      r.id === reply.id 
        ? { ...r, usageCount: r.usageCount + 1, lastUsed: new Date().toISOString().split('T')[0] }
        : r
    ));
  };

  const handleDeleteReply = (id: string) => {
    setReplies(prev => prev.filter(r => r.id !== id));
    toast.success('Resposta excluída com sucesso');
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'welcome': return 'bg-green-500 text-white';
      case 'follow-up': return 'bg-blue-500 text-white';
      case 'support': return 'bg-yellow-500 text-white';
      case 'sales': return 'bg-purple-500 text-white';
      case 'closing': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Respostas Salvas</h2>
          <p className="text-muted-foreground">Gerencie templates de mensagens reutilizáveis</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Resposta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Resposta</DialogTitle>
              <DialogDescription>
                Crie um template de resposta para usar em conversas futuras
              </DialogDescription>
            </DialogHeader>
            {/* Form would go here */}
            <div className="space-y-4">
              <Input placeholder="Título da resposta" />
              <Textarea placeholder="Conteúdo da resposta" rows={5} />
              <Input placeholder="Tags (separadas por vírgula)" />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar por título, conteúdo ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredReplies.map((reply) => (
          <Card key={reply.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg">{reply.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getCategoryColor(reply.category)}`}>
                      {getCategoryLabel(reply.category)}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageSquare className="h-3 w-3" />
                      {reply.usageCount} usos
                    </div>
                    {reply.lastUsed && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {reply.lastUsed}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingReply(reply)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDeleteReply(reply.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                {reply.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {reply.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button size="sm" onClick={() => handleCopyReply(reply)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReplies.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma resposta encontrada</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {searchTerm 
                ? 'Tente ajustar sua pesquisa ou filtros' 
                : 'Comece criando sua primeira resposta salva'
              }
            </p>
            {!searchTerm && (
              <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeira Resposta
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SavedReplies;
