
/**
 * Utilities for generating and loading sidebar structure
 */
import sidebarStructure from '@/docs/structure.json';
import { SidebarStructure, SectionItem, SidebarItem } from './types';
import { generateNavStructure } from './paths';

/**
 * Generate sidebar structure by loading from static structure.json and enhancing with dynamic file discovery
 */
export const generateSidebarStructure = (): SidebarStructure => {
  // Use the static configuration from structure.json for basic metadata
  const staticStructure = sidebarStructure as any;
  
  try {
    const dynamicSections = generateNavStructure();
    
    // Create sections by merging static metadata with dynamic file discovery
    const sections: SectionItem[] = staticStructure.sections.map((staticSection: any) => {
      // Extract path without /docs/ prefix
      const sectionPath = staticSection.path.replace('/docs/', '').replace('/docs', '');
      const sectionName = sectionPath || 'introduction';
      
      // Find the matching dynamic section info
      const dynamicSection = dynamicSections.find(
        (s: any) => s.path === staticSection.path
      );
      
      // Create the section with merged data
      const newSection: SectionItem = {
        title: staticSection.title,
        path: staticSection.path,
        description: staticSection.description,
        icon: staticSection.icon || 'folder',
        isExpanded: staticSection.isExpanded,
        items: []
      };
      
      // Add child items from dynamic discovery if available
      if (dynamicSection && dynamicSection.items) {
        newSection.items = dynamicSection.items.map((item: any) => ({
          title: item.title,
          path: item.path,
          description: item.description || '',
          order: 999 // Default order if not specified
        }));
      }
      
      return newSection;
    });
    
    return {
      sections: sections
    };
  } catch (error) {
    console.error("Error generating sidebar structure:", error);
    return { sections: [] };
  }
};
