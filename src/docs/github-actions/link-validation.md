
---
date: 2023-08-10
icon: zap
description: "Automatically detect and report broken links in your documentation"
title: "Link Validation"
order: 3
---

# Link Validation

Broken links in documentation frustrate users and diminish trust in your content. DocuSanity's link validation feature automatically detects and reports broken links in your documentation.

## Overview

The link validation tool checks both internal and external links in your documentation. It verifies that:

- Internal links point to valid pages within your documentation
- Anchor links (`#section-id`) point to existing sections
- External links are reachable (optional)

## How It Works

When you run link validation, DocuSanity:

1. Parses all Markdown files in your documentation
2. Extracts all links using regular expressions
3. Categorizes links as internal or external
4. Verifies each link's validity
5. Generates a report of broken links

## Configuration

Configure link validation in your `docusanity.config.js` file:

```javascript
module.exports = {
  checks: {
    links: {
      enabled: true,                  // Enable link validation
      excludePaths: ['drafts/**'],    // Exclude specific paths
      checkExternal: true,            // Check external links
      concurrency: 5,                 // Number of concurrent checks
      timeout: 10000,                 // Timeout for external link checks (ms)
      cacheResults: true,             // Cache results to improve performance
      ignorePatterns: [               // Regular expressions for links to ignore
        /^mailto:/,
        /^tel:/,
        /example\.com/
      ]
    }
  }
};
```

## Running Link Validation

You can run link validation in several ways:

### Command Line

```bash
docusanity check links
```

### Programmatically

```javascript
const { Validator } = require('@docusanity/validator');

const validator = new Validator('./docs');
validator.checkLinks()
  .then(results => console.log(results))
  .catch(error => console.error(error));
```

### GitHub Actions

You can also integrate link validation into your CI/CD pipeline using [GitHub Actions](/docs/github-actions).

## Common Issues

- **Absolute vs. Relative Paths**: Be consistent in your approach
- **Case Sensitivity**: Some systems are case-sensitive in path resolution
- **Special Characters**: Ensure URLs with special characters are properly encoded
- **Missing IDs**: Anchor links require corresponding IDs in the document

## Best Practices

- Run link validation before publishing documentation
- Set up automated checks in your CI/CD pipeline
- Regularly validate external links, as they can break over time
- Use relative paths for internal links to maintain portability

Visit [Setting Up Checks](/docs/link-validation/setup) for more detailed configuration information.
