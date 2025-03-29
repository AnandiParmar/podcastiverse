
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, Search, Heart, History, PlusCircle, User, LogOut, Mic,
  Menu, X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const MainLayout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // Mock authentication state - would be replaced with real auth
  const isAuthenticated = true;
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Browse', path: '/browse', icon: Mic },
    { name: 'Search', path: '/search', icon: Search },
    ...(isAuthenticated ? [
      { name: 'Favorites', path: '/favorites', icon: Heart },
      { name: 'History', path: '/history', icon: History },
      { name: 'Add Podcast', path: '/add-podcast', icon: PlusCircle },
      { name: 'Profile', path: '/profile', icon: User },
    ] : [])
  ];
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="min-h-screen flex flex-col">
      {isMobile && (
        <header className="border-b border-border bg-background p-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Mic className="h-6 w-6 text-podcast-primary" />
            <span className="font-bold text-xl podcast-gradient-text">Podcastiverse</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        <aside 
          className={cn(
            "bg-sidebar border-r border-sidebar-border h-screen flex-shrink-0",
            isMobile ? "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out" : "w-64",
            isMobile && !sidebarOpen && "-translate-x-full"
          )}
        >
          {isMobile && (
            <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
              <span className="font-bold text-xl podcast-gradient-text">Podcastiverse</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}
          
          {!isMobile && (
            <div className="p-6">
              <Link to="/" className="flex items-center space-x-2">
                <Mic className="h-6 w-6 text-podcast-primary" />
                <span className="font-bold text-xl podcast-gradient-text">Podcastiverse</span>
              </Link>
            </div>
          )}
          
          <nav className="mt-6 px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
                  location.pathname === item.path 
                    ? "bg-sidebar-accent text-white font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
                onClick={isMobile ? toggleSidebar : undefined}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <div className="pt-6 mt-6 border-t border-sidebar-border">
                <Button 
                  variant="ghost" 
                  className="flex w-full items-center px-4 py-3 text-sm rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50"
                  onClick={() => console.log('Logout')}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Button>
              </div>
            )}
          </nav>
        </aside>
        
        <main className={cn(
          "flex-1 overflow-auto",
          isMobile && sidebarOpen && "opacity-50"
        )}>
          {isMobile && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleSidebar}
              aria-hidden="true"
            />
          )}
          <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
