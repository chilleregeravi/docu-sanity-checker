
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeBlockProps {
  className?: string;
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<boolean>(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
      duration: 3000,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="square-docs-code-block">
      <div className="square-docs-code-header">
        <span className="font-mono">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={copyToClipboard}
        >
          {copied ? (
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

export default CodeBlock;
