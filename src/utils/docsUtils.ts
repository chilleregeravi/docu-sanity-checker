import sidebarStructure from '@/docs/structure.json';

interface SidebarItem {
  title: string;
  path: string;
  icon?: string;
}

interface SectionItem extends SidebarItem {
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
  const structure = sidebarStructure as SidebarStructure;
  let allPages: SidebarItem[] = [];
  
  // Flatten the sidebar structure to get an ordered list of all pages
  structure.sections.forEach(section => {
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
 * Extract the first date from markdown frontmatter or return a default date
 */
export const extractPublishDate = (markdown: string): string => {
  // Look for frontmatter date in format: 
  // ---
  // date: YYYY-MM-DD
  // ---
  const frontmatterMatch = markdown.match(/^---\s+([\s\S]*?)\s+---/);
  
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const dateMatch = frontmatter.match(/date:\s*(\d{4}-\d{2}-\d{2})/);
    
    if (dateMatch) {
      const date = new Date(dateMatch[1]);
      return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
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
 * Extract feature metadata from markdown content
 */
export const extractFeatureMetadata = (markdown: string, path: string): {
  title: string;
  description: string;
  icon: string;
  path: string;
} | null => {
  // Extract title from first heading
  const titleMatch = markdown.match(/^# (.*)/m);
  
  // Extract frontmatter
  const frontmatterMatch = markdown.match(/^---\s+([\s\S]*?)\s+---/);
  
  if (!titleMatch) return null;
  
  let icon = 'arrow-right'; // Default icon
  let description = '';
  
  // Extract description from the first paragraph after the title
  const descriptionMatch = markdown.match(/^# .*\n\n(.*)/m);
  if (descriptionMatch) {
    description = descriptionMatch[1];
  }
  
  // Check for icon in frontmatter if available
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const iconMatch = frontmatter.match(/icon:\s*([a-z-]+)/);
    if (iconMatch) {
      icon = iconMatch[1];
    }
    
    // If no description from first paragraph, check frontmatter
    if (!description) {
      const descriptionFrontmatterMatch = frontmatter.match(/description:\s*"(.*)"/);
      if (descriptionFrontmatterMatch) {
        description = descriptionFrontmatterMatch[1];
      }
    }
  }
  
  return {
    title: titleMatch[1],
    description: description.substring(0, 120) + (description.length > 120 ? '...' : ''),
    icon,
    path
  };
};
