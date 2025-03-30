
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

interface InputCardProps {
  input: string;
  setInput: (value: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

const InputCard: React.FC<InputCardProps> = ({ 
  input, 
  setInput, 
  isGenerating, 
  onGenerate 
}) => {
  return (
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
          onClick={onGenerate} 
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
  );
};

export default InputCard;
