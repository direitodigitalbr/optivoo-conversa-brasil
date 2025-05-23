
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
  ArrowRight,
} from 'lucide-react';

const sectors = [
  { id: 'healthcare', name: 'Saúde', description: 'Clínicas, hospitais, farmácias' },
  { id: 'retail', name: 'Varejo', description: 'Lojas físicas e e-commerce' },
  { id: 'food', name: 'Alimentação', description: 'Restaurantes, bares, delivery' },
  { id: 'services', name: 'Serviços', description: 'Consultoria, financeiro, jurídico' },
  { id: 'education', name: 'Educação', description: 'Escolas, cursos, treinamentos' },
  { id: 'technology', name: 'Tecnologia', description: 'Software, hardware, TI' },
  { id: 'real-estate', name: 'Imobiliário', description: 'Imóveis, construção' },
  { id: 'other', name: 'Outro', description: 'Outro tipo de negócio' }
];

const SectorSelection = () => {
  const { setSector } = useApp();
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState('');
  
  const handleContinue = () => {
    setSector(selectedSector);
    navigate('/onboarding/tone');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-accent to-background p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Bem-vindo ao Optivoo CRM</CardTitle>
            <CardDescription>
              Primeiro, nos diga em qual setor sua empresa atua.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sectors.map((sector) => (
                <div 
                  key={sector.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSector === sector.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedSector(sector.id)}
                >
                  <h3 className="font-medium">{sector.name}</h3>
                  <p className="text-sm text-muted-foreground">{sector.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Passo 1 de 4
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleContinue}
                  disabled={!selectedSector}
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
              <div className="h-1 w-1 rounded-full bg-border"></div>
              <div className="h-1 w-1 rounded-full bg-border"></div>
              <div className="h-1 w-1 rounded-full bg-border"></div>
            </div>
            <div className="text-xs text-muted-foreground">
              Suas informações serão usadas para personalizar o sistema.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SectorSelection;
