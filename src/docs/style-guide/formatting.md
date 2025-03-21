
# Formatting Guidelines

Proper formatting enhances readability and ensures a consistent look and feel throughout the documentation. This guide covers formatting rules for DocuSanity documentation.

## Markdown Usage

DocuSanity documentation uses Markdown for formatting. Follow these guidelines for consistent formatting:

### Headings

- Use `#` for main titles (H1)
- Use `##` for section headings (H2)
- Use `###` for subsection headings (H3)
- Use `####` for minor headings (H4)
- Leave a blank line before and after headings
- Don't skip heading levels (e.g., don't go from H2 to H4)

### Lists

- Use `-` for unordered lists
- Use `1.` for ordered lists
- Indent nested lists with two spaces
- Leave a blank line before and after lists

### Code Blocks

- Use triple backticks (```) for code blocks
- Specify the language for syntax highlighting
- Use inline code formatting (`code`) for references to code within text

### Links

- Use `[link text](URL)` for links
- Use relative paths for internal documentation links
- Use absolute URLs for external links

### Images

- Use `![alt text](image-path "Optional title")` for images
- Always include descriptive alt text
- Keep image file sizes reasonable (optimize before including)
- Place images in an `assets` or `images` directory

## Examples

### Headings Example

```markdown
# Main Title

## Section Heading

Content goes here.

### Subsection Heading

More content goes here.
```

### Lists Example

```markdown
Benefits of DocuSanity:

- Automatic link validation
- Custom dictionary support
- Style guide enforcement

Steps to install:

1. Clone the repository
2. Install dependencies
3. Configure settings
   - Basic settings
   - Advanced options
4. Run the application
```

### Code Example

```markdown
Install the package with npm:

```bash
npm install @docusanity/core
```

Then import it in your project:

```javascript
import { DocuSanity } from '@docusanity/core';
```
```

## Page Structure

Follow this general structure for documentation pages:

1. **Title (H1)** - Clear, concise page title
2. **Introduction** - Brief overview of the topic (1-2 paragraphs)
3. **Main Content** - Organized with headings (H2) and subheadings (H3)
4. **Examples** - Practical examples with code blocks where appropriate
5. **Related Information** - Links to related documentation
6. **Next Steps** - What to read next, if applicable

## Special Formatting

### Callouts

Use blockquotes to create callouts for important information:

```markdown
> **Note:** This is important information the reader should be aware of.

> **Warning:** This highlights potential issues or gotchas.

> **Tip:** This provides helpful advice for better results.
```

### Tables

Use tables sparingly and only when information benefits from tabular organization:

```markdown
| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| enabled | boolean | true | Enables the feature |
| path | string | '/docs' | Base path for docs |
| debug | boolean | false | Enables debug mode |
```

## Consistency Checks

DocuSanity can validate your formatting against these guidelines. Configure formatting validation in your `docusanity.config.js` file:

```javascript
module.exports = {
  checks: {
    formatting: {
      enabled: true,
      rules: {
        headings: true,
        codeBlocks: true,
        lists: true
      }
    }
  }
};
```
