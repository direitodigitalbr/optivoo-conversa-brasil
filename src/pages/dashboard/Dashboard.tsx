
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, FileText, Users, Activity, TrendingUp, BarChart3, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '@/components/dashboard/MetricCard';
import SmartActions from '@/components/smart/SmartActions';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { GlassButton } from '@/components/ui/glass-button';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">Bem-vindo ao Optivoo CRM com IA</p>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="Total de Contatos"
          value={54}
          subtitle="+8% em relação ao mês passado"
          icon={Users}
          trend={{ value: "+8%", isPositive: true }}
          className="stagger-1"
        />
        <MetricCard
          title="Mensagens Novas"
          value={12}
          subtitle="+2 nas últimas 24 horas"
          icon={MessageCircle}
          trend={{ value: "+2", isPositive: true }}
          className="stagger-2"
        />
        <MetricCard
          title="Propostas Enviadas"
          value={8}
          subtitle="3 visualizadas, 2 aceitas"
          icon={FileText}
          className="stagger-3"
        />
        <MetricCard
          title="Sentimento Positivo"
          value="78%"
          subtitle="+5% em relação ao mês passado"
          icon={TrendingUp}
          trend={{ value: "+5%", isPositive: true }}
          className="stagger-4"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EnhancedCard
            title="Atividades recentes"
            description="Acompanhe as últimas interações com os clientes"
            glassmorphism="medium"
            animation="slide"
            hover={true}
            glowOnHover={true}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg glass-subtle hover:glass transition-all duration-300 touch-target">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-2 rounded-full flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">Nova mensagem de Maria Silva</p>
                  <p className="text-xs text-muted-foreground">Há 30 minutos</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-lg glass-subtle hover:glass transition-all duration-300 touch-target">
                <div className="bg-gradient-to-br from-green-500/20 to-green-500/10 p-2 rounded-full flex-shrink-0">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">Reunião agendada com João Santos</p>
                  <p className="text-xs text-muted-foreground">Hoje às 15:00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-lg glass-subtle hover:glass transition-all duration-300 touch-target">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 p-2 rounded-full flex-shrink-0">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">Proposta de Marketing Digital visualizada</p>
                  <p className="text-xs text-muted-foreground">Ontem às 14:25</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-lg glass-subtle hover:glass transition-all duration-300 touch-target">
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 p-2 rounded-full flex-shrink-0">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">Novo contato adicionado: Ana Pereira</p>
                  <p className="text-xs text-muted-foreground">Ontem às 10:12</p>
                </div>
              </div>
            </div>
          </EnhancedCard>
          
          <EnhancedCard
            title="Acesso rápido"
            description="Principais funcionalidades do sistema"
            glassmorphism="medium"
            animation="fade"
            interactive={true}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <GlassButton 
                variant="ghost"
                size="lg"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/dashboard/whatsapp')}
              >
                <MessageCircle className="h-6 w-6 text-primary" />
                <span className="text-xs sm:text-sm">Conversas</span>
              </GlassButton>
              <GlassButton 
                variant="ghost"
                size="lg"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/dashboard/contacts')}
              >
                <Users className="h-6 w-6 text-primary" />
                <span className="text-xs sm:text-sm">Contatos</span>
              </GlassButton>
              <GlassButton 
                variant="ghost"
                size="lg"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/dashboard/proposals')}
              >
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xs sm:text-sm">Propostas</span>
              </GlassButton>
              <GlassButton 
                variant="ghost"
                size="lg"
                className="h-auto py-4 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/dashboard/analytics')}
              >
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="text-xs sm:text-sm">Analytics</span>
              </GlassButton>
            </div>
          </EnhancedCard>
        </div>
        
        <div className="space-y-6">
          <SmartActions context="dashboard" />
          
          <EnhancedCard
            title="Status do Sistema"
            badge={{ text: "Tudo Funcionando", variant: "default" }}
            glassmorphism="strong"
            animation="bounce"
            glowOnHover={true}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg glass-subtle transition-all duration-300">
                <span className="text-sm font-medium">WhatsApp API</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-glow"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg glass-subtle transition-all duration-300">
                <span className="text-sm font-medium">Assistente IA</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-glow"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg glass-subtle transition-all duration-300">
                <span className="text-sm font-medium">Análise de Sentimento</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-glow"></div>
                  <span className="text-xs text-muted-foreground">Ativo</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg glass-subtle transition-all duration-300">
                <span className="text-sm font-medium">Backup</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Em andamento</span>
                </div>
              </div>
            </div>
          </EnhancedCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
