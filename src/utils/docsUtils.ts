
import sidebarStructure from '@/docs/structure.json';
import { useEffect, useState } from 'react';

// Export these interfaces so they can be imported in other files
export interface SidebarItem {
  title: string;
  path: string;
  icon?: string;
  description?: string;
  order?: number;
}

export interface SectionItem extends SidebarItem {
  items?: SidebarItem[];
  isExpanded?: boolean;
}

interface SidebarStructure {
  sections: SectionItem[];
}

/**
 * Find the next and previous pages for navigation
 */
export const getNavigationLinks = (currentPath: string): { 
  prev: SidebarItem | null, 
  next: SidebarItem | null 
} => {
  // Get the dynamically generated sidebar structure
  const sidebar = generateSidebarStructure();
  let allPages: SidebarItem[] = [];
  
  // Flatten the sidebar structure to get an ordered list of all pages
  sidebar.sections.forEach(section => {
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
};

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
 * Get GitHub path for a document
 */
export const getGitHubPath = (path: string): string => {
  // Normalize the path
  let normalizedPath = path || 'introduction';
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.substring(1);
  }
  
  // If the path contains slashes, convert them to file structure
  if (normalizedPath.includes('/')) {
    // For nested paths like "style-guide/writing-rules", create proper GitHub path
    return `${normalizedPath.replace(/\//g, '/')}.md`;
  }
  
  // For top-level paths
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
  return titleMatch ? titleMatch[1] : 'Untitled';
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
  return frontmatter.order || 999; // Default high number if no order specified
};

/**
 * Extract icon from markdown frontmatter
 */
export const extractIcon = (markdown: string): string => {
  const frontmatter = extractFrontmatter(markdown);
  return frontmatter.icon || 'file'; // Default icon if none specified
};

/**
 * Generate sidebar structure by scanning the docs directory
 */
export const generateSidebarStructure = (): SidebarStructure => {
  // Use the static configuration but eventually this would scan the file system
  // For now we'll transform the existing structure to use frontmatter data
  
  // This is a temporary implementation that uses the existing sidebar structure
  // In a real implementation, this would scan the file system
  const structure = sidebarStructure as any;
  
  try {
    const sections: SectionItem[] = [];
    
    // Transform existing sections
    for (const section of structure.sections) {
      const sectionPath = section.path.replace('/docs/', '').replace('/docs', '');
      const sectionPathNormalized = sectionPath || 'introduction';
      
      // Try to load the section index markdown file
      try {
        // This is the path that would be used to dynamically import the markdown
        const markdownImportPath = `@/docs/${sectionPathNormalized === 'introduction' ? 'introduction' : sectionPathNormalized}.md`;
        
        // In a real implementation, we would dynamically import the markdown here
        // For now, we'll use the existing section data
        
        const newSection: SectionItem = {
          title: section.title,
          path: section.path,
          description: section.description,
          icon: section.icon || 'folder',
          isExpanded: section.isExpanded,
          items: []
        };
        
        // Transform child items if they exist
        if (section.items && section.items.length > 0) {
          const items: SidebarItem[] = [];
          
          for (const item of section.items) {
            // Extract relative path
            const itemPath = item.path.replace('/docs/', '').replace('/docs', '');
            
            const newItem: SidebarItem = {
              title: item.title,
              path: item.path,
              description: item.description,
              // In a real implementation, we would extract the order from the markdown
              order: 999 // Default order if not specified
            };
            
            items.push(newItem);
          }
          
          // Sort items by order
          newSection.items = items.sort((a, b) => (a.order || 999) - (b.order || 999));
        }
        
        sections.push(newSection);
      } catch (e) {
        console.error(`Error loading section ${sectionPathNormalized}:`, e);
      }
    }
    
    // Sort sections by order
    const sortedSections = sections.sort((a, b) => (a.order || 999) - (b.order || 999));
    
    return {
      sections: sortedSections
    };
  } catch (error) {
    console.error("Error generating sidebar structure:", error);
    return { sections: [] };
  }
};

/**
 * Hook to load the complete sidebar structure
 */
export const useSidebarStructure = () => {
  const [sidebar, setSidebar] = useState<SidebarStructure>({ sections: [] });
  
  useEffect(() => {
    // Generate the sidebar structure
    const structure = generateSidebarStructure();
    setSidebar(structure);
  }, []);
  
  return sidebar;
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
