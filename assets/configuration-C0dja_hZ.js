const n=`---
date: 2023-08-15
order: 3
icon: settings
description: "Get detailed reports with actionable recommendations"
title: "Configuration"
---

# Configuration

DocuSanity provides flexible configuration options to customize your documentation website and validation rules. This guide covers all available options and how to use them effectively.

## Configuration File

The main configuration file is \`docusanity.config.js\` located in the root of your project. This file defines global settings for your documentation web site.

### Basic Configuration

\`\`\`javascript
module.exports = {
  title: 'My Documentation',
  description: 'Documentation for my awesome project',
  basePath: '/docs',
  theme: {
    primaryColor: '#3f51b5',
    accentColor: '#f50057',
    darkMode: true,
  },
  checks: {
    links: true,
    dictionary: true,
    styleGuide: true,
  },
  github: {
    repo: 'username/repo',
    branch: 'main',
    editUrl: true,
  },
};
\`\`\`

## Configuration Options

### General Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`title\` | string | 'Documentation' | The title of your documentation site |
| \`description\` | string | '' | A brief description of your documentation |
| \`basePath\` | string | '/docs' | The base URL path for your documentation |
| \`outDir\` | string | 'build' | Output directory for the built site |
| \`favicon\` | string | null | Path to your favicon |

### Theme Configuration

The \`theme\` object allows you to customize the appearance of your documentation site:

\`\`\`javascript
theme: {
  primaryColor: '#3f51b5',      // Primary brand color
  accentColor: '#f50057',       // Accent color for interactive elements
  darkMode: true,               // Enable dark mode toggle
  font: {
    main: 'Inter, sans-serif',  // Main font for text
    code: 'Fira Code, monospace', // Font for code blocks
  },
  logo: {
    light: '/logo-light.svg',   // Logo for light mode
    dark: '/logo-dark.svg',     // Logo for dark mode
  },
}
\`\`\`

### Validation Checks

Configure which validation checks to run on your documentation:

\`\`\`javascript
checks: {
  links: {
    enabled: true,
    excludePaths: ['**/node_modules/**'],
    checkExternal: true,
  },
  dictionary: {
    enabled: true,
    customDictionaries: [
      '.docusanity/dictionaries/technical-terms.json',
    ],
  },
  styleGuide: {
    enabled: true,
    ruleset: '.docusanity/style-rules.json',
  },
}
\`\`\`

### GitHub Integration

Connect your documentation to your GitHub repository:

\`\`\`javascript
github: {
  repo: 'username/repo',        // GitHub repository
  branch: 'main',               // Branch name
  editUrl: true,                // Show "Edit this page" links
  pullRequests: {
    enabled: true,              // Enable PR previews
    label: 'documentation',     // PR label for docs changes
  },
}
\`\`\`

## Environment Variables

DocuSanity also supports configuration through environment variables. These take precedence over the config file settings.

- \`DOCUSANITY_BASE_PATH\`: Override the base path
- \`DOCUSANITY_GITHUB_TOKEN\`: GitHub token for API access
- \`DOCUSANITY_DISABLE_CHECKS\`: Disable all validation checks

## Advanced Configuration

For more advanced use cases, you can create specific configuration files in the \`.docusanity\` directory:

- \`.docusanity/links.config.js\` - Configure link validation
- \`.docusanity/dictionary.config.js\` - Configure dictionary validation
- \`.docusanity/style.config.js\` - Configure style guide rules

## Examples

### Multi-version Documentation

\`\`\`javascript
module.exports = {
  title: 'API Documentation',
  versions: {
    current: 'v2',
    list: ['v1', 'v2', 'next'],
  },
  versioning: {
    path: 'versions',
    hideUnreleasedVersion: true,
  },
};
\`\`\`

### Custom Navigation

\`\`\`javascript
module.exports = {
  navigation: {
    primary: [
      { title: 'Guides', path: '/guides' },
      { title: 'API', path: '/api' },
      { title: 'Examples', path: '/examples' },
    ],
    footer: {
      resources: [
        { title: 'GitHub', url: 'https://github.com/username/repo' },
        { title: 'Support', url: '/support' },
      ],
    },
  },
};
\`\`\`
`;export{n as default};
//# sourceMappingURL=configuration-C0dja_hZ.js.map
