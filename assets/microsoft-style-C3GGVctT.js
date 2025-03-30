const e=`
---
date: 2023-09-15
order: 4
icon: file-text
title: "Microsoft Style"
---

# Microsoft Manual of Style

This guide provides documentation standards based on the Microsoft Manual of Style, a comprehensive resource for technical documentation.

## Core Principles

- **Clarity:** Write content that is easy to understand on the first reading
- **Accuracy:** Ensure all information is technically accurate
- **Completeness:** Provide all necessary information without redundancy
- **Consistency:** Use terminology, formatting, and structures consistently
- **Accessibility:** Create content that works for people of all abilities

## Voice and Tone

### Microsoft Voice Principles

- **Warm and relaxed:** Be natural and approachable, not formal or technical
- **Crisp and clear:** Be concise and make every word count
- **Ready to lend a hand:** Focus on solutions and be supportive
- **Straightforward:** Be direct and get to the point quickly

### Example

**Too formal:** "Installation of the software is required prior to configuration."  
**Microsoft style:** "Install the software before you configure it."

## Terminology

- Use consistent terminology throughout your documentation
- Define acronyms and technical terms on first use
- Use "you" to address the reader directly
- Use "we" only when referring to your organization and the reader together
- Avoid jargon and overly technical language

## Capitalization

- Use sentence-style capitalization for all headings (only capitalize the first word and proper nouns)
- Use title-style capitalization for UI elements as they appear in the UI
- Don't use all caps for emphasis

### Examples

**Heading:** "Set up your development environment"  
**UI element:** "Click the Start button"

## Grammar and Usage

- Use active voice whenever possible
- Use present tense for most content
- Keep sentences short and focused
- Avoid "please" in instructions
- Use gender-neutral language

## Punctuation

- Use serial commas (Oxford commas)
- Use one space after periods, not two
- Use em dashes (—) with no spaces on either side
- Use colons to introduce lists
- Use hyphens in compound modifiers that precede nouns

## Formatting Instructions

- Use imperative voice for procedures (e.g., "Select the file")
- Number steps when they must be performed in order
- Use bullets for options or items that don't need to be performed in order
- Start each step with a clear action verb
- Include one action per step

### Example

**Too vague:** "Now deal with the account settings."  
**Microsoft style:** "Update your account password and security questions."

## Automated Validation

Your documentation can be automatically validated against Microsoft style guidelines using our GitHub Actions workflow. The workflow checks for:

1. Passive voice usage
2. Overly complex words and phrases
3. Inconsistent terminology
4. Undefined acronyms
5. Proper heading capitalization

### Setting Up Microsoft Style Validation

To enable Microsoft style validation in your project:

1. Add the provided GitHub Actions workflow file to your repository
2. Configure the term bank with your project-specific terminology
3. Run the workflow to generate a detailed style report

## Common Style Violations to Avoid

| Common Violation | Microsoft Style Alternative |
|------------------|----------------------------|
| "Users should click on..." | "Select..." |
| "It is recommended that..." | "We recommend that you..." |
| "The data will be processed" | "The system processes the data" |
| "In order to achieve this..." | "To achieve this..." |
| "Please enter your password" | "Enter your password" |
| "Utilize the search function" | "Use the search function" |

## Term Bank

DocuSanity maintains a [term bank](/docs/glossary/term-bank) with approved terminology for consistent documentation. Always reference this term bank when writing documentation to ensure consistency across all content.

## Content Generator

To create documentation that follows the Microsoft Manual of Style, use our content generator tool. It helps ensure your content adheres to these guidelines by:

1. Checking for active voice
2. Highlighting complex sentences
3. Identifying inconsistent terminology
4. Suggesting clearer alternatives to jargon
5. Ensuring proper formatting of procedures

## Additional Resources

- [Microsoft Style Guide (Official)](https://learn.microsoft.com/en-us/style-guide/welcome/)
- [Microsoft Writing Style Guide PDF](https://microsoft.github.io/MicrosoftStyle/)
- [DocuSanity Glossary](/docs/glossary/)
- [Term Bank](/docs/glossary/term-bank)

`;export{e as default};
//# sourceMappingURL=microsoft-style-C3GGVctT.js.map
