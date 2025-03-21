
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
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
    <div className="space-y-8 animate-fadeIn">
      <div>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Link to="/docs" className="hover:text-foreground transition-colors">
            Documentation
          </Link>
          <ArrowRight className="h-4 w-4 mx-2" />
          <span>Installation</span>
        </div>
        
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4">Installation</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Get started with DocuSanity in just a few minutes.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Prerequisites</h2>
        <p>
          Before you begin, make sure you have the following installed:
        </p>
        
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Node.js 14 or later</li>
          <li>npm 7 or later</li>
          <li>Git (optional, but recommended)</li>
        </ul>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-950 dark:border-amber-900">
          <h3 className="font-medium text-amber-800 dark:text-amber-400 flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Note
          </h3>
          <p className="text-amber-800 dark:text-amber-400 mt-1 text-sm">
            DocuSanity works best with Node.js 16 or later. While it may work with older versions, we recommend using the latest LTS version.
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-2xl font-semibold">Installation Methods</h2>
        <p>
          You can install DocuSanity using npm, yarn, or use our CLI tool to create a new project.
        </p>

        <Tabs defaultValue="npm" className="mt-6">
          <TabsList>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
            <TabsTrigger value="cli">CLI Tool</TabsTrigger>
          </TabsList>
          
          <TabsContent value="npm" className="mt-4">
            <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
                onClick={() => copyToClipboard('npm install @docusanity/core')}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <code>npm install @docusanity/core</code>
            </div>
          </TabsContent>
          
          <TabsContent value="yarn" className="mt-4">
            <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
                onClick={() => copyToClipboard('yarn add @docusanity/core')}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <code>yarn add @docusanity/core</code>
            </div>
          </TabsContent>
          
          <TabsContent value="cli" className="mt-4">
            <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
                onClick={() => copyToClipboard('npx create-docusanity-app my-docs')}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <code>npx create-docusanity-app my-docs</code>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This will create a new directory called <code>my-docs</code> with a basic DocuSanity setup.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-2xl font-semibold">Basic Configuration</h2>
        <p>
          After installation, you'll need to create a configuration file. Create a file called <code>docusanity.config.js</code> in the root of your project:
        </p>

        <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm overflow-x-auto relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
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

        <p className="mt-6">
          This is a basic configuration file. For more options, check out the <Link to="/docs/configuration" className="text-primary hover:underline">Configuration</Link> documentation.
        </p>
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
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
        <Link to="/docs" className="text-primary inline-flex items-center hover:underline">
          <ArrowLeft className="h-3 w-3 mr-1" /> Introduction
        </Link>
        <Link to="/docs/configuration" className="text-primary inline-flex items-center hover:underline">
          Configuration <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default Installation;
