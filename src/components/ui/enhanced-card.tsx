
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
  glassmorphism?: 'none' | 'subtle' | 'medium' | 'strong';
  animation?: 'none' | 'bounce' | 'slide' | 'fade' | 'float';
  glowOnHover?: boolean;
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
    glassmorphism = 'medium',
    animation = 'fade',
    glowOnHover = false,
    children, 
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }, []);

    const getGlassMorphismClass = () => {
      switch (glassmorphism) {
        case 'subtle':
          return 'glass-subtle';
        case 'strong':
          return 'glass-strong';
        case 'medium':
          return 'glass';
        default:
          return '';
      }
    };

    const getAnimationClass = () => {
      if (!isVisible) return 'opacity-0';
      
      switch (animation) {
        case 'bounce':
          return 'bounce-in';
        case 'slide':
          return 'slide-up';
        case 'fade':
          return 'fade-in-up';
        case 'float':
          return 'floating';
        default:
          return 'opacity-100';
      }
    };

    return (
      <Card
        ref={ref}
        className={cn(
          'transition-all duration-500 ease-out transform-gpu touch-target',
          hover && 'hover-lift cursor-pointer',
          interactive && 'hover:bg-accent/20 active:scale-[0.98]',
          gradient && !glassmorphism && 'gradient-accent',
          glassmorphism !== 'none' && getGlassMorphismClass(),
          glowOnHover && 'hover-glow',
          loading && 'animate-pulse',
          getAnimationClass(),
          'border-0 shadow-lg',
          className
        )}
        style={{
          backdropFilter: glassmorphism !== 'none' ? 'var(--glass-backdrop)' : undefined,
          WebkitBackdropFilter: glassmorphism !== 'none' ? 'var(--glass-backdrop)' : undefined,
        }}
        {...props}
      >
        {(title || description || badge || actions) && (
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 p-4 sm:p-6">
            <div className="space-y-1 flex-1 min-w-0">
              {title && (
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className={cn(
                    "text-base sm:text-lg font-semibold truncate",
                    glassmorphism !== 'none' && "text-foreground/90"
                  )}>
                    {title}
                  </CardTitle>
                  {badge && (
                    <Badge 
                      variant={badge.variant || 'default'} 
                      className={cn(
                        "text-xs shrink-0 touch-target",
                        glassmorphism !== 'none' && "glass-subtle"
                      )}
                    >
                      {badge.text}
                    </Badge>
                  )}
                </div>
              )}
              {description && (
                <CardDescription className={cn(
                  "text-sm leading-relaxed",
                  glassmorphism !== 'none' && "text-foreground/70"
                )}>
                  {description}
                </CardDescription>
              )}
            </div>
            
            {actions && actions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "h-8 w-8 shrink-0 touch-target touch-feedback ml-2",
                      glassmorphism !== 'none' && "glass-subtle hover:glass-strong"
                    )}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className={cn(
                    "min-w-[160px]",
                    glassmorphism !== 'none' && "glass-strong border-white/20"
                  )}
                >
                  {actions.map((action, index) => (
                    <DropdownMenuItem 
                      key={index} 
                      onClick={action.onClick}
                      className="touch-target touch-feedback cursor-pointer"
                    >
                      {action.icon && <span className="mr-2 shrink-0">{action.icon}</span>}
                      <span className="truncate">{action.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </CardHeader>
        )}
        
        <CardContent className={cn(
          "p-4 sm:p-6 pt-0",
          loading && 'space-y-3'
        )}>
          {loading ? (
            <>
              <div className="h-4 rounded animate-pulse shimmer" />
              <div className="h-4 rounded animate-pulse shimmer w-3/4" />
              <div className="h-4 rounded animate-pulse shimmer w-1/2" />
            </>
          ) : (
            <div className="space-y-4">
              {children}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

EnhancedCard.displayName = 'EnhancedCard';

export { EnhancedCard };
