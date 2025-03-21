
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Copy, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const GitHubActions = () => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
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
          <span>GitHub Actions</span>
        </div>
        
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4">GitHub Actions</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Automate documentation validation with GitHub Actions.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p>
          DocuSanity integrates with GitHub Actions to automatically validate your documentation on every pull request and push. 
          This ensures your documentation always meets quality standards before it gets published.
        </p>

        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <h3 className="font-medium text-primary flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Benefits of GitHub Actions Integration
          </h3>
          <ul className="mt-2 space-y-1">
            <li className="text-sm flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Automated validation on every pull request</span>
            </li>
            <li className="text-sm flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Catch documentation issues before they reach production</span>
            </li>
            <li className="text-sm flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Enforce style guide and terminology consistency</span>
            </li>
            <li className="text-sm flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Detailed reports for any issues found</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-2xl font-semibold">Setting Up GitHub Actions</h2>
        <p>
          To set up GitHub Actions for your DocuSanity project, you need to create a workflow file in the 
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.github/workflows</code> directory of your repository.
        </p>

        <h3 className="text-xl font-medium mt-6">1. Create the workflow file</h3>
        <p>
          Create a file named <code className="bg-muted px-1.5 py-0.5 rounded text-sm">docusanity.yml</code> in the 
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.github/workflows</code> directory:
        </p>

        <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm overflow-x-auto relative mt-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
            onClick={() => copyToClipboard(`name: DocuSanity Validation

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run DocuSanity validation
        run: npx @docusanity/cli validate
        
      - name: Check for broken links
        run: npx @docusanity/cli check-links
        
      - name: Validate against dictionary
        run: npx @docusanity/cli check-dictionary
        
      - name: Enforce style guide
        run: npx @docusanity/cli check-style`)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <pre className="text-xs">
{`name: DocuSanity Validation

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run DocuSanity validation
        run: npx @docusanity/cli validate
        
      - name: Check for broken links
        run: npx @docusanity/cli check-links
        
      - name: Validate against dictionary
        run: npx @docusanity/cli check-dictionary
        
      - name: Enforce style guide
        run: npx @docusanity/cli check-style`}
          </pre>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-950 dark:border-yellow-900 mt-6">
          <h3 className="font-medium text-yellow-800 dark:text-yellow-400 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Important Note
          </h3>
          <p className="text-yellow-800 dark:text-yellow-400 mt-1 text-sm">
            This workflow will run all validation checks. If you only want to run specific checks, you can remove the relevant steps from the workflow file.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-8">2. Configure validation rules</h3>
        <p>
          You can customize the validation rules by creating a 
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.docusanity</code> directory in the root of your project 
          with the following configuration files:
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="font-medium mb-2">Link Validation Configuration</h4>
            <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm overflow-x-auto relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
                onClick={() => copyToClipboard(`// .docusanity/links.config.js
module.exports = {
  excludePaths: [
    '**/node_modules/**',
    '**/build/**',
  ],
  checkExternal: true,
  ignorePatterns: [
    'mailto:*',
    'tel:*',
  ],
  maxConcurrency: 5,
};`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <pre className="text-xs">
{`// .docusanity/links.config.js
module.exports = {
  excludePaths: [
    '**/node_modules/**',
    '**/build/**',
  ],
  checkExternal: true,
  ignorePatterns: [
    'mailto:*',
    'tel:*',
  ],
  maxConcurrency: 5,
};`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Dictionary Validation Configuration</h4>
            <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm overflow-x-auto relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
                onClick={() => copyToClipboard(`// .docusanity/dictionary.config.js
module.exports = {
  customDictionaries: [
    '.docusanity/dictionaries/technical-terms.json',
    '.docusanity/dictionaries/product-names.json',
  ],
  caseSensitive: true,
  ignorePatterns: [
    '```[\\s\\S]*?```', // Ignore code blocks
  ],
};`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <pre className="text-xs">
{`// .docusanity/dictionary.config.js
module.exports = {
  customDictionaries: [
    '.docusanity/dictionaries/technical-terms.json',
    '.docusanity/dictionaries/product-names.json',
  ],
  caseSensitive: true,
  ignorePatterns: [
    '```[\\s\\S]*?```', // Ignore code blocks
  ],
};`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Style Guide Configuration</h4>
            <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm overflow-x-auto relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
                onClick={() => copyToClipboard(`// .docusanity/style.config.js
module.exports = {
  rules: [
    {
      name: 'avoid-passive-voice',
      severity: 'warning',
    },
    {
      name: 'sentence-length',
      severity: 'error',
      options: {
        max: 100,
      },
    },
    {
      name: 'no-jargon',
      severity: 'warning',
      options: {
        terms: ['leverage', 'utilize', 'paradigm'],
      },
    },
  ],
  ignorePatterns: [
    '```[\\s\\S]*?```', // Ignore code blocks
  ],
};`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <pre className="text-xs">
{`// .docusanity/style.config.js
module.exports = {
  rules: [
    {
      name: 'avoid-passive-voice',
      severity: 'warning',
    },
    {
      name: 'sentence-length',
      severity: 'error',
      options: {
        max: 100,
      },
    },
    {
      name: 'no-jargon',
      severity: 'warning',
      options: {
        terms: ['leverage', 'utilize', 'paradigm'],
      },
    },
  ],
  ignorePatterns: [
    '```[\\s\\S]*?```', // Ignore code blocks
  ],
};`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-2xl font-semibold">Viewing Validation Results</h2>
        <p>
          After the GitHub Actions workflow runs, you can view the validation results in several ways:
        </p>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            <strong>GitHub Actions Tab:</strong> Navigate to the Actions tab in your repository to see the detailed logs for each validation step.
          </li>
          <li>
            <strong>Pull Request Checks:</strong> The workflow status will be displayed in your pull requests, including any validation failures.
          </li>
          <li>
            <strong>Detailed Reports:</strong> For more detailed reports, you can configure the workflow to generate and upload artifacts containing full validation reports.
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-8">Generating and Uploading Reports</h3>
        <p>
          To generate and upload detailed reports, add the following steps to your workflow:
        </p>

        <div className="bg-zinc-950 text-zinc-50 rounded-lg p-4 font-mono text-sm overflow-x-auto relative mt-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
            onClick={() => copyToClipboard(`# Add these steps to your workflow
- name: Generate validation report
  run: npx @docusanity/cli validate --report-file=validation-report.json
  
- name: Upload validation report
  uses: actions/upload-artifact@v3
  with:
    name: validation-reports
    path: validation-report.json`)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <pre className="text-xs">
{`# Add these steps to your workflow
- name: Generate validation report
  run: npx @docusanity/cli validate --report-file=validation-report.json
  
- name: Upload validation report
  uses: actions/upload-artifact@v3
  with:
    name: validation-reports
    path: validation-report.json`}
          </pre>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10 pt-6 border-t text-sm">
        <Link to="/docs/dictionary-validation/integration" className="text-primary inline-flex items-center hover:underline">
          <ArrowLeft className="h-3 w-3 mr-1" /> Dictionary Integration
        </Link>
        <Link to="/docs/github-actions/workflows" className="text-primary inline-flex items-center hover:underline">
          Setting Up Workflows <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default GitHubActions;
