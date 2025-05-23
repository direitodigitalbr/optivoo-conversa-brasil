
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
    <div className={cn(
      "fixed left-0 top-0 z-40 h-full bg-sidebar transition-all duration-300 ease-in-out border-r",
      sidebarOpen ? "w-64" : "w-16"
    )}>
      <div className="flex items-center justify-between h-16 px-4">
        {sidebarOpen && (
          <div className="text-lg font-semibold text-primary">
            Optivoo CRM
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="p-1"
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
                  "w-full justify-start mb-1 relative",
                  sidebarOpen ? "px-3" : "px-2"
                )}
                onClick={() => navigate(item.href)}
              >
                <item.icon size={20} className={!sidebarOpen ? 'mx-auto' : 'mr-2'} />
                {sidebarOpen && <span>{item.name}</span>}
                {!sidebarOpen && (
                  <span className="sr-only">{item.name}</span>
                )}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
