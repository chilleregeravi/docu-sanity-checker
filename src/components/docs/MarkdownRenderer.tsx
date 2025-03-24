
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
          // Completely revamped table rendering
          table: () => {
            // We'll extract and render the table manually via a custom function
            // This bypasses react-markdown's table rendering completely
            return null; 
          },
        }}
      >
        {contentWithoutFrontmatter}
      </Markdown>
      
      {/* Render tables separately outside of react-markdown */}
      <div className="markdown-tables">
        {extractAndRenderTables(contentWithoutFrontmatter)}
      </div>
    </div>
  );
};

// Function to extract and render tables from markdown content
const extractAndRenderTables = (content: string) => {
  // Regular expression to match markdown tables
  const tableRegex = /\n(\|[^\n]+\|\n)((?:\|[^\n]+\|\n)+)/g;
  
  // Find all tables in the content
  const tables: JSX.Element[] = [];
  let match;
  let index = 0;
  
  while ((match = tableRegex.exec(content)) !== null) {
    // Extract the header and body of the table
    const headerRow = match[1];
    const bodyRows = match[2];
    
    // Parse the header
    const headers = headerRow
      .trim()
      .split('|')
      .filter(cell => cell.trim() !== '')
      .map(cell => cell.trim());
    
    // Skip the separator row (contains dashes)
    const rowsWithoutSeparator = bodyRows
      .trim()
      .split('\n')
      .filter(row => !row.includes('---'));
    
    // Parse the body rows
    const rows = rowsWithoutSeparator.map(row => 
      row
        .trim()
        .split('|')
        .filter(cell => cell !== '')
        .map(cell => cell.trim())
    );
    
    // Create a table element
    tables.push(
      <div key={`table-${index}`} className="my-6 w-full overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-muted/50">
            <tr>
              {headers.map((header, i) => (
                <th key={`header-${i}`} className="px-4 py-2 text-left font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="border-b border-border hover:bg-muted/20">
                {row.map((cell, cellIndex) => (
                  <td key={`cell-${rowIndex}-${cellIndex}`} className="px-4 py-2 border-r border-border last:border-r-0">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    
    index++;
  }
  
  return tables;
};

export default MarkdownRenderer;
