
/**
 * Utilities for extracting and processing frontmatter from markdown content
 */
import { SectionItem } from './types';

/**
 * Extract data from markdown frontmatter
 */
export const extractFrontmatter = (markdown: string): Record<string, any> => {
  const frontmatterMatch = markdown.match(/^---\s+([\s\S]*?)\s+---/m);
  if (!frontmatterMatch) return {};
  
  const frontmatter = frontmatterMatch[1];
  const result: Record<string, any> = {};
  
  // Extract key-value pairs
  const lines = frontmatter.split('\n');
  
  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;
    
    // Match key: value pattern
    const match = line.match(/^([^:]+):\s*(.+)$/);
    if (match) {
      const [_, key, value] = match;
      
      // Try to parse as number if it looks like one
      if (/^\d+(\.\d+)?$/.test(value.trim())) {
        result[key.trim()] = parseFloat(value.trim());
      } else if (value.trim() === 'true') {
        result[key.trim()] = true;
      } else if (value.trim() === 'false') {
        result[key.trim()] = false;
      } else {
        // Remove quotes if present
        result[key.trim()] = value.trim().replace(/^["'](.*)["']$/, '$1');
      }
    }
  }
  
  return result;
}

/**
 * Extract the first date from markdown frontmatter or return a default date
 */
export const extractPublishDate = (markdown: string): string => {
  const frontmatter = extractFrontmatter(markdown);
  
  if (frontmatter.date) {
    const date = new Date(frontmatter.date);
    return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  
  // Default date if no date is found
  return "January 1, 2023";
};

/**
 * Extract title from markdown content
 */
export const extractTitle = (markdown: string): string => {
  // Check frontmatter for title first
  const frontmatter = extractFrontmatter(markdown);
  if (frontmatter.title) return frontmatter.title;
  
  // Remove frontmatter first
  const contentWithoutFrontmatter = markdown.replace(/^---[\s\S]+?---\s*/m, '');
  
  // Look for the first heading (# Title)
  const titleMatch = contentWithoutFrontmatter.match(/^# (.*)/m);
  return titleMatch ? titleMatch[1] : '';
};

/**
 * Extract description from markdown content
 * Takes the first paragraph after the title
 */
export const extractDescription = (markdown: string): string => {
  // Check frontmatter for description first
  const frontmatter = extractFrontmatter(markdown);
  if (frontmatter.description) return frontmatter.description;
  
  // Remove frontmatter first
  const contentWithoutFrontmatter = markdown.replace(/^---[\s\S]+?---\s*/m, '');
  
  // Find the first paragraph after the title
  // This regex looks for the first heading, then captures the first paragraph after it
  const descriptionMatch = contentWithoutFrontmatter.match(/^# .*\n\n(.*?)(\n\n|$)/ms);
  
  if (descriptionMatch && descriptionMatch[1]) {
    return descriptionMatch[1].trim();
  }
  
  return '';
};

/**
 * Extract order from markdown frontmatter
 */
export const extractOrder = (markdown: string): number => {
  const frontmatter = extractFrontmatter(markdown);
  return typeof frontmatter.order === 'number' ? frontmatter.order : 999; // Default high number if no order specified
};

/**
 * Extract icon from markdown frontmatter
 */
export const extractIcon = (markdown: string): "file" | "folder" => {
  const frontmatter = extractFrontmatter(markdown);
  const iconValue = frontmatter.icon || 'file';
  
  // Make sure we only return valid icon types
  return iconValue === 'folder' ? 'folder' : 'file';
};

/**
 * Update section title and description from markdown content
 */
export const updateSectionFromMarkdown = (
  section: SectionItem, 
  markdown: string
): SectionItem => {
  const title = extractTitle(markdown);
  const description = extractDescription(markdown);
  const icon = extractIcon(markdown);
  const order = extractOrder(markdown);
  
  return {
    ...section,
    title: title || section.title,
    description: description || section.description,
    icon: icon || section.icon,
    order: order || section.order
  };
};

/**
 * Load markdown file (re-exported from paths.ts)
 */
export { loadMarkdownFile } from './paths';
