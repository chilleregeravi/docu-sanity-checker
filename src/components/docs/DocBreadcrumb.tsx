
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DocBreadcrumbProps {
  path: string;
}

const DocBreadcrumb: React.FC<DocBreadcrumbProps> = ({ path }) => {
  // Extract title from path
  const pathSegments = path.split('/').filter(Boolean);
  const title = pathSegments.length > 1 
    ? pathSegments[pathSegments.length - 1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Documentation';
    
  return (
    <div className="square-docs-section">
      <div className="flex items-center text-sm text-muted-foreground">
        <Link to="/docs" className="hover:text-foreground transition-colors">
          Documentation
        </Link>
        <ArrowRight className="h-4 w-4 mx-2" />
        <span>{title}</span>
      </div>
    </div>
  );
};

export default DocBreadcrumb;
