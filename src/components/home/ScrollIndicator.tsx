
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ScrollIndicatorProps {
  onClick: () => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onClick }) => {
  return (
    <div 
      className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer"
      onClick={onClick}
      aria-label="Scroll to features"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/5 transition-colors bg-background/80 backdrop-blur-sm shadow-sm">
        <ArrowRight className="h-4 w-4 text-primary rotate-90" />
      </div>
    </div>
  );
};

export default ScrollIndicator;
