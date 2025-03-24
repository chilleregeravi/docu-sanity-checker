
/**
 * Utilities for generating and loading sidebar structure
 */
import sidebarStructure from '@/docs/structure.json';
import { SidebarStructure, SectionItem, SidebarItem } from './types';

/**
 * Generate sidebar structure by loading from the static structure.json
 * In a real app, this could scan the file system.
 */
export const generateSidebarStructure = (): SidebarStructure => {
  // Use the static configuration but eventually this would scan the file system
  const structure = sidebarStructure as any;
  
  try {
    const sections: SectionItem[] = [];
    
    // Transform existing sections
    for (const section of structure.sections) {
      const sectionPath = section.path.replace('/docs/', '').replace('/docs', '');
      const sectionPathNormalized = sectionPath || 'introduction';
      
      // Create the section 
      try {
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
