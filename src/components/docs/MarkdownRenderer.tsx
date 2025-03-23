
import React from 'react';
import Markdown from 'react-markdown';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Strip out frontmatter before rendering
  const contentWithoutFrontmatter = content.replace(/^---\s+([\s\S]*?)\s+---/, '');

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
          table: ({ children }) => (
            <div className="my-6 w-full overflow-y-auto rounded-lg border">
              <table className="w-full">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50">{children}</thead>
          ),
          tr: ({ children }) => (
            <tr className="m-0 border-t p-0 even:bg-muted/20">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="border px-4 py-2 text-left font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border px-4 py-2 text-left">{children}</td>
          ),
        }}
      >
        {contentWithoutFrontmatter}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;
