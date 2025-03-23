
import React from 'react';
import { Info } from 'lucide-react';

interface DocsInfoBlockProps {
  title: string;
  description: string;
  show: boolean;
}

const DocsInfoBlock: React.FC<DocsInfoBlockProps> = ({ title, description, show }) => {
  if (!show) return null;
  
  return (
    <div className="square-docs-info-block bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/50 mb-6">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">{title}</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocsInfoBlock;
