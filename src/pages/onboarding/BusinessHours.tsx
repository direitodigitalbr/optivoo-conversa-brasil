
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
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
  ArrowRight,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const BusinessHours = () => {
  const { businessHours, setBusinessHours } = useApp();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(businessHours.start);
  const [endTime, setEndTime] = useState(businessHours.end);
  
  const handleContinue = () => {
    setBusinessHours({ start: startTime, end: endTime });
    navigate('/onboarding/support');
  };

  const handleBack = () => {
    navigate('/onboarding/tone');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent to-background p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Horário de funcionamento</CardTitle>
            <CardDescription>
              Em quais horários sua empresa está disponível para atendimento?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Horário de início</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">Horário de término</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-medium text-sm mb-2">Por que isso é importante?</h3>
                <p className="text-sm text-muted-foreground">
                  Seus horários de funcionamento ajudam a configurar respostas automáticas
                  fora do expediente e gerenciar as expectativas dos clientes sobre quando
                  receberão uma resposta.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Passo 3 de 4
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
                  onClick={handleContinue}
                  className="gap-2"
                >
                  Continuar
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              <div className="h-1 w-1 rounded-full bg-primary"></div>
              <div className="h-1 w-1 rounded-full bg-border"></div>
            </div>
            <div className="text-xs text-muted-foreground">
              Você poderá ajustar esses horários posteriormente nas configurações.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BusinessHours;
