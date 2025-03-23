
import React from 'react';
import { Info } from 'lucide-react';

interface DocsInfoBlockProps {
  title: string;
  description: string;
  show: boolean;
  variant?: 'info' | 'warning' | 'tip';
}

const DocsInfoBlock: React.FC<DocsInfoBlockProps> = ({ 
  title, 
  description, 
  show, 
  variant = 'info' 
}) => {
  if (!show) return null;
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return "bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/50";
      case 'tip':
        return "bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-800/50";
      case 'info':
      default:
        return "bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/50";
    }
  };
  
  const getIconStyles = () => {
    switch (variant) {
      case 'warning':
        return "text-amber-500 dark:text-amber-400";
      case 'tip':
        return "text-green-500 dark:text-green-400";
      case 'info':
      default:
        return "text-blue-500 dark:text-blue-400";
    }
  };
  
  const getTitleStyles = () => {
    switch (variant) {
      case 'warning':
        return "text-amber-800 dark:text-amber-300";
      case 'tip':
        return "text-green-800 dark:text-green-300";
      case 'info':
      default:
        return "text-blue-800 dark:text-blue-300";
    }
  };
  
  const getTextStyles = () => {
    switch (variant) {
      case 'warning':
        return "text-amber-700 dark:text-amber-400";
      case 'tip':
        return "text-green-700 dark:text-green-400";
      case 'info':
      default:
        return "text-blue-700 dark:text-blue-400";
    }
  };
  
  return (
    <div className={`square-docs-info-block ${getVariantStyles()} mb-6`}>
      <div className="flex items-start gap-3">
        <Info className={`h-5 w-5 ${getIconStyles()} mt-0.5`} />
        <div>
          <h3 className={`text-sm font-medium ${getTitleStyles()}`}>{title}</h3>
          <p className={`text-sm ${getTextStyles()} mt-1`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocsInfoBlock;
