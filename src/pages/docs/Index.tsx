
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, FileText, Code, Shield, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const DocsIndex = () => {
  return (
    <div className="square-docs-container animate-fadeIn space-y-8">
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-4">Introduction</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Welcome to the DocuSanity documentation. Get started with installation, learn the fundamentals, and explore advanced topics.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-semibold border-b pb-2 border-border/50">Getting Started</h2>
        <p>
          DocuSanity helps you create beautiful documentation websites with built-in validation tools. It automatically checks for broken links, validates against custom dictionaries, and ensures your style guide is followed.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="square-docs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Installation
              </CardTitle>
              <CardDescription>
                Set up a new DocuSanity project in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn how to create a new DocuSanity project with our CLI tool. We'll guide you through the process step by step.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/docs/installation">
                <Button variant="outline" className="gap-1">
                  Installation Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="square-docs-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Configuration
              </CardTitle>
              <CardDescription>
                Configure your project to match your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn about the configuration options available to customize your documentation website and validation rules.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/docs/configuration">
                <Button variant="outline" className="gap-1">
                  Configuration Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="space-y-4 mt-10">
        <h2 className="text-2xl font-heading font-semibold border-b pb-2 border-border/50">Validation Features</h2>
        <p>
          DocuSanity comes with powerful validation tools to ensure your documentation is accurate, consistent, and follows best practices.
        </p>

        <ul className="mt-6 space-y-4">
          <li className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
              <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Link Validation</h3>
              <p className="text-muted-foreground mt-1">
                Automatically detect and report broken links in your documentation. 
                <Link to="/docs/link-validation" className="text-primary ml-1 inline-flex items-center hover:underline text-sm">
                  Learn more<ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </p>
            </div>
          </li>
          
          <li className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Dictionary Validation</h3>
              <p className="text-muted-foreground mt-1">
                Ensure consistent terminology using custom dictionaries.
                <Link to="/docs/dictionary-validation" className="text-primary ml-1 inline-flex items-center hover:underline text-sm">
                  Learn more<ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </p>
            </div>
          </li>
          
          <li className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card hover:shadow-sm transition-shadow">
            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
              <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Style Guide Enforcement</h3>
              <p className="text-muted-foreground mt-1">
                Enforce consistent writing style across your documentation.
                <Link to="/docs/style-guide" className="text-primary ml-1 inline-flex items-center hover:underline text-sm">
                  Learn more<ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-10 pt-6 border-t">
        <h2 className="text-2xl font-heading font-semibold mb-4">GitHub Actions Integration</h2>
        <p className="mb-4">
          DocuSanity seamlessly integrates with GitHub Actions to automate validation checks as part of your CI/CD pipeline.
        </p>
        <Link to="/docs/github-actions">
          <Button className="gap-2">
            <Github className="h-4 w-4" />
            GitHub Actions Setup
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between mt-10 pt-6 border-t text-sm">
        <div>
          <p className="text-muted-foreground">Need help?</p>
          <a href="#" className="text-primary inline-flex items-center hover:underline">
            Join our community <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Next steps</p>
          <Link to="/docs/installation" className="text-primary inline-flex items-center hover:underline">
            Installation <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocsIndex;
