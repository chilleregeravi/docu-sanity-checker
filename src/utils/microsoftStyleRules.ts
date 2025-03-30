
// Define style rules data structures
export const passiveVoicePatterns = [
  "is being",
  "was",
  "were",
  "has been",
  "have been",
  "had been",
  "will be",
  "being",
  "is used to",
  "are required to",
  "is done",
  "are provided"
];

export const wordPairs = [
  { avoid: "utilize", use: "use", type: "grammar" as const },
  { avoid: "functionality", use: "features", type: "grammar" as const },
  { avoid: "leverage", use: "use", type: "grammar" as const },
  { avoid: "in order to", use: "to", type: "grammar" as const },
  { avoid: "ensure", use: "make sure", type: "grammar" as const },
  { avoid: "employ", use: "use", type: "grammar" as const },
  { avoid: "assistance", use: "help", type: "grammar" as const },
  { avoid: "initiate", use: "start", type: "grammar" as const }
];

export const formalPhrases = [
  { phrase: "please note", suggestion: "Remove 'please note' and state the information directly", type: "voice" as const },
  { phrase: "it is recommended", suggestion: "We recommend", type: "voice" as const },
  { phrase: "it is important to", suggestion: "You need to", type: "voice" as const },
  { phrase: "it should be noted", suggestion: "Note that", type: "voice" as const },
  { phrase: "please be advised", suggestion: "Remove this phrase entirely", type: "voice" as const },
  { phrase: "click on", suggestion: "select", type: "verb" as const },
  { phrase: "tap on", suggestion: "select", type: "verb" as const }
];

/**
 * Transform text to follow Microsoft Style Guide rules
 * 
 * @param text Input text to transform
 * @returns Text following Microsoft style guidelines
 */
export const transformToMicrosoftStyle = (text: string): string => {
  let result = text;
  
  // Apply word pair replacements
  wordPairs.forEach(({ avoid, use }) => {
    const regex = new RegExp(`\\b${avoid}\\b`, 'gi');
    result = result.replace(regex, use);
  });
  
  // Transform passive voice to active voice when possible
  // This is a simplified approach - a complete solution would need NLP
  passiveVoicePatterns.forEach(pattern => {
    // Look for common passive voice patterns and try to convert them
    // This is a basic implementation that won't catch all cases
    const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
    result = result.replace(regex, (match) => {
      // For simplicity, we're just adding a comment about passive voice
      return match + " [consider using active voice]";
    });
  });
  
  // Replace formal phrases with more direct alternatives
  formalPhrases.forEach(({ phrase, suggestion }) => {
    if (suggestion.startsWith("Remove")) {
      // If the suggestion is to remove the phrase entirely
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      result = result.replace(regex, '');
    } else {
      // Replace with the suggested alternative
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      result = result.replace(regex, suggestion);
    }
  });
  
  return result;
};
