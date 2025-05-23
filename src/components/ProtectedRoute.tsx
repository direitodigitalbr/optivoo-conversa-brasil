
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading spinner or skeleton
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Routes that require authentication
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Routes that should not be accessible when authenticated (like login)
  if (!requireAuth && isAuthenticated) {
    if (user && !user.onboardingCompleted) {
      return <Navigate to="/onboarding/sector" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // If onboarding is needed, redirect to onboarding
  if (requireAuth && isAuthenticated && user && !user.onboardingCompleted && 
      !location.pathname.startsWith('/onboarding')) {
    return <Navigate to="/onboarding/sector" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
