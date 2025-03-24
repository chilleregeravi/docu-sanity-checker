
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SidebarItem } from '@/utils/docs/types';

interface NavLink {
  path: string;
  title: string;
}

interface DocNavigationProps {
  prev: NavLink | null;
  next: NavLink | null;
}

const DocNavigation: React.FC<DocNavigationProps> = ({ prev, next }) => {
  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t">
      {prev ? (
        <Link 
          to={prev.path} 
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors border border-border/30 rounded-lg px-4 py-2 hover:bg-muted/50"
        >
          <ArrowLeft className="h-4 w-4" /> 
          <span>{prev.title}</span>
        </Link>
      ) : (
        <div></div> // Empty div to maintain flex spacing
      )}
      
      {next && (
        <Link 
          to={next.path} 
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors border border-border/30 rounded-lg px-4 py-2 hover:bg-muted/50"
        >
          <span>{next.title}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
};

export default DocNavigation;
