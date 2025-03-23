
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { 
  getNavigationLinks, 
  extractPublishDate, 
  getGitHubPath, 
  normalizeDocPath,
  extractTitle,
  extractDescription
} from '@/utils/docsUtils';
import DocMetadata from '@/components/DocMetadata';
import MarkdownRenderer from '@/components/docs/MarkdownRenderer';
import DocNavigation from '@/components/docs/DocNavigation';
import DocBreadcrumb from '@/components/docs/DocBreadcrumb';
import DocsInfoBlock from '@/components/docs/DocsInfoBlock';
import sidebarStructure from '@/docs/structure.json';

const DocPage: React.FC = () => {
  const { '*': path } = useParams();
  const location = useLocation();
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [publishDate, setPublishDate] = useState<string>('January 1, 2023');
  const [description, setDescription] = useState<string>('');
  
  const normalizedPath = path || 'introduction';
  const githubPath = getGitHubPath(normalizedPath);
  
  // Get navigation links
  const { prev, next } = getNavigationLinks(location.pathname);
  
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        // Dynamic import of markdown files
        const moduleImport = await import(`@/docs/${normalizeDocPath(normalizedPath)}.md?raw`);
        const markdownContent = moduleImport.default;
        
        // Extract title and description from the markdown content
        const extractedTitle = extractTitle(markdownContent);
        const extractedDescription = extractDescription(markdownContent);
        
        setTitle(extractedTitle);
        setDescription(extractedDescription);
        
        // Extract publish date from frontmatter
        setPublishDate(extractPublishDate(markdownContent));
        
        setContent(markdownContent);
        setError(false);
        
        // Update document title
        document.title = `${extractedTitle} | DocuSanity`;
      } catch (e) {
        console.error("Failed to load markdown:", e);
        setError(true);
        setTitle('Not Found');
        setContent('# Page Not Found\n\nThe requested documentation page could not be found.');
        document.title = "Page Not Found | DocuSanity";
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, [normalizedPath]);

  // Determine which info block to show based on the path
  const showConfigInfo = normalizedPath.includes('configuration');
  const showInstallationInfo = normalizedPath.includes('installation');
  const showStyleGuideInfo = normalizedPath.includes('style-guide');

  if (loading) {
    return <div className="animate-pulse p-4">Loading documentation...</div>;
  }

  return (
    <div className="animate-fadeIn square-docs-container">
      {/* Breadcrumb */}
      <DocBreadcrumb title={title} />

      {/* Conditional Info Blocks */}
      <DocsInfoBlock 
        title="Configuration Best Practices"
        description="It's recommended to keep your configuration file in the root of your project and version it with your code. This ensures that everyone on your team uses the same configuration."
        show={showConfigInfo}
        variant="info"
      />
      
      <DocsInfoBlock 
        title="Installation Notes"
        description="When installing DocuSanity, make sure you have the latest Node.js version for optimal performance and compatibility."
        show={showInstallationInfo}
        variant="tip"
      />
      
      <DocsInfoBlock 
        title="Style Guide Recommendation"
        description="Following a consistent style guide improves documentation readability and maintains a professional appearance across your project."
        show={showStyleGuideInfo}
        variant="warning"
      />

      {/* Main Content */}
      <MarkdownRenderer content={content} />

      {/* DocMetadata moved to the bottom, before navigation links */}
      <div className="mt-12">
        <DocMetadata publishDate={publishDate} githubPath={githubPath} />
      </div>

      {/* Navigation Links */}
      <DocNavigation prev={prev} next={next} />
    </div>
  );
};

export default DocPage;
