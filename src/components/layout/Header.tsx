
import { useState } from 'react';
import { Search, Bell, Settings, User, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { sidebarOpen, toggleSidebar } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={cn(
      "fixed top-0 right-0 z-30 bg-background border-b h-16 flex items-center transition-all duration-300 ease-in-out",
      // Mobile: full width
      "left-0 lg:left-16",
      // Desktop: adjust based on sidebar state
      sidebarOpen && "lg:left-64"
    )}>
      <div className="flex items-center justify-between w-full px-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </Button>

        {/* Search - hidden on small screens, visible on md+ */}
        <div className="relative hidden md:block md:w-64 lg:w-80">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Spacer for mobile */}
        <div className="flex-1 md:hidden" />

        <div className="flex items-center gap-2">
          {/* Search button for mobile */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 md:w-80">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="text-sm">
                  <p className="font-medium">Nova mensagem</p>
                  <p className="text-muted-foreground text-xs">Cliente enviou uma mensagem</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="text-sm">
                  <p className="font-medium">Lembrete</p>
                  <p className="text-muted-foreground text-xs">Reunião às 15:00</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Settings - hidden on mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Preferências</DropdownMenuItem>
              <DropdownMenuItem>Configurações de conta</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline max-w-24 truncate">{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem className="sm:hidden">Configurações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
