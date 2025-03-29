
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, Search, Heart, History, PlusCircle, User, LogOut, Mic,
  Menu, X, BookOpen, Bookmark
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // Mock authentication state - would be replaced with real auth
  const isAuthenticated = true;
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Browse', path: '/browse', icon: Mic },
    { name: 'Categories', path: '/categories', icon: BookOpen },
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/95">
      {isMobile && (
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 p-4 flex justify-between items-center sticky top-0 z-40">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Mic className="h-7 w-7 text-podcast-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-podcast-highlight rounded-full animate-pulse" />
            </div>
            <span className="font-bold text-xl podcast-gradient-text">Podcastiverse</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
            className="relative"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        <aside 
          className={cn(
            "bg-sidebar border-r border-sidebar-border h-screen flex-shrink-0 relative",
            isMobile ? "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out" : "w-72",
            isMobile && !sidebarOpen && "-translate-x-full"
          )}
        >
          <div className="absolute inset-0 bg-podcast-gradient opacity-5 pointer-events-none" />
          
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
                <div className="relative">
                  <Mic className="h-7 w-7 text-podcast-primary" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-podcast-highlight rounded-full animate-pulse" />
                </div>
                <span className="font-bold text-xl podcast-gradient-text">Podcastiverse</span>
              </Link>
            </div>
          )}
          
          <nav className="mt-6 px-4 space-y-1.5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200",
                  location.pathname === item.path 
                    ? "bg-sidebar-accent text-white font-medium shadow-md" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/40 hover:text-white"
                )}
                onClick={isMobile ? toggleSidebar : undefined}
              >
                <item.icon className={cn(
                  "h-5 w-5 mr-3",
                  location.pathname === item.path 
                    ? "text-podcast-highlight" 
                    : "text-sidebar-foreground group-hover:text-white"
                )} />
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <div className="pt-6 mt-6 border-t border-sidebar-border">
                <Button 
                  variant="ghost" 
                  className="flex w-full items-center px-4 py-3 text-sm rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/40 hover:text-white"
                  onClick={() => console.log('Logout')}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Button>
              </div>
            )}
          </nav>
        </aside>
        
        <div className="flex flex-col flex-1 overflow-auto">
          <main className={cn(
            "flex-1 overflow-auto",
            isMobile && sidebarOpen && "opacity-50"
          )}>
            {isMobile && sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                onClick={toggleSidebar}
                aria-hidden="true"
              />
            )}
            <div className="container mx-auto py-8 px-4 md:px-6 max-w-7xl">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
