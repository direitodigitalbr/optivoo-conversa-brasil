
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Tag, 
  Plus, 
  Search, 
  Filter,
  Users,
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Contact } from '@/data/mockData';

interface UserTag {
  id: string;
  name: string;
  color: string;
  description: string;
  category: 'behavior' | 'preference' | 'status' | 'interest' | 'engagement';
  contactCount: number;
  createdAt: string;
}

interface TaggedContact extends Contact {
  userTags: string[];
}

const UserTagging = () => {
  const [tags, setTags] = useState<UserTag[]>([
    {
      id: '1',
      name: 'Alto Interesse',
      color: '#10b981',
      description: 'Clientes demonstrando forte interesse nos produtos',
      category: 'engagement',
      contactCount: 12,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Decisor',
      color: '#3b82f6',
      description: 'Pessoa que toma decisões na empresa',
      category: 'behavior',
      contactCount: 8,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Orçamento Limitado',
      color: '#f59e0b',
      description: 'Clientes com restrições orçamentárias',
      category: 'preference',
      contactCount: 15,
      createdAt: '2024-01-12'
    },
    {
      id: '4',
      name: 'Tech Savvy',
      color: '#8b5cf6',
      description: 'Clientes com conhecimento técnico avançado',
      category: 'behavior',
      contactCount: 6,
      createdAt: '2024-01-08'
    },
    {
      id: '5',
      name: 'Resposta Rápida',
      color: '#ef4444',
      description: 'Clientes que respondem rapidamente',
      category: 'behavior',
      contactCount: 20,
      createdAt: '2024-01-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newTagName, setNewTagName] = useState('');

  const categories = [
    { value: 'all', label: 'Todas' },
    { value: 'behavior', label: 'Comportamento' },
    { value: 'preference', label: 'Preferência' },
    { value: 'status', label: 'Status' },
    { value: 'interest', label: 'Interesse' },
    { value: 'engagement', label: 'Engajamento' }
  ];

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tag.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || tag.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCreateTag = () => {
    if (!newTagName.trim()) return;

    const newTag: UserTag = {
      id: Date.now().toString(),
      name: newTagName,
      color: '#64748b',
      description: 'Nova tag criada pelo usuário',
      category: 'status',
      contactCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTags(prev => [...prev, newTag]);
    setNewTagName('');
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'behavior': return <Users className="h-4 w-4" />;
      case 'preference': return <Target className="h-4 w-4" />;
      case 'status': return <Calendar className="h-4 w-4" />;
      case 'interest': return <TrendingUp className="h-4 w-4" />;
      case 'engagement': return <Tag className="h-4 w-4" />;
      default: return <Tag className="h-4 w-4" />;
    }
  };

  const tagsByCategory = categories.slice(1).map(category => ({
    ...category,
    tags: tags.filter(tag => tag.category === category.value),
    totalContacts: tags.filter(tag => tag.category === category.value)
                      .reduce((sum, tag) => sum + tag.contactCount, 0)
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sistema de Tags</h2>
          <p className="text-muted-foreground">Organize e categorize seus contatos com tags inteligentes</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{tags.length}</div>
            <p className="text-xs text-muted-foreground">Tags Ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {tags.reduce((sum, tag) => sum + tag.contactCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Contatos Tagueados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{categories.length - 1}</div>
            <p className="text-xs text-muted-foreground">Categorias</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {Math.round((tags.reduce((sum, tag) => sum + tag.contactCount, 0) / 50) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Taxa de Cobertura</p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Tag */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Criar Nova Tag
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Nome da tag..."
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateTag()}
            />
            <Button onClick={handleCreateTag} disabled={!newTagName.trim()}>
              Criar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tags by Category */}
      <div className="space-y-6">
        {tagsByCategory.map((categoryData) => (
          <Card key={categoryData.value}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(categoryData.value)}
                  {categoryData.label}
                </div>
                <Badge variant="outline">
                  {categoryData.tags.length} tags • {categoryData.totalContacts} contatos
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryData.tags
                  .filter(tag => 
                    selectedCategory === 'all' || 
                    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tag.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((tag) => (
                    <div key={tag.id} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          className="text-white"
                          style={{ backgroundColor: tag.color }}
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag.name}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {tag.contactCount} contatos
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {tag.description}
                      </p>
                      
                      <div className="text-xs text-muted-foreground">
                        Criada em: {tag.createdAt}
                      </div>
                    </div>
                  ))}
              </div>
              
              {categoryData.tags.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhuma tag nesta categoria ainda
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* All Tags View */}
      {selectedCategory !== 'all' && (
        <Card>
          <CardHeader>
            <CardTitle>Todas as Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => (
                <Badge 
                  key={tag.id}
                  className="text-white cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: tag.color }}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag.name} ({tag.contactCount})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserTagging;
