import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Check, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Markdown from 'react-markdown';
import introContent from '@/docs/introduction.md?raw';
import sidebarStructure from '@/docs/structure.json';

type Section = {
  title: string;
  path: string;
  description?: string;
  icon?: string;
  showOnMainPage?: boolean;
  items?: Array<{
    title: string;
    path: string;
    description?: string;
    icon?: string;
  }>;
};

type StructureData = {
  sections: Section[];
  docsIndex: {
    title: string;
    description: string;
    validationFeatures: {
      title: string;
      description: string;
    };
    githubActions: {
      title: string;
      description: string;
      buttonText: string;
    };
    helpSection: {
      title: string;
      nextStepsTitle: string;
      communityLinkFallback: string;
    };
  };
  features?: {
    title: string;
    description: string;
    icon: string;
  }[];
  community?: {
    title: string;
    url: string;
  };
};

const DocsIndex = () => {
  // Get the first three main sections from structure.json to feature on the index page
  const structureData = sidebarStructure as StructureData;
  const featuredSections = structureData.sections.slice(0, 3);
  const validationSections = structureData.sections.filter(section => 
    ['Link Validation', 'Dictionary Validation', 'Style Guide'].includes(section.title)
  );
  
  // Function to get icon component by name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'zap': return <Zap className="h-5 w-5 text-primary" />;
      case 'check': return <Check className="h-5 w-5 text-primary" />;
      case 'shield': return <Shield className="h-5 w-5 text-primary" />;
      default: return <ArrowRight className="h-5 w-5 text-primary" />;
    }
  };
  
  return (
    <div className="square-docs-container animate-fadeIn space-y-8">
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight mb-4">{structureData.docsIndex.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">
          {structureData.docsIndex.description}
        </p>
      </div>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <Markdown>
          {introContent}
        </Markdown>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {featuredSections
          .filter(section => section.items && section.items.length > 0)
          .map((section, index) => (
            section.items && section.items[0] && (
              <Card key={index} className="square-docs-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {section.title}
                  </CardTitle>
                  <CardDescription>
                    {section.items[0].title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {section.items[0].description || `Learn about ${section.title.toLowerCase()} and how to use it in your documentation.`}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to={section.path}>
                    <Button variant="outline" className="gap-1">
                      View {section.title}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          ))}
      </div>

      <div className="space-y-4 mt-10">
        <h2 className="text-2xl font-heading font-semibold border-b pb-2 border-border/50">
          {structureData.docsIndex.validationFeatures.title}
        </h2>
        <p>
          {structureData.docsIndex.validationFeatures.description}
        </p>

        <ul className="mt-6 space-y-4">
          {validationSections.map((section, index) => (
            <li key={index} className="flex gap-4 p-4 rounded-lg border border-border/50 bg-card hover:shadow-sm transition-shadow">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">{section.title}</h3>
                <p className="text-muted-foreground mt-1">
                  {section.description}
                  <Link to={section.path} className="text-primary ml-1 inline-flex items-center hover:underline text-sm">
                    Learn more<ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 pt-6 border-t">
        <h2 className="text-2xl font-heading font-semibold mb-4">{structureData.docsIndex.githubActions.title}</h2>
        <p className="mb-4">
          {structureData.docsIndex.githubActions.description}
        </p>
        <Link to="/docs/github-actions">
          <Button className="gap-2">
            <Github className="h-4 w-4" />
            {structureData.docsIndex.githubActions.buttonText}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between mt-10 pt-6 border-t text-sm">
        <div>
          <p className="text-muted-foreground">{structureData.docsIndex.helpSection.title}</p>
          {structureData.community ? (
            <a href={structureData.community.url} className="text-primary inline-flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
              {structureData.community.title} <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          ) : (
            <a href="#" className="text-primary inline-flex items-center hover:underline">
              {structureData.docsIndex.helpSection.communityLinkFallback} <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">{structureData.docsIndex.helpSection.nextStepsTitle}</p>
          {structureData.sections?.[0]?.items?.[1]?.path && (
            <Link 
              to={structureData.sections[0].items[1].path} 
              className="text-primary inline-flex items-center hover:underline"
            >
              {structureData.sections[0].items[1].title} <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocsIndex;
