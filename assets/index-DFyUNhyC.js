const n=`---
date: 2023-08-01
icon: check
description: "Ensure consistent writing style across all documentation"
title: "Overview"
order: 1
---

# Style Guide Overview

This guide outlines the writing and formatting standards for DocuSanity documentation. Following these guidelines ensures consistency across all documentation.

## Purpose

The style guide serves multiple purposes:

- Ensures consistency in tone, voice, and formatting
- Makes documentation easier to read and understand
- Simplifies the process of writing and editing documentation
- Helps maintain a professional appearance

## Getting Started

To start using the style guide, familiarize yourself with the following sections:

- [Writing Rules](/docs/style-guide/writing-rules) - Guidelines for language, tone, and structure
- [Formatting](/docs/style-guide/formatting) - Standards for markdown formatting, code blocks, and images

## Style Guide Validation

DocuSanity can automatically validate your documentation against this style guide. To enable validation:

\`\`\`javascript
module.exports = {
  checks: {
    styleGuide: {
      enabled: true,
      ruleset: '.docusanity/style-rules.json'
    }
  }
}
\`\`\`

## Common Issues

Here are some common style issues to watch for:

1. Inconsistent capitalization in headings
2. Mixed usage of first-person and second-person perspective
3. Unclear or vague instructions
4. Lack of code examples where needed
5. Overly complex sentence structures

Always review your documentation against these common issues before submitting.
`;export{n as default};
//# sourceMappingURL=index-DFyUNhyC.js.map
