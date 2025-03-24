
import React from 'react';
import Markdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import DocsAlert from './DocsAlert';
import { Separator } from "@/components/ui/separator";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Strip out frontmatter before rendering
  // This regex matches the entire frontmatter block including the --- delimiters
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]+?---\s*/m, '');

  return (
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
          blockquote: ({ children }) => {
            // Try to detect the note type from the first line
            const childrenArray = React.Children.toArray(children);
            const firstParagraph = childrenArray.find(
              child => React.isValidElement(child) && child.type === 'p'
            );
            
            let variant: 'info' | 'warning' | 'success' | 'tip' | 'note' = 'info';
            let content = children;
            
            if (firstParagraph && React.isValidElement(firstParagraph)) {
              const text = firstParagraph.props.children?.toString() || '';
              
              if (text.startsWith('**Note:**')) {
                variant = 'note';
                content = text.replace('**Note:**', '').trim();
              } else if (text.startsWith('**Warning:**')) {
                variant = 'warning';
                content = text.replace('**Warning:**', '').trim();
              } else if (text.startsWith('**Tip:**')) {
                variant = 'tip';
                content = text.replace('**Tip:**', '').trim();
              } else if (text.startsWith('**Success:**')) {
                variant = 'success';
                content = text.replace('**Success:**', '').trim();
              } else if (text.startsWith('**Info:**')) {
                variant = 'info';
                content = text.replace('**Info:**', '').trim();
              }
              
              // If we detected a special blockquote, return our custom component
              if (variant) {
                return <DocsAlert variant={variant} hideDefaultTitle={true}>{content}</DocsAlert>;
              }
            }
            
            // Default blockquote styling if no special type detected
            return (
              <blockquote className="border-l-4 border-slate-300 dark:border-slate-600 pl-4 py-1 my-6 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/30 rounded-sm">
                {children}
              </blockquote>
            );
          },
          // Fixed table components using native HTML elements
          table: ({ children }) => (
            <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-t border-border">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-medium text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-t border-border px-4 py-3 align-top text-sm">
              {children}
            </td>
          ),
        }}
      >
        {contentWithoutFrontmatter}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;
