
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  SendHorizonal, 
  SmilePlus, 
  Paperclip, 
  MoreVertical, 
  Phone,
  Image,
  FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data
const mockContacts = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '11 99999-9999',
    lastMessage: 'Olá, gostaria de saber mais sobre seus serviços.',
    time: '10:45',
    unread: 2,
    online: true,
    tag: 'hot'
  },
  {
    id: '2',
    name: 'João Santos',
    phone: '11 88888-8888',
    lastMessage: 'Quando podemos marcar uma reunião?',
    time: 'Ontem',
    unread: 0,
    online: false,
    tag: 'warm'
  },
  {
    id: '3',
    name: 'Ana Pereira',
    phone: '11 77777-7777',
    lastMessage: 'Obrigado pelo atendimento!',
    time: 'Ontem',
    unread: 0,
    online: false,
    tag: 'cold'
  },
];

const mockMessages = [
  {
    id: '1',
    contactId: '1',
    text: 'Olá, gostaria de saber mais sobre seus serviços.',
    time: '10:30',
    sender: 'contact'
  },
  {
    id: '2',
    contactId: '1',
    text: 'Estou interessada no pacote de marketing digital.',
    time: '10:32',
    sender: 'contact'
  },
  {
    id: '3',
    contactId: '1',
    text: 'Olá Maria! Tudo bem? Agradeço seu interesse em nossos serviços.',
    time: '10:35',
    sender: 'user'
  },
  {
    id: '4',
    contactId: '1',
    text: 'Nosso pacote de marketing digital inclui gestão de redes sociais, SEO e campanhas pagas. Gostaria de receber uma proposta?',
    time: '10:36',
    sender: 'user'
  },
  {
    id: '5',
    contactId: '1',
    text: 'Sim, por favor. Qual seria o valor?',
    time: '10:44',
    sender: 'contact'
  }
];

const WhatsApp = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState(mockContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get messages for selected contact
  const contactMessages = selectedContact 
    ? messages.filter(message => message.contactId === selectedContact)
    : [];
    
  // Get selected contact data
  const contactData = contacts.find(contact => contact.id === selectedContact);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [contactMessages]);
  
  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedContact) return;
    
    const newMsg = {
      id: (messages.length + 1).toString(),
      contactId: selectedContact,
      text: newMessage,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      sender: 'user' as const
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Update contact's last message
    setContacts(contacts.map(contact => 
      contact.id === selectedContact 
        ? { ...contact, lastMessage: newMessage, time: 'Agora', unread: 0 }
        : contact
    ));
  };

  return (
    <div className="h-[calc(100vh-9rem)]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
        {/* Contacts sidebar */}
        <div className="md:col-span-1 h-full">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Conversas</CardTitle>
            </CardHeader>
            <div className="px-4 pb-2">
              <Input
                placeholder="Buscar contato"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
              />
            </div>
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="space-y-1">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-3 cursor-pointer hover:bg-muted flex justify-between ${
                      selectedContact === contact.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => {
                      setSelectedContact(contact.id);
                      // Mark as read when selecting
                      setContacts(contacts.map(c => 
                        c.id === contact.id ? { ...c, unread: 0 } : c
                      ));
                    }}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                          {contact.name.slice(0, 2)}
                        </div>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">{contact.name}</p>
                          {contact.tag && (
                            <Badge variant="outline" className={`
                              text-xs px-1 py-0 h-4 bg-tag-${contact.tag}/10 
                              text-tag-${contact.tag} border-tag-${contact.tag}/20
                            `}>
                              {contact.tag === 'hot' ? 'Quente' : 
                               contact.tag === 'warm' ? 'Morno' : 'Frio'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {contact.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground flex flex-col items-end">
                      <span>{contact.time}</span>
                      {contact.unread > 0 && (
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center mt-1">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                
                {filteredContacts.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">
                    Nenhum contato encontrado
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Chat area */}
        <div className="md:col-span-2 lg:col-span-3 h-full">
          {selectedContact ? (
            <Card className="h-full flex flex-col">
              {/* Chat header */}
              <CardHeader className="border-b p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                        {contactData?.name.slice(0, 2)}
                      </div>
                      {contactData?.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{contactData?.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {contactData?.phone}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone size={18} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Opções</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ver detalhes do contato</DropdownMenuItem>
                        <DropdownMenuItem>Exportar conversa</DropdownMenuItem>
                        <DropdownMenuItem>Marcar tudo como lido</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Apagar conversa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-accent/20">
                {contactMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`message-bubble ${
                        message.sender === 'user' 
                          ? 'outgoing-message' 
                          : 'incoming-message'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 text-right ${
                        message.sender === 'user' 
                          ? 'text-primary-foreground/80' 
                          : 'text-muted-foreground'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message input */}
              <div className="p-3 border-t">
                <Tabs defaultValue="message">
                  <TabsList className="mb-3">
                    <TabsTrigger value="message">Mensagem</TabsTrigger>
                    <TabsTrigger value="template">Template</TabsTrigger>
                    <TabsTrigger value="media">Mídia</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="message" className="m-0">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <SmilePlus size={18} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Paperclip size={18} />
                      </Button>
                      <Input
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendMessage();
                        }}
                        className="flex-1"
                      />
                      <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <SendHorizonal size={18} />
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="template" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="border rounded-md p-3 cursor-pointer hover:bg-accent">
                        <h3 className="font-medium text-sm">Boas-vindas</h3>
                        <p className="text-xs text-muted-foreground truncate">Olá! Obrigado por entrar em contato...</p>
                      </div>
                      <div className="border rounded-md p-3 cursor-pointer hover:bg-accent">
                        <h3 className="font-medium text-sm">Agendamento</h3>
                        <p className="text-xs text-muted-foreground truncate">Podemos agendar uma reunião para...</p>
                      </div>
                      <div className="border rounded-md p-3 cursor-pointer hover:bg-accent">
                        <h3 className="font-medium text-sm">Enviar proposta</h3>
                        <p className="text-xs text-muted-foreground truncate">Conforme conversamos, segue a proposta...</p>
                      </div>
                      <div className="border rounded-md p-3 cursor-pointer hover:bg-accent">
                        <h3 className="font-medium text-sm">Acompanhamento</h3>
                        <p className="text-xs text-muted-foreground truncate">Como está o andamento do projeto?</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="media" className="m-0">
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Image size={16} /> Imagem
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <FileText size={16} /> Documento
                        </Button>
                      </div>
                      <Input 
                        type="file" 
                        className="hidden" 
                        id="media-upload" 
                      />
                      <label 
                        htmlFor="media-upload" 
                        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer"
                      >
                        <p className="text-muted-foreground">
                          Arraste arquivos ou clique para selecionar
                        </p>
                      </label>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center p-6">
              <div className="text-center">
                <div className="bg-primary/10 p-6 rounded-full inline-flex mb-4">
                  <MessageCircle size={40} className="text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Selecione um contato</h2>
                <p className="text-muted-foreground max-w-md">
                  Escolha um contato na lista à esquerda para iniciar ou continuar uma conversa.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;
