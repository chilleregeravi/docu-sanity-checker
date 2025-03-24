
/**
 * Utilities for handling documentation paths and navigation
 */
import { SidebarItem, SectionItem } from './types';
import { extractTitle, formatSectionTitle, formatPageTitle } from './frontmatter';

/**
 * Get GitHub path for a document
 */
export const getGitHubPath = (path: string): string => {
  // Normalize the path
  let normalizedPath = path || '';
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.substring(1);
  }
  
  // Remove docs prefix if present
  normalizedPath = normalizedPath.replace(/^docs\//, '');
  
  // For empty path, return index
  if (normalizedPath === '') {
    return 'index.md';
  }
  
  // Check if this is a nested path (contains a slash)
  if (normalizedPath.includes('/')) {
    // If it ends with a slash, it's a directory index
    if (normalizedPath.endsWith('/')) {
      return `${normalizedPath}index.md`;
    }
    return `${normalizedPath}.md`;
  }
  
  return `${normalizedPath}/index.md`;
};

/**
 * Normalize a document path for import
 */
export const normalizeDocPath = (path: string): string => {
  let normalizedPath = path || '';
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.substring(1);
  }
  
  // Remove docs prefix if present
  normalizedPath = normalizedPath.replace(/^docs\//, '');
  
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
 * Dynamic markdown import handler
 * This loads markdown files from the docs directory
 */
export const loadMarkdownFile = async (path: string): Promise<string> => {
  try {
    const normalizedPath = normalizeDocPath(path);
    
    // Use dynamic import with glob pattern to find any markdown file
    const modules = import.meta.glob('/src/docs/**/*.md', { as: 'raw' });
    
    // Find matching files based on the normalized path
    let matchingPaths: string[] = [];
    
    for (const modulePath in modules) {
      // Normalize the module path to match our format
      let normalizedModulePath = modulePath
        .replace('/src/docs/', '')
        .replace('.md', '');
      
      // Special case for root index
      if (normalizedModulePath === 'index' && normalizedPath === '') {
        matchingPaths.push(modulePath);
        break;
      } 
      // Exact match for file
      else if (normalizedModulePath === normalizedPath) {
        matchingPaths.push(modulePath);
        break;
      } 
      // Section index file (e.g., github-actions/index)
      else if (normalizedPath && (
        normalizedModulePath === `${normalizedPath}/index` || 
        normalizedModulePath === normalizedPath
      )) {
        matchingPaths.push(modulePath);
        break;
      }
    }
    
    // If no direct match was found, try to find index.md in the requested directory
    if (matchingPaths.length === 0) {
      for (const modulePath in modules) {
        const normalizedModulePath = modulePath
          .replace('/src/docs/', '')
          .replace('.md', '');
        
        // Look for a section's index file as fallback
        if (normalizedPath && normalizedModulePath === `${normalizedPath}/index`) {
          matchingPaths.push(modulePath);
          break;
        }
      }
    }
    
    if (matchingPaths.length === 0) {
      throw new Error(`No markdown file found for path: ${normalizedPath}`);
    }
    
    // Use the first matching file
    const loader = modules[matchingPaths[0]];
    if (!loader) {
      throw new Error(`Could not load module for path: ${matchingPaths[0]}`);
    }
    
    const content = await loader();
    return content;
  } catch (error) {
    console.error('Error loading markdown file:', error);
    throw error;
  }
};

/**
 * Get all available markdown files in the docs directory
 */
export const getAvailableDocFiles = async (): Promise<string[]> => {
  try {
    // Use dynamic import with glob pattern to find any markdown file
    const modules = import.meta.glob('/src/docs/**/*.md', { as: 'raw' });
    
    // Extract paths and normalize them
    return Object.keys(modules).map(path => {
      return path
        .replace('/src/docs/', '')
        .replace('.md', '');
    });
  } catch (error) {
    console.error('Error getting available doc files:', error);
    return [];
  }
};

/**
 * Generate navigation structure by scanning the docs directory
 */
export const generateNavStructure = async () => {
  try {
    const files = await getAvailableDocFiles();
    const sections: Record<string, any> = {};
    
    // Process each file to build the navigation structure
    for (const file of files) {
      // Handle root index file
      if (file === 'index') {
        // Try to load the markdown to get the title
        try {
          const markdownContent = await loadMarkdownFile('');
          const titleFromMarkdown = extractTitle(markdownContent);
          sections['index'] = {
            title: titleFromMarkdown || 'Introduction',
            path: '/docs',
            items: []
          };
        } catch (error) {
          sections['index'] = {
            title: 'Introduction',
            path: '/docs',
            items: []
          };
        }
        continue;
      }
      
      if (file.includes('/')) {
        // This is a section or a nested page
        const [sectionName, ...restPath] = file.split('/');
        const restPathJoined = restPath.join('/');
        
        if (!sections[sectionName]) {
          sections[sectionName] = {
            title: formatSectionTitle(sectionName),
            path: `/docs/${sectionName}`,
            items: []
          };
        }
        
        // If this is not the index file, add it as a child page
        if (restPathJoined && restPathJoined !== 'index') {
          const pageName = restPathJoined.split('/').pop() || '';
          // Try to load the markdown to get the page title
          try {
            const markdownContent = await loadMarkdownFile(`${sectionName}/${restPathJoined}`);
            const titleFromMarkdown = extractTitle(markdownContent);
            sections[sectionName].items.push({
              title: titleFromMarkdown || formatPageTitle(pageName),
              path: `/docs/${sectionName}/${restPathJoined}`
            });
          } catch (error) {
            sections[sectionName].items.push({
              title: formatPageTitle(pageName),
              path: `/docs/${sectionName}/${restPathJoined}`
            });
          }
        }
      } else {
        // This is a top-level page
        // Try to load the markdown to get the page title
        try {
          const markdownContent = await loadMarkdownFile(file);
          const titleFromMarkdown = extractTitle(markdownContent);
          sections[file] = {
            title: titleFromMarkdown || formatPageTitle(file),
            path: `/docs/${file}`,
            items: []
          };
        } catch (error) {
          sections[file] = {
            title: formatPageTitle(file),
            path: `/docs/${file}`,
            items: []
          };
        }
      }
    }
    
    return Object.values(sections);
  } catch (error) {
    console.error('Error generating nav structure:', error);
    return [];
  }
};
