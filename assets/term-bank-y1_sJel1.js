const n=`
---
date: 2023-09-20
icon: file-text
description: "Approved terminology for consistent documentation"
title: "Term Bank"
order: 2
---

# Term Bank

This term bank contains the official terminology to be used in all DocuSanity documentation. Using consistent terminology helps ensure clarity and prevents confusion.

## Preferred Terms

| Preferred Term | Avoid Using | Notes |
|----------------|-------------|-------|
| select | click, tap | Use "select" for all UI interactions regardless of device |
| configuration | config, setup | Use "configuration" in most contexts |
| documentation | docs, papers | Always use the full term "documentation" |
| validate | check, verify | Use "validate" when referring to documentation checks |
| style guide | style rules, guidelines | Use "style guide" as the proper term |
| Microsoft style | MS style | Always use the full term "Microsoft style" |
| GitHub Actions | GH Actions, Actions | Use the full product name "GitHub Actions" |

## Technical Terms

| Term | Definition | Usage Example |
|------|------------|---------------|
| Markdown | A lightweight markup language | "Write your documentation in Markdown format." |
| frontmatter | YAML metadata at the top of Markdown files | "Add the publication date in the frontmatter." |
| CI/CD | Continuous Integration/Continuous Deployment | "Set up CI/CD using GitHub Actions." |
| linting | Process of checking code for stylistic errors | "Run linting on your documentation files." |
| validator | Tool that checks for errors | "The DocuSanity validator checks your documentation." |

## Abbreviations and Acronyms

Always spell out acronyms on first use in each document, followed by the acronym in parentheses.

| Acronym | Full Term | Notes |
|---------|-----------|-------|
| CI/CD | Continuous Integration/Continuous Deployment | Spell out on first use |
| API | Application Programming Interface | Spell out on first use |
| UI | User Interface | Spell out on first use |
| CLI | Command Line Interface | Spell out on first use |
| PR | Pull Request | Spell out on first use |

## Capitalization Rules

- Use sentence case for headings (capitalize only the first word and proper nouns)
- Use title case for product names (DocuSanity, GitHub Actions)
- Use lowercase for general terms (documentation, validation, linting)
- Follow UI capitalization exactly as it appears in the interface

## Versioning Terminology

| Term | Definition | Usage Example |
|------|------------|---------------|
| Major version | Version that introduces breaking changes | "DocuSanity 2.0 is a major version update." |
| Minor version | Version that adds functionality without breaking changes | "DocuSanity 1.2 adds new features." |
| Patch version | Version that fixes bugs without adding functionality | "DocuSanity 1.1.3 fixes critical bugs." |

## Using the Term Bank

When writing documentation:

1. Consult this term bank before introducing new terminology
2. Use the preferred terms consistently throughout your documentation
3. Follow the capitalization rules for all terms
4. Spell out acronyms on first use in each document

For terms not found in this bank, consult the Microsoft Manual of Style or submit a request to add a new term.

`;export{n as default};
//# sourceMappingURL=term-bank-y1_sJel1.js.map
