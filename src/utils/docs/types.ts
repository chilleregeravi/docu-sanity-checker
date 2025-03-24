
/**
 * Type definitions for the documentation system
 */

export interface SidebarItem {
  title: string;
  path: string;
  icon?: 'file' | 'folder';
  description?: string;
  order?: number;
}

export interface SectionItem extends SidebarItem {
  items?: SidebarItem[];
  isExpanded?: boolean;
}

export interface SidebarStructure {
  sections: SectionItem[];
}
