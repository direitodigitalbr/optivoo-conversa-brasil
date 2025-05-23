
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Smile, Frown, Meh } from 'lucide-react';
import { sentimentAnalysisApi, SentimentMetrics, SentimentData } from '@/services/sentimentAnalysis';
import { toast } from 'sonner';

const SentimentDashboard = () => {
  const [metrics, setMetrics] = useState<SentimentMetrics | null>(null);
  const [feedbackData, setFeedbackData] = useState<SentimentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [metricsData, feedback] = await Promise.all([
        sentimentAnalysisApi.getSentimentMetrics(),
        sentimentAnalysisApi.getFeedbackData()
      ]);
      setMetrics(metricsData);
      setFeedbackData(feedback);
    } catch (error) {
      toast.error('Erro ao carregar dados de sentimento');
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="h-4 w-4 text-green-500" />;
      case 'negative': return <Frown className="h-4 w-4 text-red-500" />;
      default: return <Meh className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500';
      case 'negative': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const pieColors = ['#10b981', '#ef4444', '#f59e0b'];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Análise de Sentimento</h2>
          <p className="text-muted-foreground">Analisando dados de feedback...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-opacity-20 border-t-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const total = metrics.overall.positive + metrics.overall.negative + metrics.overall.neutral;
  const positivePercentage = Math.round((metrics.overall.positive / total) * 100);
  const negativePercentage = Math.round((metrics.overall.negative / total) * 100);
  const neutralPercentage = Math.round((metrics.overall.neutral / total) * 100);

  const pieData = [
    { name: 'Positivo', value: metrics.overall.positive, color: '#10b981' },
    { name: 'Negativo', value: metrics.overall.negative, color: '#ef4444' },
    { name: 'Neutro', value: metrics.overall.neutral, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Análise de Sentimento</h2>
        <p className="text-muted-foreground">Insights sobre satisfação dos clientes e pontos de melhoria</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sentimento Positivo</p>
                <p className="text-2xl font-bold text-green-600">{positivePercentage}%</p>
              </div>
              <Smile className="h-8 w-8 text-green-500" />
            </div>
            <Progress value={positivePercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sentimento Negativo</p>
                <p className="text-2xl font-bold text-red-600">{negativePercentage}%</p>
              </div>
              <Frown className="h-8 w-8 text-red-500" />
            </div>
            <Progress value={negativePercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sentimento Neutro</p>
                <p className="text-2xl font-bold text-yellow-600">{neutralPercentage}%</p>
              </div>
              <Meh className="h-8 w-8 text-yellow-500" />
            </div>
            <Progress value={neutralPercentage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="painpoints">Pontos de Dor</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Sentimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Recentes</CardTitle>
                <CardDescription>Últimas análises de sentimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {feedbackData.slice(0, 5).map((feedback) => (
                    <div key={feedback.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      {getSentimentIcon(feedback.sentiment)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{feedback.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {feedback.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Confiança: {Math.round(feedback.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendências de Sentimento (7 dias)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={metrics.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={metrics.categories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sentiment" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="painpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pontos de Dor Identificados</CardTitle>
              <CardDescription>Principais problemas reportados pelos clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.painPoints.map((painPoint, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`h-5 w-5 ${
                        painPoint.severity === 'high' ? 'text-red-500' : 
                        painPoint.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                      <div>
                        <p className="font-medium">{painPoint.issue}</p>
                        <p className="text-sm text-muted-foreground">
                          Frequência: {painPoint.frequency} ocorrências
                        </p>
                      </div>
                    </div>
                    <Badge variant={
                      painPoint.severity === 'high' ? 'destructive' : 
                      painPoint.severity === 'medium' ? 'default' : 'secondary'
                    }>
                      {painPoint.severity === 'high' ? 'Alta' : 
                       painPoint.severity === 'medium' ? 'Média' : 'Baixa'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SentimentDashboard;
