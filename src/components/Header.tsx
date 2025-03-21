
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, Home, FileText, Book, Api, BookOpen } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose 
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

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
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[350px]">
            <SheetHeader className="mb-6">
              <SheetTitle>
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xl">
                    D
                  </div>
                  <span className="text-xl font-medium">DocuSanity</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            
            <nav className="flex flex-col mt-6 space-y-5">
              <MobileNavLinks isActive={isActive} />
            </nav>
            
            <div className="mt-10 space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                <span>Search</span>
              </Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

interface NavLinksProps {
  isMobile?: boolean;
  isActive: (path: string) => boolean;
}

// Desktop navigation links component
const NavLinks = ({ isActive }: NavLinksProps) => {
  const linkClass = "text-sm font-medium transition-colors hover:text-primary flex items-center";

  const links = [
    { path: "/", label: "Home", icon: Home },
    { path: "/docs", label: "Docs", icon: FileText },
    { path: "/guides", label: "Guides", icon: Book },
    { path: "/api", label: "API", icon: Api },
    { path: "/blog", label: "Blog", icon: BookOpen },
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

// Mobile navigation links component with icons
const MobileNavLinks = ({ isActive }: NavLinksProps) => {
  const links = [
    { path: "/", label: "Home", icon: Home },
    { path: "/docs", label: "Docs", icon: FileText },
    { path: "/guides", label: "Guides", icon: Book },
    { path: "/api", label: "API", icon: Api },
    { path: "/blog", label: "Blog", icon: BookOpen },
  ];

  return (
    <>
      {links.map((link) => (
        <SheetClose asChild key={link.path}>
          <Link
            to={link.path}
            className={cn(
              "flex items-center space-x-3 text-base font-medium transition-colors",
              isActive(link.path) 
                ? "text-primary font-semibold" 
                : "text-foreground hover:text-primary"
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        </SheetClose>
      ))}
    </>
  );
};

export default Header;
