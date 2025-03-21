
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children,
  className
}) => {
  const location = useLocation();
  
  return (
    <div
      key={location.pathname}
      className={cn(
        "animate-in fade-in duration-300 ease-in-out",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageTransition;
