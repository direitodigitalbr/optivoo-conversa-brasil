
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  CheckCircle,
} from 'lucide-react';

const supportTypes = [
  { id: 'chat', name: 'Chat', description: 'Apenas mensagens de texto', icon: MessageSquare },
  { id: 'voice', name: 'Voz', description: 'Apenas ligações de voz', icon: Phone },
  { id: 'both', name: 'Ambos', description: 'Chat e ligações de voz', icon: CheckCircle },
];

const SupportType = () => {
  const { setSupportType } = useApp();
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');
  
  const handleComplete = () => {
    setSupportType(selectedType);
    completeOnboarding();
  };

  const handleBack = () => {
    navigate('/onboarding/hours');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent to-background p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Tipo de suporte</CardTitle>
            <CardDescription>
              Como você prefere se comunicar com seus clientes?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supportTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedType === type.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <type.icon size={24} className="mb-2" />
                    <h3 className="font-medium">{type.name}</h3>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Passo 4 de 4
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Voltar
                </Button>
                <Button 
                  onClick={handleComplete}
                  disabled={!selectedType}
                  className="gap-2"
                >
                  Concluir
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              <div className="h-1 w-1 rounded-full bg-primary"></div>
            </div>
            <div className="text-xs text-muted-foreground">
              Você completou todas as etapas de configuração!
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SupportType;
