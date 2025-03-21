
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Copy, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Installation = () => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The command has been copied to your clipboard.",
      duration: 3000,
    });
  };

  return (
    <div className="square-docs-container animate-fadeIn space-y-8">
      <div>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Link to="/docs" className="hover:text-foreground transition-colors">
            Documentation
          </Link>
          <ArrowRight className="h-4 w-4 mx-2" />
          <span>Installation</span>
        </div>
        
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-4">Installation</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Get started with DocuSanity in just a few minutes.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-semibold border-b pb-2 border-border/50">Prerequisites</h2>
        <p>
          Before you begin, make sure you have the following installed:
        </p>
        
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Node.js 14 or later</li>
          <li>npm 7 or later</li>
          <li>Git (optional, but recommended)</li>
        </ul>

        <div className="square-docs-info-block bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400">Note</h3>
              <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                DocuSanity works best with Node.js 16 or later. While it may work with older versions, we recommend using the latest LTS version.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-2xl font-heading font-semibold border-b pb-2 border-border/50">Installation Methods</h2>
        <p>
          You can install DocuSanity using npm, yarn, or use our CLI tool to create a new project.
        </p>

        <Tabs defaultValue="npm" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
            <TabsTrigger value="cli">CLI Tool</TabsTrigger>
          </TabsList>
          
          <TabsContent value="npm" className="mt-4">
            <div className="square-docs-code-block">
              <div className="square-docs-code-header">
                <span className="font-mono">bash</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => copyToClipboard('npm install @docusanity/core')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="square-docs-code-content bg-muted/50 dark:bg-muted">
                <code>npm install @docusanity/core</code>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="yarn" className="mt-4">
            <div className="square-docs-code-block">
              <div className="square-docs-code-header">
                <span className="font-mono">bash</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => copyToClipboard('yarn add @docusanity/core')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="square-docs-code-content bg-muted/50 dark:bg-muted">
                <code>yarn add @docusanity/core</code>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cli" className="mt-4">
            <div className="square-docs-code-block">
              <div className="square-docs-code-header">
                <span className="font-mono">bash</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => copyToClipboard('npx create-docusanity-app my-docs')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="square-docs-code-content bg-muted/50 dark:bg-muted">
                <code>npx create-docusanity-app my-docs</code>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This will create a new directory called <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">my-docs</code> with a basic DocuSanity setup.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-2xl font-heading font-semibold border-b pb-2 border-border/50">Basic Configuration</h2>
        <p>
          After installation, you'll need to create a configuration file. Create a file called <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">docusanity.config.js</code> in the root of your project:
        </p>

        <div className="square-docs-code-block">
          <div className="square-docs-code-header">
            <span className="font-mono">javascript</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => copyToClipboard(`module.exports = {
  title: 'My Documentation',
  description: 'Documentation for my awesome project',
  basePath: '/docs',
  checks: {
    links: true,
    dictionary: true,
    styleGuide: true,
  },
  github: {
    repo: 'username/repo',
    branch: 'main',
  },
};`)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="square-docs-code-content bg-muted/50 dark:bg-muted">
            <pre className="text-xs">
{`module.exports = {
  title: 'My Documentation',
  description: 'Documentation for my awesome project',
  basePath: '/docs',
  checks: {
    links: true,
    dictionary: true,
    styleGuide: true,
  },
  github: {
    repo: 'username/repo',
    branch: 'main',
  },
};`}
            </pre>
          </div>
        </div>

        <p className="mt-6">
          This is a basic configuration file. For more options, check out the <Link to="/docs/configuration" className="text-primary hover:underline">Configuration</Link> documentation.
        </p>
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-2xl font-heading font-semibold border-b pb-2 border-border/50">Next Steps</h2>
        <p>
          Now that you've installed DocuSanity, you can:
        </p>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            <Link to="/docs/configuration" className="text-primary hover:underline">
              Learn about configuration options
            </Link>
          </li>
          <li>
            <Link to="/docs/github-actions" className="text-primary hover:underline">
              Set up GitHub Actions for automated validation
            </Link>
          </li>
          <li>
            <Link to="/docs/style-guide" className="text-primary hover:underline">
              Configure your style guide
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between mt-10 pt-6 border-t text-sm">
        <Link to="/docs" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors border border-border/30 rounded-lg px-4 py-2 hover:bg-muted/50">
          <ArrowLeft className="h-4 w-4" /> Introduction
        </Link>
        <Link to="/docs/configuration" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors border border-border/30 rounded-lg px-4 py-2 hover:bg-muted/50">
          Configuration <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Installation;
