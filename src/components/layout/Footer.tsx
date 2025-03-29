
import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Heart, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-sidebar border-t border-sidebar-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Mic className="h-7 w-7 text-podcast-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-podcast-highlight rounded-full animate-pulse" />
              </div>
              <span className="font-bold text-xl podcast-gradient-text">Podcastiverse</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover, listen and engage with thousands of podcasts on topics that matter to you. Your one-stop platform for all things podcasts.
            </p>
            <div className="flex space-x-3 mt-6">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-podcast-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-podcast-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-podcast-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" className="text-muted-foreground hover:text-podcast-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-podcast-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-muted-foreground hover:text-podcast-primary transition-colors">
                  Browse
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-podcast-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-podcast-primary transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>
          
          {/* User */}
          <div>
            <h3 className="font-semibold mb-4">My Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/favorites" className="text-muted-foreground hover:text-podcast-primary transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-muted-foreground hover:text-podcast-primary transition-colors">
                  History
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-podcast-primary transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/add-podcast" className="text-muted-foreground hover:text-podcast-primary transition-colors">
                  Add Podcast
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact and Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest podcasts and updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm rounded-l-md border border-border bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <button className="bg-podcast-primary text-white px-4 py-2 rounded-r-md hover:bg-podcast-primary/90 transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-sidebar-border" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-2 md:mb-0">
            © {currentYear} Podcastiverse. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-podcast-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-podcast-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-podcast-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
