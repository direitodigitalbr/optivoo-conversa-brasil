
import { Phone, Mail, MessageCircle, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ContactCardProps {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  tag?: 'hot' | 'warm' | 'cold';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  avatar?: string;
  onCall?: (id: string) => void;
  onMessage?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const ContactCard = ({
  id,
  name,
  phone,
  email,
  company,
  tag,
  lastMessage,
  lastMessageTime,
  unreadCount = 0,
  avatar,
  onCall,
  onMessage,
  onEdit,
  onDelete,
  className
}: ContactCardProps) => {
  const getTagColor = (tag?: string) => {
    switch (tag) {
      case 'hot': return 'bg-red-500 text-white';
      case 'warm': return 'bg-yellow-500 text-white';
      case 'cold': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTagLabel = (tag?: string) => {
    switch (tag) {
      case 'hot': return 'Quente';
      case 'warm': return 'Morno';
      case 'cold': return 'Frio';
      default: return 'Novo';
    }
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt={name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                  {name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm truncate">{name}</h3>
                {tag && (
                  <Badge className={`text-xs px-2 py-0 h-5 ${getTagColor(tag)}`}>
                    {getTagLabel(tag)}
                  </Badge>
                )}
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs px-1.5 py-0 h-5 min-w-[20px] rounded-full">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Phone size={12} />
                  {phone}
                </p>
                {email && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Mail size={12} />
                    <span className="truncate">{email}</span>
                  </p>
                )}
                {company && (
                  <p className="text-xs text-muted-foreground truncate">
                    {company}
                  </p>
                )}
              </div>
              
              {lastMessage && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-xs text-muted-foreground truncate mb-1">
                    {lastMessage}
                  </p>
                  {lastMessageTime && (
                    <p className="text-xs text-muted-foreground">
                      {lastMessageTime}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            {onCall && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onCall(id)}
              >
                <Phone size={14} />
              </Button>
            )}
            {onMessage && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onMessage(id)}
              >
                <MessageCircle size={14} />
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(id)}>
                    Editar contato
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => onMessage && onMessage(id)}>
                  Enviar mensagem
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCall && onCall(id)}>
                  Fazer chamada
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {onDelete && (
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => onDelete(id)}
                  >
                    Excluir contato
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
