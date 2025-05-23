
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
}

const MetricCard = ({ title, value, subtitle, icon: Icon, trend, className }: MetricCardProps) => {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {Icon && (
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
        {trend && (
          <p className={cn(
            "text-xs mt-1 flex items-center gap-1",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            <span>{trend.isPositive ? "↗" : "↘"}</span>
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
