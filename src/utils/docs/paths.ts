
/**
 * Utilities for handling documentation paths and navigation
 */
import { SidebarItem } from './types';

/**
 * Get GitHub path for a document
 */
export const getGitHubPath = (path: string): string => {
  // Normalize the path
  let normalizedPath = path || 'introduction';
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.substring(1);
  }
  
  // Check if this is a nested path (contains a slash)
  if (normalizedPath.includes('/')) {
    return `${normalizedPath}.md`;
  }
  
  // Check if this might be a section landing page
  // For top-level paths like 'style-guide', 'link-validation', etc.
  // First check if there's an index.md in a subdirectory with this name
  if (['style-guide', 'link-validation', 'dictionary-validation', 'configuration', 'github-actions'].includes(normalizedPath)) {
    return `${normalizedPath}/index.md`;
  }
  
  return `${normalizedPath}.md`;
};

/**
 * Normalize a document path for import
 */
export const normalizeDocPath = (path: string): string => {
  let normalizedPath = path || 'introduction';
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.substring(1);
  }
  
  // Removing any trailing slashes
  if (normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.substring(0, normalizedPath.length - 1);
  }
  
  return normalizedPath;
};

/**
 * Find the next and previous pages for navigation
 */
export const getNavigationLinks = (currentPath: string, sidebarStructure: any): { 
  prev: SidebarItem | null, 
  next: SidebarItem | null 
} => {
  let allPages: SidebarItem[] = [];
  
  // Flatten the sidebar structure to get an ordered list of all pages
  sidebarStructure.sections.forEach((section: any) => {
    allPages.push(section); // Add section overview page
    
    // Add specific paths for section child pages
    if (section.title === "Style Guide") {
      allPages.push({ 
        title: "Writing Rules", 
        path: "/docs/style-guide/writing-rules",
        description: "Guidelines for language, tone, and structure"
      });
      allPages.push({ 
        title: "Formatting", 
        path: "/docs/style-guide/formatting",
        description: "Standards for markdown formatting, code blocks, and images"
      });
    } else if (section.items) {
      section.items.forEach((item: SidebarItem) => {
        allPages.push(item);
      });
    }
  });
  
  // Find the current page index
  const currentIndex = allPages.findIndex(page => page.path === currentPath);
  
  // If not found or at boundaries, return null
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;
  
  return { prev, next };
};
