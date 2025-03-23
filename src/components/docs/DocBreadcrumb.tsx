
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DocBreadcrumbProps {
  title: string;
}

const DocBreadcrumb: React.FC<DocBreadcrumbProps> = ({ title }) => {
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
