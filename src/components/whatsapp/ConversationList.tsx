
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  tag?: 'hot' | 'warm' | 'cold';
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSelectConversation: (id: string) => void;
  className?: string;
}

const ConversationList = ({
  conversations,
  selectedId,
  searchTerm,
  onSearchChange,
  onSelectConversation,
  className
}: ConversationListProps) => {
  const getTagLabel = (tag?: string) => {
    switch (tag) {
      case 'hot': return 'Quente';
      case 'warm': return 'Morno';
      case 'cold': return 'Frio';
      default: return '';
    }
  };

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Conversas</CardTitle>
      </CardHeader>
      
      <div className="px-4 pb-2">
        <Input
          placeholder="Buscar contato"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="mb-2"
        />
      </div>
      
      <CardContent className="flex-1 overflow-y-auto p-0">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "p-3 cursor-pointer hover:bg-muted flex justify-between transition-colors",
                selectedId === conversation.id && "bg-muted"
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex gap-3 items-center min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                    {conversation.name.slice(0, 2).toUpperCase()}
                  </div>
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                  )}
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm truncate">{conversation.name}</p>
                    {conversation.tag && (
                      <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                        {getTagLabel(conversation.tag)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground flex flex-col items-end flex-shrink-0">
                <span>{conversation.time}</span>
                {conversation.unread > 0 && (
                  <Badge className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center mt-1 text-xs">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
          
          {conversations.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              Nenhuma conversa encontrada
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationList;
