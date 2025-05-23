
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { 
  PlusCircle, 
  Search, 
  MoreVertical, 
  UserPlus, 
  Filter,
  Flame,
  Snowflake
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for initial contacts
const mockContacts = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria@exemplo.com',
    phone: '11 99999-9999',
    status: 'active',
    tag: 'hot'
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao@exemplo.com',
    phone: '11 88888-8888',
    status: 'active',
    tag: 'warm'
  },
  {
    id: '3',
    name: 'Ana Pereira',
    email: 'ana@exemplo.com',
    phone: '11 77777-7777',
    status: 'inactive',
    tag: 'cold'
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    email: 'carlos@exemplo.com',
    phone: '11 66666-6666',
    status: 'active',
    tag: 'hot'
  },
  {
    id: '5',
    name: 'Mariana Costa',
    email: 'mariana@exemplo.com',
    phone: '11 55555-5555',
    status: 'active',
    tag: 'cold'
  }
];

const tagLabels: Record<string, { label: string, icon: React.ElementType }> = {
  hot: { label: 'Quente', icon: Flame },
  warm: { label: 'Morno', icon: Flame },
  cold: { label: 'Frio', icon: Snowflake }
};

const Contacts = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    tag: 'warm'
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddContact = () => {
    const contact = {
      id: (contacts.length + 1).toString(),
      ...newContact,
      status: 'active'
    };
    
    setContacts([...contacts, contact]);
    setNewContact({ name: '', email: '', phone: '', tag: 'warm' });
    setIsAddDialogOpen(false);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contatos</h1>
          <p className="text-muted-foreground">Gerencie seus contatos e leads</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus size={16} />
              Adicionar Contato
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar novo contato</DialogTitle>
              <DialogDescription>
                Preencha as informações do novo contato abaixo.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Qualificação</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={newContact.tag === 'hot' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setNewContact({...newContact, tag: 'hot'})}
                  >
                    <Flame size={16} className="mr-1" /> Quente
                  </Button>
                  <Button
                    type="button"
                    variant={newContact.tag === 'warm' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setNewContact({...newContact, tag: 'warm'})}
                  >
                    <Flame size={16} className="mr-1" /> Morno
                  </Button>
                  <Button
                    type="button"
                    variant={newContact.tag === 'cold' ? 'default' : 'outline'}
                    className="flex-1"
                    onClick={() => setNewContact({...newContact, tag: 'cold'})}
                  >
                    <Snowflake size={16} className="mr-1" /> Frio
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleAddContact}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de contatos</CardTitle>
          <CardDescription>
            Total de {contacts.length} contatos, {filteredContacts.length} exibidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou telefone"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Filtrar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setStatusFilter('all')}
                  className={statusFilter === 'all' ? 'bg-accent text-accent-foreground' : ''}
                >
                  Todos
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setStatusFilter('active')}
                  className={statusFilter === 'active' ? 'bg-accent text-accent-foreground' : ''}
                >
                  Ativos
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setStatusFilter('inactive')}
                  className={statusFilter === 'inactive' ? 'bg-accent text-accent-foreground' : ''}
                >
                  Inativos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`bg-tag-${contact.tag}/10 text-tag-${contact.tag} border-tag-${contact.tag}/20 flex w-fit gap-1 items-center`}
                        >
                          {contact.tag === 'hot' || contact.tag === 'warm' ? (
                            <Flame size={12} />
                          ) : (
                            <Snowflake size={12} />
                          )}
                          {tagLabels[contact.tag]?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={contact.status === 'active' ? 'default' : 'secondary'}
                          className="w-fit"
                        >
                          {contact.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Nenhum contato encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
