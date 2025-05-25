
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  glassmorphism?: boolean;
  animateValue?: boolean;
}

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  className,
  glassmorphism = true,
  animateValue = true
}: MetricCardProps) => {
  const [displayValue, setDisplayValue] = useState(animateValue ? 0 : value);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animateValue && typeof value === 'number' && isVisible) {
      const duration = 1000;
      const steps = 30;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, animateValue, isVisible]);

  return (
    <Card className={cn(
      "transition-all duration-500 ease-out transform-gpu hover-lift touch-target",
      glassmorphism && "glass border-white/10 shadow-xl",
      !isVisible && "opacity-0 translate-y-8",
      isVisible && "opacity-100 translate-y-0 fade-in-up",
      className
    )}>
      <CardHeader className="pb-3 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <CardTitle className={cn(
            "text-sm font-medium leading-none tracking-tight",
            glassmorphism ? "text-foreground/80" : "text-muted-foreground"
          )}>
            {title}
          </CardTitle>
          {Icon && (
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
              glassmorphism 
                ? "glass-subtle hover:glass-strong hover:scale-110" 
                : "bg-primary/10 hover:bg-primary/20"
            )}>
              <Icon className={cn(
                "h-4 w-4 transition-colors duration-300",
                glassmorphism ? "text-primary" : "text-primary"
              )} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-4 sm:p-6">
        <div className={cn(
          "text-2xl sm:text-3xl font-bold transition-all duration-500",
          glassmorphism && "text-foreground/90"
        )}>
          {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
        </div>
        {subtitle && (
          <p className={cn(
            "text-xs mt-2 leading-relaxed",
            glassmorphism ? "text-foreground/60" : "text-muted-foreground"
          )}>
            {subtitle}
          </p>
        )}
        {trend && (
          <div className={cn(
            "flex items-center gap-2 mt-3 p-2 rounded-lg transition-all duration-300",
            glassmorphism && "glass-subtle",
            trend.isPositive 
              ? "text-green-600 dark:text-green-400" 
              : "text-red-600 dark:text-red-400"
          )}>
            <span className="text-base font-medium">
              {trend.isPositive ? "↗" : "↘"}
            </span>
            <span className="text-xs font-medium">{trend.value}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
