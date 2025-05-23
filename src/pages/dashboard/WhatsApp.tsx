
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
  MessageCircle
} from 'lucide-react';
import MessageComposer from '@/components/whatsapp/MessageComposer';
import ConversationList from '@/components/whatsapp/ConversationList';
import MessageBubble from '@/components/whatsapp/MessageBubble';
import { messagesApi, contactsApi } from '@/services/mockApi';
import { mockContacts, mockMessages } from '@/data/mockData';
import { toast } from 'sonner';

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
  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !selectedContact) return;
    
    try {
      const sentMessage = await messagesApi.send(selectedContact, newMessage);
      setMessages([...messages, sentMessage]);
      setNewMessage('');
      
      // Update contact's last message
      setContacts(contacts.map(contact => 
        contact.id === selectedContact 
          ? { ...contact, lastMessage: newMessage, lastMessageTime: 'Agora', unreadCount: 0 }
          : contact
      ));
      
      toast.success('Mensagem enviada!');
    } catch (error) {
      toast.error('Erro ao enviar mensagem');
    }
  };

  const handleSelectConversation = async (contactId: string) => {
    setSelectedContact(contactId);
    
    // Mark messages as read
    try {
      await messagesApi.markAsRead(contactId);
      setContacts(contacts.map(contact => 
        contact.id === contactId ? { ...contact, unreadCount: 0 } : contact
      ));
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Convert contacts to conversation format
  const conversations = filteredContacts.map(contact => ({
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    lastMessage: contact.lastMessage || 'Nenhuma mensagem ainda',
    time: contact.lastMessageTime || '',
    unread: contact.unreadCount,
    online: contact.online,
    tag: contact.tag
  }));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">WhatsApp</h1>
        <p className="text-muted-foreground">Gerencie suas conversas do WhatsApp</p>
      </div>

      <Tabs defaultValue="conversations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="conversations">Conversas</TabsTrigger>
          <TabsTrigger value="compose">Enviar Mensagem</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conversations" className="mt-4">
          <div className="h-[calc(100vh-12rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
              {/* Conversations sidebar */}
              <div className="lg:col-span-1 h-full">
                <ConversationList
                  conversations={conversations}
                  selectedId={selectedContact}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onSelectConversation={handleSelectConversation}
                />
              </div>
              
              {/* Chat area */}
              <div className="lg:col-span-2 xl:col-span-3 h-full">
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
                          <Button variant="ghost" size="icon" className="hidden sm:flex">
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
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-accent/20">
                      {contactMessages.map((message) => (
                        <MessageBubble
                          key={message.id}
                          id={message.id}
                          text={message.text}
                          time={message.time}
                          sender={message.sender}
                          status={message.status}
                          contactName={message.sender === 'contact' ? contactData?.name : undefined}
                        />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Message input */}
                    <div className="p-3 border-t">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="hidden sm:flex">
                          <SmilePlus size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="hidden sm:flex">
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
        </TabsContent>

        <TabsContent value="compose" className="mt-4">
          <div className="max-w-2xl mx-auto">
            <MessageComposer />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsApp;
