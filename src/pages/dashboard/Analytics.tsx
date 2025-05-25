
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
import { EnhancedCard } from '@/components/ui/enhanced-card';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('sentiment');

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 fade-in-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Analytics & IA
          </h1>
          <p className="text-muted-foreground mt-2">Insights inteligentes e ferramentas avançadas para seu CRM</p>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <EnhancedCard 
          glassmorphism="medium"
          animation="slide"
          hover={true}
          interactive={true}
          className="stagger-1 cursor-pointer" 
          onClick={() => setActiveTab('sentiment')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Análise de Sentimento</p>
                <p className="text-xs text-muted-foreground">78% Positivo</p>
              </div>
            </div>
          </CardContent>
        </EnhancedCard>

        <EnhancedCard 
          glassmorphism="medium"
          animation="slide"
          hover={true}
          interactive={true}
          className="stagger-2 cursor-pointer" 
          onClick={() => setActiveTab('actions')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full">
                <Lightbulb className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Ações Inteligentes</p>
                <p className="text-xs text-muted-foreground">5 Recomendações</p>
              </div>
            </div>
          </CardContent>
        </EnhancedCard>

        <EnhancedCard 
          glassmorphism="medium"
          animation="slide"
          hover={true}
          interactive={true}
          className="stagger-3 cursor-pointer" 
          onClick={() => setActiveTab('tags')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-full">
                <Tag className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Sistema de Tags</p>
                <p className="text-xs text-muted-foreground">12 Categorias</p>
              </div>
            </div>
          </CardContent>
        </EnhancedCard>

        <EnhancedCard 
          glassmorphism="medium"
          animation="slide"
          hover={true}
          interactive={true}
          className="stagger-4 cursor-pointer" 
          onClick={() => setActiveTab('filters')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-full">
                <Filter className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Filtros Inteligentes</p>
                <p className="text-xs text-muted-foreground">8 Filtros Ativos</p>
              </div>
            </div>
          </CardContent>
        </EnhancedCard>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 slide-up">
        <TabsList className="grid w-full grid-cols-5 glass-strong p-1">
          <TabsTrigger value="sentiment" className="touch-target">Sentimento</TabsTrigger>
          <TabsTrigger value="actions" className="touch-target">Ações IA</TabsTrigger>
          <TabsTrigger value="replies" className="touch-target">Respostas</TabsTrigger>
          <TabsTrigger value="tags" className="touch-target">Tags</TabsTrigger>
          <TabsTrigger value="filters" className="touch-target">Filtros</TabsTrigger>
        </TabsList>

        <TabsContent value="sentiment" className="space-y-4 fade-in-up">
          <SentimentDashboard />
        </TabsContent>

        <TabsContent value="actions" className="space-y-4 fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <EnhancedCard
                title="Visão Geral das Ações Inteligentes"
                description="Nossa IA analisa seus dados e sugere ações para maximizar conversões"
                glassmorphism="medium"
                glowOnHover={true}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg glass-subtle">
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <p className="text-sm text-muted-foreground">Ações Recomendadas</p>
                  </div>
                  <div className="text-center p-4 rounded-lg glass-subtle">
                    <div className="text-2xl font-bold text-blue-600">89%</div>
                    <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                  </div>
                  <div className="text-center p-4 rounded-lg glass-subtle">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <p className="text-sm text-muted-foreground">Ações Executadas</p>
                  </div>
                </div>
              </EnhancedCard>
            </div>
            
            <div>
              <SmartActions context="dashboard" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="replies" className="space-y-4 fade-in-up">
          <SavedReplies />
        </TabsContent>

        <TabsContent value="tags" className="space-y-4 fade-in-up">
          <UserTagging />
        </TabsContent>

        <TabsContent value="filters" className="space-y-4 fade-in-up">
          <SmartInboxFilters />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
