
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Copy, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Markdown from 'react-markdown';

const Configuration = () => {
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

  const markdownContent = `
# Configuration

DocuSanity provides flexible configuration options to customize your documentation website and validation rules. This guide covers all available options and how to use them effectively.

## Configuration File

The main configuration file is \`docusanity.config.js\` located in the root of your project. This file defines global settings for your documentation site.

### Basic Configuration

\`\`\`javascript
module.exports = {
  title: 'My Documentation',
  description: 'Documentation for my awesome project',
  basePath: '/docs',
  theme: {
    primaryColor: '#3f51b5',
    accentColor: '#f50057',
    darkMode: true,
  },
  checks: {
    links: true,
    dictionary: true,
    styleGuide: true,
  },
  github: {
    repo: 'username/repo',
    branch: 'main',
    editUrl: true,
  },
};
\`\`\`

## Configuration Options

### General Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`title\` | string | 'Documentation' | The title of your documentation site |
| \`description\` | string | '' | A brief description of your documentation |
| \`basePath\` | string | '/docs' | The base URL path for your documentation |
| \`outDir\` | string | 'build' | Output directory for the built site |
| \`favicon\` | string | null | Path to your favicon |

### Theme Configuration

The \`theme\` object allows you to customize the appearance of your documentation site:

\`\`\`javascript
theme: {
  primaryColor: '#3f51b5',      // Primary brand color
  accentColor: '#f50057',       // Accent color for interactive elements
  darkMode: true,               // Enable dark mode toggle
  font: {
    main: 'Inter, sans-serif',  // Main font for text
    code: 'Fira Code, monospace', // Font for code blocks
  },
  logo: {
    light: '/logo-light.svg',   // Logo for light mode
    dark: '/logo-dark.svg',     // Logo for dark mode
  },
}
\`\`\`

### Validation Checks

Configure which validation checks to run on your documentation:

\`\`\`javascript
checks: {
  links: {
    enabled: true,
    excludePaths: ['**/node_modules/**'],
    checkExternal: true,
  },
  dictionary: {
    enabled: true,
    customDictionaries: [
      '.docusanity/dictionaries/technical-terms.json',
    ],
  },
  styleGuide: {
    enabled: true,
    ruleset: '.docusanity/style-rules.json',
  },
}
\`\`\`

### GitHub Integration

Connect your documentation to your GitHub repository:

\`\`\`javascript
github: {
  repo: 'username/repo',        // GitHub repository
  branch: 'main',               // Branch name
  editUrl: true,                // Show "Edit this page" links
  pullRequests: {
    enabled: true,              // Enable PR previews
    label: 'documentation',     // PR label for docs changes
  },
}
\`\`\`

## Environment Variables

DocuSanity also supports configuration through environment variables. These take precedence over the config file settings.

- \`DOCUSANITY_BASE_PATH\`: Override the base path
- \`DOCUSANITY_GITHUB_TOKEN\`: GitHub token for API access
- \`DOCUSANITY_DISABLE_CHECKS\`: Disable all validation checks

## Advanced Configuration

For more advanced use cases, you can create specific configuration files in the \`.docusanity\` directory:

- \`.docusanity/links.config.js\` - Configure link validation
- \`.docusanity/dictionary.config.js\` - Configure dictionary validation
- \`.docusanity/style.config.js\` - Configure style guide rules

## Examples

### Multi-version Documentation

\`\`\`javascript
module.exports = {
  title: 'API Documentation',
  versions: {
    current: 'v2',
    list: ['v1', 'v2', 'next'],
  },
  versioning: {
    path: 'versions',
    hideUnreleasedVersion: true,
  },
};
\`\`\`

### Custom Navigation

\`\`\`javascript
module.exports = {
  navigation: {
    primary: [
      { title: 'Guides', path: '/guides' },
      { title: 'API', path: '/api' },
      { title: 'Examples', path: '/examples' },
    ],
    footer: {
      resources: [
        { title: 'GitHub', url: 'https://github.com/username/repo' },
        { title: 'Support', url: '/support' },
      ],
    },
  },
};
\`\`\`
`;

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
          <span>Configuration</span>
        </div>
        
        <div className="space-y-2 mt-4">
          <h1 className="font-heading text-4xl font-bold tracking-tight">Configuration</h1>
          <p className="text-xl text-muted-foreground">
            Configure DocuSanity to match your project's needs.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-blue max-w-none dark:prose-invert">
        <div className="square-docs-info-block bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800/50">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Configuration Best Practices</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                It's recommended to keep your configuration file in the root of your project and version it with your code.
                This ensures that everyone on your team uses the same configuration.
              </p>
            </div>
          </div>
        </div>

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
          {markdownContent}
        </Markdown>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t">
        <Link 
          to="/docs/installation" 
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors border border-border/30 rounded-lg px-4 py-2 hover:bg-muted/50"
        >
          <ArrowLeft className="h-4 w-4" /> 
          <span>Installation</span>
        </Link>
        <Link 
          to="/docs/github-actions" 
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors border border-border/30 rounded-lg px-4 py-2 hover:bg-muted/50"
        >
          <span>GitHub Actions</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Configuration;
