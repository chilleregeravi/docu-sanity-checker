
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
  
  // Check if this might be a section landing page
  if (!normalizedPath.includes('/')) {
    // For top-level paths like 'style-guide', 'link-validation', etc.
    // First check if there's an index.md in a subdirectory with this name
    try {
      // We can't dynamically import here to check, but we'll assume the structure
      // This is just for generating GitHub URLs
      if (['style-guide', 'link-validation', 'dictionary-validation', 'configuration'].includes(normalizedPath)) {
        return `${normalizedPath}/index.md`;
      }
    } catch (e) {
      // Fall back to regular path if needed
    }
    
    return `${normalizedPath}.md`;
  }
  
  // If the path contains slashes, convert them to file structure
  return `${normalizedPath.replace(/\//g, '/')}.md`;
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
    if (section.items) {
      allPages.push(section); // Add section overview page
      allPages = [...allPages, ...section.items];
    } else {
      allPages.push(section);
    }
  });
  
  // Find the current page index
  const currentIndex = allPages.findIndex(page => page.path === currentPath);
  
  // If not found or at boundaries, return null
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;
  
  return { prev, next };
};
