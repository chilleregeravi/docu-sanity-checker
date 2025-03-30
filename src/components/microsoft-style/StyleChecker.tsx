
import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { checkMicrosoftStyle, StyleViolation } from '@/utils/microsoftStyleChecker';
import { validateTerms, checkAcronyms, standardizeTerms } from '@/utils/termBankUtils';
import StyleTipsCard from './StyleTipsCard';

const StyleChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<{
    styleViolations: StyleViolation[],
    termViolations: string[],
    acronymViolations: string[],
    styleScore: number,
    termScore: number,
    improvedText: string
  } | null>(null);

  const handleCheck = () => {
    if (!text.trim()) return;

    // Run Microsoft style check
    const styleResult = checkMicrosoftStyle(text, 'input.md');
    
    // Run term bank check
    const termResult = validateTerms(text);
    
    // Run acronym check
    const acronymResult = checkAcronyms(text);
    
    // Get improved text
    const improvedText = standardizeTerms(text);
    
    setResults({
      styleViolations: styleResult.violations,
      termViolations: termResult.violations,
      acronymViolations: acronymResult.violations,
      styleScore: styleResult.score,
      termScore: termResult.score,
      improvedText
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Microsoft Style Checker</CardTitle>
          <CardDescription>
            Enter your text below to check for compliance with the Microsoft Manual of Style
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your documentation text here..."
            rows={10}
            className="w-full font-mono text-sm"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleCheck} disabled={!text.trim()}>
            Check Style
          </Button>
        </CardFooter>
      </Card>

      {results && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Results
                <div className="flex gap-2">
                  <Badge variant={results.styleScore >= 90 ? "default" : results.styleScore >= 70 ? "secondary" : "destructive"}>
                    Style: {results.styleScore}/100
                  </Badge>
                  <Badge variant={results.termScore >= 90 ? "default" : results.termScore >= 70 ? "secondary" : "destructive"}>
                    Terminology: {results.termScore}/100
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.styleViolations.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Style Violations ({results.styleViolations.length})</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {results.styleViolations.map((violation, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{violation.rule}</span>
                        <div className="ml-6 mt-1">
                          <span className="text-red-500">Found: "{violation.text}"</span>
                          <br />
                          <span className="text-green-500">Suggestion: "{violation.replacement}"</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.termViolations.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Term Bank Violations ({results.termViolations.length})</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {results.termViolations.map((violation, index) => (
                      <li key={index} className="text-sm">{violation}</li>
                    ))}
                  </ul>
                </div>
              )}

              {results.acronymViolations.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Acronym Violations ({results.acronymViolations.length})</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {results.acronymViolations.map((violation, index) => (
                      <li key={index} className="text-sm">{violation}</li>
                    ))}
                  </ul>
                </div>
              )}

              {results.styleViolations.length === 0 && 
               results.termViolations.length === 0 && 
               results.acronymViolations.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-green-500 font-medium">No violations found! Your text follows Microsoft style guidelines.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {(results.styleViolations.length > 0 || results.termViolations.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>Improved Text</CardTitle>
                <CardDescription>Here's your text with style improvements applied:</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={results.improvedText}
                  readOnly
                  rows={10}
                  className="w-full font-mono text-sm"
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setText(results.improvedText)}>
                  Use Improved Text
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}

      <StyleTipsCard />
    </div>
  );
};

export default StyleChecker;
