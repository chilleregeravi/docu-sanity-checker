
// Approved terms from the term bank
export const approvedTerms: Record<string, string> = {
  'select': 'click, tap, press',
  'configuration': 'config, setup',
  'documentation': 'docs, papers',
  'validate': 'check, verify',
  'style guide': 'style rules, guidelines',
  'Microsoft style': 'MS style',
  'GitHub Actions': 'GH Actions, Actions',
  // Technical terms
  'Markdown': 'markup',
  'frontmatter': 'YAML header, metadata',
  'CI/CD': 'pipeline',
  'linting': 'checking',
  'validator': 'checker'
};

/**
 * Validates all terms in content against the approved term bank
 */
export const validateTerms = (content: string): { violations: string[], score: number } => {
  const violations: string[] = [];
  
  Object.entries(approvedTerms).forEach(([preferred, avoid]) => {
    const avoidTerms = avoid.split(',').map(term => term.trim());
    
    avoidTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      if (regex.test(content)) {
        violations.push(`Use "${preferred}" instead of "${term}"`);
      }
    });
  });
  
  // Calculate compliance score
  const score = violations.length === 0 ? 100 : Math.max(0, 100 - violations.length * 5);
  
  return {
    violations,
    score
  };
};

/**
 * Checks acronyms to ensure they are defined on first use
 */
export const checkAcronyms = (content: string): { violations: string[] } => {
  const acronyms = [
    { acronym: 'CI/CD', fullForm: 'Continuous Integration/Continuous Deployment' },
    { acronym: 'API', fullForm: 'Application Programming Interface' },
    { acronym: 'UI', fullForm: 'User Interface' },
    { acronym: 'CLI', fullForm: 'Command Line Interface' },
    { acronym: 'PR', fullForm: 'Pull Request' }
  ];
  
  const violations: string[] = [];
  
  acronyms.forEach(({ acronym, fullForm }) => {
    // Check if acronym is used
    const acronymRegex = new RegExp(`\\b${acronym}\\b`, 'g');
    if (acronymRegex.test(content)) {
      // Check if the full form is defined before using the acronym
      const fullFormRegex = new RegExp(`${fullForm}\\s+\\(${acronym}\\)`, 'i');
      if (!fullFormRegex.test(content)) {
        violations.push(`Acronym "${acronym}" is used without defining its full form "${fullForm}" on first use.`);
      }
    }
  });
  
  return {
    violations
  };
};

/**
 * Applies term bank standardization to content
 */
export const standardizeTerms = (content: string): string => {
  let standardizedContent = content;
  
  Object.entries(approvedTerms).forEach(([preferred, avoid]) => {
    const avoidTerms = avoid.split(',').map(term => term.trim());
    
    avoidTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      standardizedContent = standardizedContent.replace(regex, preferred);
    });
  });
  
  return standardizedContent;
};

