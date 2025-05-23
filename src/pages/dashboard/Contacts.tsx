
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import ContactCard from '@/components/contacts/ContactCard';
import { contactsApi } from '@/services/mockApi';
import { Contact } from '@/data/mockData';

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    // Filter contacts based on search term
    if (searchTerm.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [contacts, searchTerm]);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const data = await contactsApi.getAll();
      setContacts(data);
    } catch (error) {
      toast.error('Erro ao carregar contatos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCall = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      toast.info(`Iniciando chamada para ${contact.name}`);
      // Here you would integrate with a calling service
    }
  };

  const handleMessage = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      toast.info(`Abrindo conversa com ${contact.name}`);
      // Here you would navigate to WhatsApp page with the contact selected
    }
  };

  const handleEdit = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      toast.info(`Editando contato: ${contact.name}`);
      // Here you would open an edit modal or navigate to edit page
    }
  };

  const handleDelete = async (contactId: string) => {
    try {
      await contactsApi.delete(contactId);
      setContacts(contacts.filter(c => c.id !== contactId));
      toast.success('Contato excluído com sucesso');
    } catch (error) {
      toast.error('Erro ao excluir contato');
    }
  };

  const getTagCounts = () => {
    const hot = contacts.filter(c => c.tag === 'hot').length;
    const warm = contacts.filter(c => c.tag === 'warm').length;
    const cold = contacts.filter(c => c.tag === 'cold').length;
    return { hot, warm, cold };
  };

  const tagCounts = getTagCounts();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Contatos</h1>
          <p className="text-muted-foreground">Gerencie todos seus contatos</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-opacity-20 border-t-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Contatos</h1>
          <p className="text-muted-foreground">Gerencie todos seus contatos ({contacts.length} total)</p>
        </div>
        
        <Button className="sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Novo Contato
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{tagCounts.hot}</div>
            <p className="text-xs text-muted-foreground">Leads Quentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{tagCounts.warm}</div>
            <p className="text-xs text-muted-foreground">Leads Mornos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{tagCounts.cold}</div>
            <p className="text-xs text-muted-foreground">Leads Frios</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{contacts.length}</div>
            <p className="text-xs text-muted-foreground">Total de Contatos</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pesquisar Contatos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar por nome, telefone, email ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            id={contact.id}
            name={contact.name}
            phone={contact.phone}
            email={contact.email}
            company={contact.company}
            tag={contact.tag}
            lastMessage={contact.lastMessage}
            lastMessageTime={contact.lastMessageTime}
            unreadCount={contact.unreadCount}
            onCall={handleCall}
            onMessage={handleMessage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum contato encontrado</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {searchTerm 
                ? 'Tente ajustar sua pesquisa ou limpar os filtros' 
                : 'Comece adicionando seu primeiro contato'
              }
            </p>
            {!searchTerm && (
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Primeiro Contato
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Contacts;
