
import { passiveVoicePatterns, wordPairs, formalPhrases } from './microsoftStyleRules';

// Define types for style checking
export interface StyleViolation {
  type: 'voice' | 'grammar' | 'verb' | 'other';
  pattern: string;
  suggestion: string;
  line: number;
  context: string;
}

export const checkMicrosoftStyle = (text: string): StyleViolation[] => {
  const violations: StyleViolation[] = [];
  const lines = text.split('\n');
  
  // Check for passive voice patterns
  passiveVoicePatterns.forEach(pattern => {
    lines.forEach((line, lineNumber) => {
      if (line.toLowerCase().includes(pattern.toLowerCase())) {
        violations.push({
          type: 'voice',
          pattern: pattern,
          suggestion: "Use active voice instead of passive voice",
          line: lineNumber + 1,
          context: line
        });
      }
    });
  });
  
  // Check for word pair replacements (e.g., "utilize" -> "use")
  wordPairs.forEach(({ avoid, use }) => {
    const regex = new RegExp(`\\b${avoid}\\b`, 'gi');
    
    lines.forEach((line, lineNumber) => {
      if (regex.test(line)) {
        violations.push({
          type: 'grammar' as const,
          pattern: avoid,
          suggestion: `Use "${use}" instead of "${avoid}"`,
          line: lineNumber + 1,
          context: line
        });
      }
    });
  });
  
  // Check for overly formal phrases
  formalPhrases.forEach(({ phrase, suggestion, type }) => {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    
    lines.forEach((line, lineNumber) => {
      if (regex.test(line)) {
        violations.push({
          type: type as 'voice' | 'grammar' | 'verb' | 'other',
          pattern: phrase,
          suggestion: suggestion,
          line: lineNumber + 1,
          context: line
        });
      }
    });
  });
  
  return violations;
};

// Calculate overall Microsoft style score
export const calculateStyleScore = (text: string): number => {
  const violations = checkMicrosoftStyle(text);
  
  // Basic algorithm: Start with 100 and subtract based on violations
  // More sophisticated scoring can be implemented based on violation types
  const score = Math.max(0, 100 - (violations.length * 5));
  
  return score;
};
