
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Markdown from 'react-markdown';
import DocMetadata from '@/components/DocMetadata';
import installationContent from '@/docs/installation.md?raw';

const Installation = () => {
  const { toast } = useToast();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  
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

  return (
    <div className="animate-fadeIn square-docs-container">
      {/* Breadcrumb and Title Section */}
      <div className="square-docs-section">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link to="/docs" className="hover:text-foreground transition-colors">
            Documentation
          </Link>
          <ArrowRight className="h-4 w-4 mx-2" />
          <span>Installation</span>
        </div>
      </div>

      {/* Add DocMetadata component */}
      <DocMetadata publishDate="July 2, 2023" githubPath="installation.md" />

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
          {installationContent}
        </Markdown>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t">
        <Link 
          to="/docs" 
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors border border-border/30 rounded-lg px-4 py-2 hover:bg-muted/50"
        >
          <ArrowLeft className="h-4 w-4" /> 
          <span>Introduction</span>
        </Link>
        <Link 
          to="/docs/configuration" 
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors border border-border/30 rounded-lg px-4 py-2 hover:bg-muted/50"
        >
          <span>Configuration</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Installation;
