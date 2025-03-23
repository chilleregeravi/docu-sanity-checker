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
 * Extract title from markdown content
 */
export const extractTitle = (markdown: string): string => {
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
  // Remove frontmatter first
  const contentWithoutFrontmatter = markdown.replace(/^---[\s\S]+?---\s*/m, '');
  
  // Find the first paragraph after the title
  // This regex looks for the first heading, then captures the first paragraph after it
  const descriptionMatch = contentWithoutFrontmatter.match(/^# .*\n\n(.*?)(\n\n|$)/ms);
  
  // If found, return it, otherwise check frontmatter for description
  if (descriptionMatch && descriptionMatch[1]) {
    return descriptionMatch[1].trim();
  }
  
  // If no paragraph found after title, try frontmatter
  const frontmatterMatch = markdown.match(/^---\s+([\s\S]*?)\s+---/m);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const descriptionMatch = frontmatter.match(/description:\s*["']?(.*?)["']?(\n|$)/m);
    if (descriptionMatch && descriptionMatch[1]) {
      return descriptionMatch[1].trim();
    }
  }
  
  return '';
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
  const title = extractTitle(markdown);
  const description = extractDescription(markdown);
  
  // Extract frontmatter
  const frontmatterMatch = markdown.match(/^---\s+([\s\S]*?)\s+---/m);
  
  let icon = 'arrow-right'; // Default icon
  
  // Check for icon in frontmatter if available
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const iconMatch = frontmatter.match(/icon:\s*([a-z-]+)/);
    if (iconMatch) {
      icon = iconMatch[1];
    }
  }
  
  return {
    title,
    description: description.substring(0, 120) + (description.length > 120 ? '...' : ''),
    icon,
    path
  };
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
  
  return {
    ...section,
    title: title || section.title,
    description: description || section.description,
  };
};
