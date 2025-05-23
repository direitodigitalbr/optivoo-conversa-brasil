
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, MessageCircle, Tag, Filter, Lightbulb } from 'lucide-react';
import SentimentDashboard from '@/components/sentiment/SentimentDashboard';
import SmartActions from '@/components/smart/SmartActions';
import SavedReplies from '@/components/prototypes/SavedReplies';
import UserTagging from '@/components/prototypes/UserTagging';
import SmartInboxFilters from '@/components/prototypes/SmartInboxFilters';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('sentiment');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Analytics & IA</h1>
          <p className="text-muted-foreground">Insights inteligentes e ferramentas avançadas para seu CRM</p>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('sentiment')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Análise de Sentimento</p>
                <p className="text-xs text-muted-foreground">78% Positivo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('actions')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-full">
                <Lightbulb className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Ações Inteligentes</p>
                <p className="text-xs text-muted-foreground">5 Recomendações</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('tags')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-full">
                <Tag className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Sistema de Tags</p>
                <p className="text-xs text-muted-foreground">12 Categorias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('filters')}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-full">
                <Filter className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Filtros Inteligentes</p>
                <p className="text-xs text-muted-foreground">8 Filtros Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sentiment">Sentimento</TabsTrigger>
          <TabsTrigger value="actions">Ações IA</TabsTrigger>
          <TabsTrigger value="replies">Respostas</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="filters">Filtros</TabsTrigger>
        </TabsList>

        <TabsContent value="sentiment" className="space-y-4">
          <SentimentDashboard />
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visão Geral das Ações Inteligentes</CardTitle>
                  <CardDescription>
                    Nossa IA analisa seus dados e sugere ações para maximizar conversões
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">5</div>
                      <p className="text-sm text-muted-foreground">Ações Recomendadas</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">89%</div>
                      <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <p className="text-sm text-muted-foreground">Ações Executadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <SmartActions context="dashboard" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="replies" className="space-y-4">
          <SavedReplies />
        </TabsContent>

        <TabsContent value="tags" className="space-y-4">
          <UserTagging />
        </TabsContent>

        <TabsContent value="filters" className="space-y-4">
          <SmartInboxFilters />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
