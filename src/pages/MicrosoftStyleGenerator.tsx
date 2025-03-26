
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Check, Copy, RefreshCw } from "lucide-react";
import MarkdownRenderer from "@/components/docs/MarkdownRenderer";

const MicrosoftStyleGenerator = () => {
  const [input, setInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Microsoft style guidelines
  const styleRules = [
    { type: 'voice', original: 'It is necessary to', replacement: 'You need to' },
    { type: 'voice', original: 'Users should', replacement: 'You should' },
    { type: 'voice', original: 'Please ', replacement: '' },
    { type: 'voice', original: 'We recommend', replacement: 'We recommend that you' },
    { type: 'voice', original: 'It is recommended', replacement: 'We recommend' },
    { type: 'grammar', original: 'in order to', replacement: 'to' },
    { type: 'grammar', original: 'utilize', replacement: 'use' },
    { type: 'grammar', original: 'functionality', replacement: 'features' },
    { type: 'grammar', original: 'leverage', replacement: 'use' },
    { type: 'verb', original: 'Click on', replacement: 'Select' },
    { type: 'verb', original: 'Tap on', replacement: 'Select' },
  ];

  // Apply Microsoft style to text
  const generateContent = () => {
    if (!input.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some content to convert to Microsoft style.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate processing time (in a real app, this might be an API call)
    setTimeout(() => {
      let processedText = input;
      
      // Apply style rules
      styleRules.forEach(rule => {
        const regex = new RegExp(rule.original, 'gi');
        processedText = processedText.replace(regex, rule.replacement);
      });
      
      // Convert passive voice patterns to active voice (simplified example)
      processedText = processedText.replace(/is being ([a-z]+ed)/gi, 'we are $1ing');
      processedText = processedText.replace(/was ([a-z]+ed)/gi, 'you $1');
      processedText = processedText.replace(/will be ([a-z]+ed)/gi, 'will $1');
      
      // Format procedures and lists
      const lines = processedText.split('\n');
      const processedLines = lines.map(line => {
        // Convert bullet points to numbered steps if they start with action verbs
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          const content = line.trim().substring(2);
          // Check if it starts with an action verb (simplified check)
          const firstWord = content.split(' ')[0];
          if (firstWord.endsWith('ing')) {
            // Convert to imperative form
            const imperative = firstWord.substring(0, firstWord.length - 3);
            return `1. ${imperative}${content.substring(firstWord.length)}`;
          }
        }
        return line;
      });
      
      setGeneratedContent(processedLines.join('\n'));
      setIsGenerating(false);
      
      toast({
        title: "Content generated",
        description: "Your content has been converted to Microsoft style."
      });
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The generated content has been copied to your clipboard."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Microsoft Style Guide Content Generator</h1>
      <p className="text-muted-foreground mb-8">
        Convert your documentation to follow the Microsoft Manual of Style guidelines.
        This tool applies Microsoft's recommended voice, tone, and formatting to your content.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Input Content</CardTitle>
            <CardDescription>
              Enter your original content below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your technical documentation here. For example: 'It is necessary for users to install the software prior to configuration.'"
              className="min-h-[300px]"
            />
          </CardContent>
          <CardFooter>
            <Button 
              onClick={generateContent} 
              disabled={isGenerating || !input.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : "Convert to Microsoft Style"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>
              Microsoft Style Guide compliant output
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview">
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="markdown">Markdown</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="min-h-[300px] border rounded-md p-4">
                {generatedContent ? (
                  <MarkdownRenderer content={generatedContent} />
                ) : (
                  <div className="text-muted-foreground text-center h-full flex items-center justify-center">
                    Generated content will appear here
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="markdown" className="min-h-[300px]">
                {generatedContent ? (
                  <Textarea 
                    value={generatedContent}
                    readOnly
                    className="min-h-[300px] font-mono text-sm"
                  />
                ) : (
                  <div className="text-muted-foreground text-center h-full flex items-center justify-center border rounded-md p-4">
                    Generated markdown will appear here
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={copyToClipboard} 
              disabled={!generatedContent} 
              variant="outline" 
              className="w-full"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Microsoft Style Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Core Principles</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Use active voice, not passive</li>
                <li>Address the reader directly using "you"</li>
                <li>Be concise and conversational</li>
                <li>Use sentence-style capitalization in headings</li>
                <li>Avoid using "please" in instructions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Common Transformations</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Instead of</div>
                  <div className="font-medium">Use</div>
                  <div className="text-red-500">It is necessary to configure...</div>
                  <div className="text-green-500">You need to configure...</div>
                  <div className="text-red-500">Users should be aware...</div>
                  <div className="text-green-500">You should be aware...</div>
                  <div className="text-red-500">Click on the button</div>
                  <div className="text-green-500">Select the button</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MicrosoftStyleGenerator;
