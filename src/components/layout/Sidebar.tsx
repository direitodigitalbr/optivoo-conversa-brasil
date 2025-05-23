
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, MessageCircle, FileText, Calendar, Bot, 
  Settings, Menu, X 
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Contatos', href: '/dashboard/contacts', icon: Users },
    { name: 'WhatsApp', href: '/dashboard/whatsapp', icon: MessageCircle },
    { name: 'Propostas', href: '/dashboard/proposals', icon: FileText },
    { name: 'Agenda', href: '/dashboard/calendar', icon: Calendar },
    { name: 'Assistente IA', href: '/dashboard/ai-assistant', icon: Bot },
    { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-40 h-full bg-sidebar transition-all duration-300 ease-in-out border-r",
        // Desktop behavior
        "lg:translate-x-0",
        // Mobile behavior
        sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
        // Desktop width changes
        "lg:w-64 lg:block",
        !sidebarOpen && "lg:w-16"
      )}>
        <div className="flex items-center justify-between h-16 px-4">
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <div className={cn(
              "text-lg font-semibold text-primary transition-opacity duration-200",
              !sidebarOpen && "lg:opacity-0 lg:hidden"
            )}>
              Optivoo CRM
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="p-1 lg:flex"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <nav className="mt-4">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Button
                  variant={location.pathname.startsWith(item.href) ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start mb-1 relative transition-all duration-200",
                    sidebarOpen || window.innerWidth >= 1024 ? "px-3" : "px-2 lg:justify-center"
                  )}
                  onClick={() => {
                    navigate(item.href);
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  <item.icon size={20} className={(!sidebarOpen && window.innerWidth >= 1024) ? 'mx-auto' : 'mr-2 flex-shrink-0'} />
                  <span className={cn(
                    "transition-opacity duration-200",
                    (!sidebarOpen && window.innerWidth >= 1024) ? "lg:opacity-0 lg:absolute lg:left-12 lg:bg-sidebar lg:px-2 lg:py-1 lg:rounded lg:shadow-lg lg:border lg:text-sm lg:whitespace-nowrap lg:z-50" : ""
                  )}>
                    {item.name}
                  </span>
                  {!sidebarOpen && window.innerWidth >= 1024 && (
                    <span className="sr-only">{item.name}</span>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
