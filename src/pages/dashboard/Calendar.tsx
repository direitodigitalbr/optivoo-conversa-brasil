
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Mock events
const mockEvents = [
  { id: '1', title: 'Reunião com Maria Silva', date: '2025-05-23', time: '10:00', client: 'Maria Silva', type: 'meeting' },
  { id: '2', title: 'Apresentação de proposta', date: '2025-05-23', time: '14:00', client: 'João Santos', type: 'proposal' },
  { id: '3', title: 'Follow-up cliente', date: '2025-05-24', time: '11:30', client: 'Ana Pereira', type: 'followup' }
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [events] = useState(mockEvents);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    client: '',
    type: 'meeting'
  });
  
  // Format date to YYYY-MM-DD for comparison
  const formatDateForCompare = (date: Date | undefined) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };
  
  // Filter events for selected date
  const eventsForSelectedDate = events.filter(
    event => event.date === formatDateForCompare(date)
  );
  
  const handleCreateEvent = () => {
    toast.success('Evento adicionado ao calendário');
    setIsAddEventOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agenda</h1>
        <p className="text-muted-foreground">Gerencie seus compromissos e reuniões</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Calendário</span>
                <Button size="sm" className="gap-1" onClick={() => setIsAddEventOpen(true)}>
                  <Plus size={16} />
                  Evento
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-3 w-full pointer-events-auto"
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                {date ? date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Eventos do dia'}
              </CardTitle>
              <CardDescription>
                {eventsForSelectedDate.length} eventos programados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventsForSelectedDate.length > 0 ? (
                  eventsForSelectedDate.map(event => (
                    <div 
                      key={event.id}
                      className={`
                        border rounded-lg p-4 
                        ${event.type === 'meeting' ? 'border-l-4 border-l-primary' : 
                          event.type === 'proposal' ? 'border-l-4 border-l-green-500' :
                          'border-l-4 border-l-amber-500'}
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">Cliente: {event.client}</p>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock size={14} className="mr-1" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">Nenhum evento para este dia</h3>
                    <p className="text-muted-foreground mt-2">
                      Clique em "Evento" para adicionar um novo compromisso.
                    </p>
                    <Button
                      className="mt-4 gap-1"
                      onClick={() => setIsAddEventOpen(true)}
                    >
                      <Plus size={16} />
                      Adicionar evento
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar novo evento</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do compromisso
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formatDateForCompare(date)}
                  readOnly
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                value={newEvent.client}
                onChange={(e) => setNewEvent({...newEvent, client: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tipo de evento</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={newEvent.type === 'meeting' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setNewEvent({...newEvent, type: 'meeting'})}
                >
                  Reunião
                </Button>
                <Button
                  type="button"
                  variant={newEvent.type === 'proposal' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setNewEvent({...newEvent, type: 'proposal'})}
                >
                  Proposta
                </Button>
                <Button
                  type="button"
                  variant={newEvent.type === 'followup' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setNewEvent({...newEvent, type: 'followup'})}
                >
                  Follow-up
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleCreateEvent}>Criar evento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
