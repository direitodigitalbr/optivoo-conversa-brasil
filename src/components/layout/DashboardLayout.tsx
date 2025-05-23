
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  const { sidebarOpen } = useApp();

  useEffect(() => {
    // Set document title
    document.title = 'Dashboard | Optivoo CRM';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main 
        className={cn(
          "pt-16 min-h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <div className="container px-4 py-6 mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
