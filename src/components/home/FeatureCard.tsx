
import React from 'react';
import { Check, Shield, Github, Zap, SquareTerminal, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  // Get the icon component based on name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'zap': return <Zap className="h-6 w-6 text-primary" />;
      case 'check': return <Check className="h-6 w-6 text-primary" />;
      case 'shield': return <Shield className="h-6 w-6 text-primary" />;
      case 'github': return <Github className="h-6 w-6 text-primary" />;
      case 'terminal-square': return <SquareTerminal className="h-6 w-6 text-primary" />;
      default: return <ArrowRight className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border hover:border-primary/20 group">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
        {getIconComponent(icon)}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
