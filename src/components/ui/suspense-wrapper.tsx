
import React, { Suspense } from 'react';
import { LoadingSkeleton } from './loading-skeleton';
import { ErrorBoundary } from './error-boundary';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  variant?: 'card' | 'text' | 'avatar' | 'button';
  lines?: number;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ 
  children, 
  fallback, 
  variant = 'card',
  lines = 3 
}) => {
  const defaultFallback = <LoadingSkeleton variant={variant} lines={lines} />;

  return (
    <ErrorBoundary>
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export { SuspenseWrapper };
