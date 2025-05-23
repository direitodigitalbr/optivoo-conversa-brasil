
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'avatar' | 'button';
  lines?: number;
}

const LoadingSkeleton = ({ className, variant = 'text', lines = 1 }: LoadingSkeletonProps) => {
  if (variant === 'card') {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-muted"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded"></div>
            <div className="h-3 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div className={cn("h-10 w-10 rounded-full bg-muted animate-pulse", className)}></div>
    );
  }

  if (variant === 'button') {
    return (
      <div className={cn("h-10 bg-muted rounded-md animate-pulse", className)}></div>
    );
  }

  return (
    <div className={cn("animate-pulse space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={cn(
            "h-4 bg-muted rounded",
            i === lines - 1 && lines > 1 && "w-5/6"
          )}
        ></div>
      ))}
    </div>
  );
};

export { LoadingSkeleton };
