
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4',
        isScrolled
          ? 'bg-white/70 backdrop-blur-lg shadow-subtle dark:bg-black/70'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xl">
            D
          </div>
          <span className="text-xl font-medium">DocuSanity</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks isActive={isActive} />
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="sm" className="rounded-full">
            <Search className="h-4 w-4 mr-2" />
            <span>Search</span>
          </Button>
          <Button size="sm" className="rounded-full">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Mobile Menu */}
        <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <div className="fixed inset-0 bg-white dark:bg-gray-950 z-50 p-6 flex flex-col animate-fadeIn">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xl">
                  D
                </div>
                <span className="text-xl font-medium">DocuSanity</span>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="flex flex-col mt-10 space-y-6">
              <NavLinks isMobile isActive={isActive} />
            </nav>
            
            <div className="mt-10 space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                <span>Search</span>
              </Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </Dialog>
      </div>
    </header>
  );
};

interface NavLinksProps {
  isMobile?: boolean;
  isActive: (path: string) => boolean;
}

const NavLinks = ({ isMobile, isActive }: NavLinksProps) => {
  const linkClass = isMobile
    ? "text-xl font-medium py-2"
    : "text-sm font-medium transition-colors hover:text-primary";

  const links = [
    { path: "/", label: "Home" },
    { path: "/docs", label: "Docs" },
    { path: "/guides", label: "Guides" },
    { path: "/api", label: "API" },
    { path: "/blog", label: "Blog" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            linkClass,
            isActive(link.path) ? "text-primary font-semibold" : "text-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default Header;
