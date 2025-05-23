
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

const tones = [
  { id: 'formal', name: 'Formal', description: 'Linguagem profissional e distinta' },
  { id: 'casual', name: 'Casual', description: 'Amigável mas ainda profissional' },
  { id: 'friendly', name: 'Amigável', description: 'Conversacional e próximo' },
  { id: 'enthusiastic', name: 'Entusiástico', description: 'Energético e motivador' }
];

const ToneSelection = () => {
  const { setToneOfVoice } = useApp();
  const navigate = useNavigate();
  const [selectedTone, setSelectedTone] = useState('');
  
  const handleContinue = () => {
    setToneOfVoice(selectedTone);
    navigate('/onboarding/hours');
  };

  const handleBack = () => {
    navigate('/onboarding/sector');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent to-background p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Tom de voz</CardTitle>
            <CardDescription>
              Como você prefere que seu negócio se comunique com os clientes?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tones.map((tone) => (
                <div 
                  key={tone.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTone === tone.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTone(tone.id)}
                >
                  <h3 className="font-medium">{tone.name}</h3>
                  <p className="text-sm text-muted-foreground">{tone.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Passo 2 de 4
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
                  disabled={!selectedTone}
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
              <div className="h-1 w-1 rounded-full bg-border"></div>
              <div className="h-1 w-1 rounded-full bg-border"></div>
            </div>
            <div className="text-xs text-muted-foreground">
              Este tom será usado nos modelos de mensagem e pela IA.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ToneSelection;
