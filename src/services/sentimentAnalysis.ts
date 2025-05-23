
import { Contact } from '@/data/mockData';

export interface SentimentData {
  id: string;
  contactId: string;
  message: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  timestamp: string;
  category: 'support' | 'sales' | 'feedback' | 'complaint';
}

export interface SentimentMetrics {
  overall: {
    positive: number;
    negative: number;
    neutral: number;
  };
  trends: {
    date: string;
    positive: number;
    negative: number;
    neutral: number;
  }[];
  categories: {
    category: string;
    sentiment: number;
    count: number;
  }[];
  painPoints: {
    issue: string;
    frequency: number;
    severity: 'high' | 'medium' | 'low';
  }[];
}

// Mock sentiment analysis function (simulates AI analysis)
export const analyzeSentiment = (text: string): { sentiment: 'positive' | 'negative' | 'neutral'; confidence: number } => {
  const positiveWords = ['ótimo', 'excelente', 'obrigado', 'perfeito', 'adorei', 'recomendo', 'satisfeito'];
  const negativeWords = ['ruim', 'péssimo', 'problema', 'erro', 'insatisfeito', 'cancelar', 'reclamação'];
  
  const words = text.toLowerCase().split(' ');
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pos => word.includes(pos))) score += 1;
    if (negativeWords.some(neg => word.includes(neg))) score -= 1;
  });
  
  let sentiment: 'positive' | 'negative' | 'neutral';
  let confidence: number;
  
  if (score > 0) {
    sentiment = 'positive';
    confidence = Math.min(0.6 + (score * 0.1), 0.95);
  } else if (score < 0) {
    sentiment = 'negative';
    confidence = Math.min(0.6 + (Math.abs(score) * 0.1), 0.95);
  } else {
    sentiment = 'neutral';
    confidence = 0.5 + Math.random() * 0.2;
  }
  
  return { sentiment, confidence };
};

// Mock feedback data for sentiment analysis
export const mockFeedbackData: SentimentData[] = [
  {
    id: '1',
    contactId: '1',
    message: 'Excelente atendimento! Muito satisfeito com o serviço.',
    sentiment: 'positive',
    confidence: 0.89,
    timestamp: '2024-01-20T10:30:00Z',
    category: 'support'
  },
  {
    id: '2',
    contactId: '2',
    message: 'Tive alguns problemas com o sistema, mas foi resolvido rapidamente.',
    sentiment: 'neutral',
    confidence: 0.67,
    timestamp: '2024-01-19T14:20:00Z',
    category: 'support'
  },
  {
    id: '3',
    contactId: '3',
    message: 'Péssima experiência. O produto não funcionou como esperado.',
    sentiment: 'negative',
    confidence: 0.92,
    timestamp: '2024-01-18T16:45:00Z',
    category: 'complaint'
  },
  {
    id: '4',
    contactId: '4',
    message: 'Adorei a proposta! Vamos prosseguir com o projeto.',
    sentiment: 'positive',
    confidence: 0.85,
    timestamp: '2024-01-17T11:15:00Z',
    category: 'sales'
  },
  {
    id: '5',
    contactId: '5',
    message: 'Preciso de mais informações sobre os preços.',
    sentiment: 'neutral',
    confidence: 0.55,
    timestamp: '2024-01-16T09:30:00Z',
    category: 'sales'
  }
];

export const sentimentAnalysisApi = {
  async getFeedbackData(): Promise<SentimentData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFeedbackData;
  },

  async getSentimentMetrics(): Promise<SentimentMetrics> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const data = mockFeedbackData;
    const total = data.length;
    
    // Calculate overall sentiment
    const positive = data.filter(d => d.sentiment === 'positive').length;
    const negative = data.filter(d => d.sentiment === 'negative').length;
    const neutral = data.filter(d => d.sentiment === 'neutral').length;
    
    // Generate trend data (last 7 days)
    const trends = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        positive: Math.floor(Math.random() * 10) + 5,
        negative: Math.floor(Math.random() * 5) + 1,
        neutral: Math.floor(Math.random() * 8) + 3
      };
    }).reverse();
    
    // Category analysis
    const categories = [
      { category: 'Suporte', sentiment: 0.7, count: 15 },
      { category: 'Vendas', sentiment: 0.8, count: 12 },
      { category: 'Feedback', sentiment: 0.6, count: 8 },
      { category: 'Reclamações', sentiment: 0.2, count: 5 }
    ];
    
    // Pain points identification
    const painPoints = [
      { issue: 'Tempo de resposta lento', frequency: 8, severity: 'high' as const },
      { issue: 'Interface confusa', frequency: 5, severity: 'medium' as const },
      { issue: 'Falta de informações claras', frequency: 3, severity: 'low' as const }
    ];
    
    return {
      overall: { positive, negative, neutral },
      trends,
      categories,
      painPoints
    };
  },

  async analyzeFeedback(text: string): Promise<SentimentData> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const analysis = analyzeSentiment(text);
    
    return {
      id: Date.now().toString(),
      contactId: '1',
      message: text,
      sentiment: analysis.sentiment,
      confidence: analysis.confidence,
      timestamp: new Date().toISOString(),
      category: 'feedback'
    };
  }
};
