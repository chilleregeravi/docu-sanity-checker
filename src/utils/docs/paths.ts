
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
  
  // For section landing pages, return the index file
  if (['style-guide', 'link-validation', 'dictionary-validation', 'github-actions'].includes(normalizedPath)) {
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
    
    if (section.items) {
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

/**
 * Get the available documentation files from context imports
 * Note: In a real app, this would scan the filesystem, but we're limited to the import context in browser environments
 */
export const getAvailableDocFiles = (): string[] => {
  // This list represents all markdown files we have in the project
  // In a real implementation, we would scan the file system
  return [
    'introduction',
    'style-guide/index',
    'style-guide/writing-rules',
    'style-guide/formatting',
    'link-validation/index',
    'dictionary-validation/index',
    'github-actions/index',
    'contributing',
    'faq'
  ];
};

/**
 * Generate navigation structure from available file paths
 * In a real app, this would analyze frontmatter, but here we'll infer from paths
 */
export const generateNavStructure = () => {
  const files = getAvailableDocFiles();
  const sections: Record<string, any> = {};
  
  // First, create section entries
  files.forEach(file => {
    if (file.includes('/')) {
      // This is a section or a nested page
      const [sectionName] = file.split('/');
      
      if (!sections[sectionName]) {
        sections[sectionName] = {
          title: formatSectionTitle(sectionName),
          path: `/docs/${sectionName}`,
          items: []
        };
      }
      
      // If this is not the index file, add it as a child page
      if (!file.endsWith('/index')) {
        const pageName = file.split('/').pop() || '';
        sections[sectionName].items.push({
          title: formatPageTitle(pageName),
          path: `/docs/${file}`.replace('/index', '')
        });
      }
    } else {
      // This is a top-level page
      sections[file] = {
        title: formatPageTitle(file),
        path: `/docs/${file}`,
        items: []
      };
    }
  });
  
  return Object.values(sections);
};

/**
 * Format section title from path
 */
const formatSectionTitle = (path: string): string => {
  // Convert kebab-case to Title Case
  return path
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format page title from path
 */
const formatPageTitle = (path: string): string => {
  // Convert kebab-case to Title Case
  return path
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
