
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
