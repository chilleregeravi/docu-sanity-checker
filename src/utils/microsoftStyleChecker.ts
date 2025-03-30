
import { styleRules, transformToMicrosoftStyle } from './microsoftStyleRules';

export interface StyleViolation {
  line: number;
  column: number;
  text: string;
  replacement: string;
  rule: string;
  type: 'voice' | 'grammar' | 'verb' | 'other';
}

export interface StyleCheckResult {
  filePath: string;
  violations: StyleViolation[];
  score: number; // 0-100 compliance score
}

/**
 * Checks a document for Microsoft style guide violations
 */
export const checkMicrosoftStyle = (content: string, filePath: string): StyleCheckResult => {
  const lines = content.split('\n');
  const violations: StyleViolation[] = [];
  
  // Process each line
  lines.forEach((line, lineIndex) => {
    // Skip frontmatter and code blocks
    if (line.trim() === '---' || line.trim().startsWith('```')) {
      return;
    }
    
    // Check against each style rule
    styleRules.forEach(rule => {
      const regex = new RegExp(`\\b${rule.original}\\b`, 'gi');
      let match;
      
      while ((match = regex.exec(line)) !== null) {
        violations.push({
          line: lineIndex + 1,
          column: match.index + 1,
          text: match[0],
          replacement: rule.replacement,
          rule: `Use "${rule.replacement}" instead of "${rule.original}"`,
          type: rule.type
        });
      }
    });
    
    // Check for passive voice patterns
    const passivePatterns = [
      { pattern: /is being ([a-z]+ed)/gi, replacement: 'we are $1ing' },
      { pattern: /was ([a-z]+ed)/gi, replacement: 'you $1' },
      { pattern: /will be ([a-z]+ed)/gi, replacement: 'will $1' },
      { pattern: /has been ([a-z]+ed)/gi, replacement: 'has $1' },
      { pattern: /have been ([a-z]+ed)/gi, replacement: 'have $1' }
    ];
    
    passivePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.pattern.exec(line)) !== null) {
        violations.push({
          line: lineIndex + 1,
          column: match.index + 1,
          text: match[0],
          replacement: pattern.replacement.replace('$1', match[1]),
          rule: 'Use active voice instead of passive voice',
          type: 'voice'
        });
      }
    });
    
    // Check for overly formal language
    const formalPatterns = [
      { pattern: /\b(utilize)\b/gi, replacement: 'use' },
      { pattern: /\b(implementation)\b/gi, replacement: 'set up' },
      { pattern: /\b(functionality)\b/gi, replacement: 'features' },
      { pattern: /\b(leverage)\b/gi, replacement: 'use' },
      { pattern: /\b(in order to)\b/gi, replacement: 'to' }
    ];
    
    formalPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.pattern.exec(line)) !== null) {
        violations.push({
          line: lineIndex + 1,
          column: match.index + 1,
          text: match[0],
          replacement: pattern.replacement,
          rule: 'Use simple language rather than formal language',
          type: 'grammar'
        });
      }
    });
  });
  
  // Calculate compliance score (0-100)
  const score = violations.length === 0 ? 100 : Math.max(0, 100 - violations.length * 2);
  
  return {
    filePath,
    violations,
    score
  };
};

/**
 * Checks a term against the approved term bank
 */
export const checkTerms = (content: string, approvedTerms: Record<string, string>): string[] => {
  const violations: string[] = [];
  
  // Check each term
  Object.entries(approvedTerms).forEach(([preferred, avoid]) => {
    const avoidTerms = avoid.split(',').map(term => term.trim());
    
    avoidTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      if (regex.test(content)) {
        violations.push(`Use "${preferred}" instead of "${term}"`);
      }
    });
  });
  
  return violations;
};

/**
 * Returns suggested improvements based on Microsoft style guidelines
 */
export const getSuggestions = (content: string): string => {
  const improvedContent = transformToMicrosoftStyle(content);
  return improvedContent;
};

