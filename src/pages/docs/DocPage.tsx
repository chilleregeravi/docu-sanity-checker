
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadMarkdownFile, getNavigationLinks } from '@/utils/docs';
import { useSidebarStructure } from '@/utils/docs/sidebar';
import MarkdownRenderer from '@/components/docs/MarkdownRenderer';
import DocNavigation from '@/components/docs/DocNavigation';
import DocMetadata from '@/components/DocMetadata';
import DocBreadcrumb from '@/components/docs/DocBreadcrumb';

const DocPage = () => {
  const location = useLocation();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { sidebar } = useSidebarStructure();

  // Determine the path from the URL
  const path = location.pathname.replace(/^\/docs\//, '').replace(/\/$/, '');
  
  // Extract navigation links
  const { prev, next } = getNavigationLinks(location.pathname, sidebar);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        // Load markdown content from the appropriate file
        const markdownContent = await loadMarkdownFile(path);
        setContent(markdownContent);
        setError(null);
      } catch (err: any) {
        console.error("Failed to load doc content:", err);
        setError(err);
        setContent('');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, [path]);
  
  return (
    <div className="pb-16">
      {/* Breadcrumb navigation at the top */}
      <DocBreadcrumb path={location.pathname} />
      
      {/* Content area */}
      <div className="mt-6">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
          </div>
        ) : error ? (
          <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
            <h2 className="text-xl font-bold">Error Loading Document</h2>
            <p className="mt-2">{error.message}</p>
          </div>
        ) : (
          <>
            <DocMetadata markdown={content} githubPath={path} />
            <MarkdownRenderer content={content} />
          </>
        )}
      </div>
      
      {/* Next/Previous navigation */}
      <DocNavigation prev={prev} next={next} />
    </div>
  );
};

export default DocPage;
