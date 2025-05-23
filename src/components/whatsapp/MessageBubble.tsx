
import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  id: string;
  text: string;
  time: string;
  sender: 'user' | 'contact';
  status?: 'sent' | 'delivered' | 'read';
  contactName?: string;
  className?: string;
}

const MessageBubble = ({
  id,
  text,
  time,
  sender,
  status = 'delivered',
  contactName,
  className
}: MessageBubbleProps) => {
  const isOutgoing = sender === 'user';
  
  const getStatusIcon = () => {
    if (!isOutgoing) return null;
    
    switch (status) {
      case 'sent':
        return <Check size={12} className="text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck size={12} className="text-muted-foreground" />;
      case 'read':
        return <CheckCheck size={12} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={cn(
        "flex mb-3",
        isOutgoing ? "justify-end" : "justify-start",
        className
      )}
    >
      <div 
        className={cn(
          "message-bubble max-w-[80%] break-words p-3 rounded-lg",
          isOutgoing ? "outgoing-message" : "incoming-message"
        )}
      >
        {!isOutgoing && contactName && (
          <p className="text-xs font-medium text-primary mb-1">
            {contactName}
          </p>
        )}
        
        <p className="text-sm leading-relaxed">{text}</p>
        
        <div className={cn(
          "flex items-center justify-end gap-1 mt-1",
          isOutgoing ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          <span className="text-xs">{time}</span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
