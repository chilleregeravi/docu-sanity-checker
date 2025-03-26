
// Microsoft style guidelines
export const styleRules = [
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

// Convert text to Microsoft style
export const transformToMicrosoftStyle = (input: string): string => {
  if (!input.trim()) return '';
  
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
  
  return processedLines.join('\n');
};
