
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InputCard from "@/components/microsoft-style/InputCard";
import OutputCard from "@/components/microsoft-style/OutputCard";
import StyleTipsCard from "@/components/microsoft-style/StyleTipsCard";
import { transformToMicrosoftStyle } from "@/utils/microsoftStyleRules";

const MicrosoftStyleGenerator = () => {
  const [input, setInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Generate content in Microsoft style
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
      const processedText = transformToMicrosoftStyle(input);
      setGeneratedContent(processedText);
      setIsGenerating(false);
      
      toast({
        title: "Content generated",
        description: "Your content has been converted to Microsoft style."
      });
    }, 1500);
  };

  return (
    <>
      <Header />
      <div className="container py-8 pt-24 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Microsoft Style Guide Content Generator</h1>
        <p className="text-muted-foreground mb-8">
          Convert your documentation to follow the Microsoft Manual of Style guidelines.
          This tool applies Microsoft's recommended voice, tone, and formatting to your content.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputCard 
            input={input}
            setInput={setInput}
            isGenerating={isGenerating}
            onGenerate={generateContent}
          />
          
          <OutputCard generatedContent={generatedContent} />
        </div>
        
        <StyleTipsCard />
      </div>
      <Footer />
    </>
  );
};

export default MicrosoftStyleGenerator;
