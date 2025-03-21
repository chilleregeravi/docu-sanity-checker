
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Markdown from 'react-markdown';
import DocMetadata from '@/components/DocMetadata';
import { getNavigationLinks } from '@/utils/docsUtils';

interface DocPageProps {
  publishDate?: string;
}

const DocPage: React.FC<DocPageProps> = ({ publishDate = "January 1, 2023" }) => {
  const { toast } = useToast();
  const { '*': path } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  
  const normalizedPath = path || 'introduction';
  const githubPath = `${normalizedPath}.md`;
  
  // Get navigation links
  const { prev, next } = getNavigationLinks(location.pathname);
  
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        // Dynamic import of markdown files
        const moduleImport = await import(`@/docs/${normalizedPath}.md?raw`);
        const markdownContent = moduleImport.default;
        
        // Extract title from the first heading
        const titleMatch = markdownContent.match(/^# (.*)/m);
        setTitle(titleMatch ? titleMatch[1] : normalizedPath);
        setContent(markdownContent);
        setError(false);
      } catch (e) {
        console.error("Failed to load markdown:", e);
        setError(true);
        setTitle('Not Found');
        setContent('# Page Not Found\n\nThe requested documentation page could not be found.');
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, [normalizedPath]);
  
  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
      duration: 3000,
    });
    
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const CodeBlock = ({ className, children }: { className?: string, children: string }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    return (
      <div className="square-docs-code-block">
        <div className="square-docs-code-header">
          <span className="font-mono">{language}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => copyToClipboard(children, language)}
          >
            {copiedSection === language ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
        <div className="square-docs-code-content bg-muted/50 dark:bg-muted">
          <code>{children}</code>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="animate-pulse p-4">Loading documentation...</div>;
  }

  return (
    <div className="animate-fadeIn square-docs-container">
      {/* Breadcrumb and Title Section */}
      <div className="square-docs-section">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link to="/docs" className="hover:text-foreground transition-colors">
            Documentation
          </Link>
          <ArrowRight className="h-4 w-4 mx-2" />
          <span>{title}</span>
        </div>
      </div>

      {/* Add DocMetadata component */}
      <DocMetadata publishDate={publishDate} githubPath={githubPath} />

      {/* Main Content */}
      <div className="prose prose-blue max-w-none dark:prose-invert">
        <Markdown
          components={{
            code: ({ className, children }) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <CodeBlock className={className}>{String(children)}</CodeBlock>
              ) : (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                  {String(children)}
                </code>
              );
            },
            h1: ({ children }) => (
              <h1 className="font-heading text-4xl font-bold tracking-tight">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="scroll-m-20 text-2xl font-heading font-semibold tracking-tight mt-10 first:mt-0 border-b pb-2 border-border/50">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="scroll-m-20 text-xl font-heading font-semibold tracking-tight mt-8">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
            ),
          }}
        >
          {content}
        </Markdown>
      </div>

      {/* Navigation Links */}
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
    </div>
  );
};

export default DocPage;
