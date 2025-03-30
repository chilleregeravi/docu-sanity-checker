
import React, { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import { Separator } from '@/components/ui/separator';
import InputCard from '@/tools/microsoft-style/InputCard';
import OutputCard from '@/tools/microsoft-style/OutputCard';
import StyleChecker from '@/tools/microsoft-style/StyleChecker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { transformToMicrosoftStyle } from '@/utils/microsoftStyleRules';

const MicrosoftStyleGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Use the transformToMicrosoftStyle function to convert the input
    try {
      const transformed = transformToMicrosoftStyle(input);
      setGeneratedContent(transformed);
    } catch (error) {
      console.error("Error transforming text:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Microsoft Style Generator</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Convert your documentation to Microsoft style or check your content against style guidelines
        </p>
        
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="checker">Style Checker</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputCard 
                input={input}
                setInput={setInput}
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
              />
              <OutputCard generatedContent={generatedContent} />
            </div>
          </TabsContent>
          
          <TabsContent value="checker" className="mt-6">
            <StyleChecker />
          </TabsContent>
        </Tabs>
        
        <Separator className="my-10" />
        
        <div className="prose prose-blue dark:prose-invert max-w-none">
          <h2>About Microsoft Style</h2>
          <p>
            The Microsoft Style Guide provides guidelines for content creation that's clear, 
            concise, and consistent. Our Microsoft Style Generator helps you transform your 
            documentation to follow these guidelines automatically.
          </p>
          
          <h3>Key Microsoft Style Principles</h3>
          <ul>
            <li>
              <strong>Use active voice:</strong> Active voice makes your writing clearer and more direct.
            </li>
            <li>
              <strong>Address the reader directly:</strong> Use "you" instead of "users" or "they."
            </li>
            <li>
              <strong>Be concise:</strong> Use simple words and phrases instead of complex ones.
            </li>
            <li>
              <strong>Use sentence-style capitalization:</strong> Only capitalize the first word and proper nouns in headings.
            </li>
            <li>
              <strong>Avoid jargon:</strong> Use plain language that's easy to understand.
            </li>
          </ul>
          
          <p>
            For more information, visit our <a href="/docs/style-guide/microsoft-style">Microsoft Style Guide</a> or 
            consult the <a href="https://learn.microsoft.com/style-guide/" target="_blank" rel="noopener noreferrer">
            official Microsoft Style Guide</a>.
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default MicrosoftStyleGenerator;
