
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  actions?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
  hover?: boolean;
  loading?: boolean;
  interactive?: boolean;
  gradient?: boolean;
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ 
    className, 
    title, 
    description, 
    badge, 
    actions, 
    hover = true, 
    loading = false, 
    interactive = false,
    gradient = false,
    children, 
    ...props 
  }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'transition-all duration-200',
          hover && 'hover:shadow-lg hover:-translate-y-1',
          interactive && 'cursor-pointer hover:bg-accent/50',
          gradient && 'bg-gradient-to-br from-background via-background to-accent/20',
          loading && 'animate-pulse',
          className
        )}
        {...props}
      >
        {(title || description || badge || actions) && (
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1 flex-1">
              {title && (
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{title}</CardTitle>
                  {badge && (
                    <Badge variant={badge.variant || 'default'} className="text-xs">
                      {badge.text}
                    </Badge>
                  )}
                </div>
              )}
              {description && (
                <CardDescription>{description}</CardDescription>
              )}
            </div>
            
            {actions && actions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actions.map((action, index) => (
                    <DropdownMenuItem key={index} onClick={action.onClick}>
                      {action.icon && <span className="mr-2">{action.icon}</span>}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </CardHeader>
        )}
        
        <CardContent className={loading ? 'space-y-3' : ''}>
          {loading ? (
            <>
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
            </>
          ) : (
            children
          )}
        </CardContent>
      </Card>
    );
  }
);

EnhancedCard.displayName = 'EnhancedCard';

export { EnhancedCard };
