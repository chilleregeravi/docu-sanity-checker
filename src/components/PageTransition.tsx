
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
        "animate-fadeIn",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageTransition;
