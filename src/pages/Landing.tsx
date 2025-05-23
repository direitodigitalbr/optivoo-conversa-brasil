
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Users, 
  Bot, 
  Zap, 
  Shield, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Play,
  Star
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Integrado',
      description: 'Gerencie todas suas conversas do WhatsApp em um só lugar com automação inteligente.'
    },
    {
      icon: Bot,
      title: 'Assistente IA',
      description: 'IA que responde automaticamente seus clientes e qualifica leads 24/7.'
    },
    {
      icon: Users,
      title: 'CRM Completo',
      description: 'Organize todos seus contatos, histórico e oportunidades de negócio.'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Avançados',
      description: 'Dashboards com métricas em tempo real para acompanhar performance.'
    },
    {
      icon: Zap,
      title: 'Automação',
      description: 'Fluxos automatizados para nurturing e conversão de leads.'
    },
    {
      icon: Shield,
      title: 'Seguro e Confiável',
      description: 'Seus dados protegidos com criptografia de nível empresarial.'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      company: 'Digital Marketing Pro',
      text: 'Aumentei minha conversão em 300% com o Optivoo. A automação do WhatsApp é impressionante!',
      rating: 5
    },
    {
      name: 'João Santos',
      company: 'Consultoria Tech',
      text: 'Finalmente um CRM que entende pequenas empresas. Interface simples e recursos poderosos.',
      rating: 5
    },
    {
      name: 'Ana Costa',
      company: 'E-commerce Plus',
      text: 'O assistente IA responde 80% das dúvidas dos clientes automaticamente. Economizo horas!',
      rating: 5
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: 'R$ 97',
      period: '/mês',
      description: 'Perfeito para começar',
      features: [
        '1.000 mensagens/mês',
        'Até 500 contatos',
        'WhatsApp integrado',
        'CRM básico',
        'Suporte por email'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: 'R$ 197',
      period: '/mês',
      description: 'Ideal para crescer',
      features: [
        '5.000 mensagens/mês',
        'Contatos ilimitados',
        'Assistente IA completo',
        'Automações avançadas',
        'Relatórios detalhados',
        'Suporte prioritário'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'R$ 397',
      period: '/mês',
      description: 'Para grandes volumes',
      features: [
        'Mensagens ilimitadas',
        'Multi-usuários',
        'API personalizada',
        'Integrações customizadas',
        'Gerente de conta dedicado',
        'SLA garantido'
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">Optivoo CRM</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Recursos
              </a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Depoimentos
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Preços
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Começar Grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Novo: Assistente IA ainda mais inteligente
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Transforme seu
            <span className="text-primary"> WhatsApp </span>
            em uma
            <span className="text-primary"> máquina de vendas</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            O CRM mais inteligente do Brasil para pequenas e médias empresas. 
            Automatize conversas, organize leads e venda mais com IA.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/signup')}>
              Começar Grátis por 7 dias
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Demo (2 min)
            </Button>
          </div>
          
          {/* Mock Dashboard Screenshot */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 p-1 rounded-lg">
              <div className="bg-background rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-muted p-4 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 text-sm text-muted-foreground">app.optivoo.com</div>
                  </div>
                </div>
                <div className="h-96 bg-gradient-to-br from-background to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Interface do Dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-accent/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Tudo que você precisa para vender mais
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Recursos poderosos que transformam a forma como você se relaciona com seus clientes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Empresas que já transformaram seus resultados
            </h2>
            <p className="text-xl text-muted-foreground">
              Veja o que nossos clientes estão dizendo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-accent/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Planos que crescem com seu negócio
            </h2>
            <p className="text-xl text-muted-foreground">
              Comece grátis e pague apenas quando escalar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`${plan.highlighted ? 'ring-2 ring-primary shadow-lg scale-105' : ''} hover:shadow-lg transition-all`}>
                {plan.highlighted && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6" 
                    variant={plan.highlighted ? 'default' : 'outline'}
                    onClick={() => navigate('/signup')}
                  >
                    Começar Grátis
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Pronto para transformar seu WhatsApp?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empresas que já automatizaram suas vendas
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => navigate('/signup')}>
              Começar Grátis Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            ✅ Sem cartão de crédito • ✅ Teste grátis por 7 dias • ✅ Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-primary mb-4">Optivoo CRM</h3>
              <p className="text-sm text-muted-foreground">
                O CRM mais inteligente para transformar seu WhatsApp em uma máquina de vendas.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Recursos</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Carreiras</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Optivoo CRM. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
