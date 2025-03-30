
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import MarkdownRenderer from "@/components/docs/MarkdownRenderer";
import { useToast } from "@/hooks/use-toast";

interface OutputCardProps {
  generatedContent: string;
}

const OutputCard: React.FC<OutputCardProps> = ({ generatedContent }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

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
  );
};

export default OutputCard;
