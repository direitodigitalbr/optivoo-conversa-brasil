
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  const { sidebarOpen } = useApp();

  useEffect(() => {
    document.title = 'Dashboard | Optivoo CRM';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main 
        className={cn(
          "pt-16 min-h-screen transition-all duration-300 ease-in-out",
          // Mobile: always full width with padding
          "px-4 lg:px-0",
          // Desktop: adjust margin based on sidebar state
          "lg:ml-16",
          sidebarOpen && "lg:ml-64"
        )}
      >
        <div className="container mx-auto py-4 lg:py-6 lg:px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
