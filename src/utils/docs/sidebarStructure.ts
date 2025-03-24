
/**
 * Utilities for generating and loading sidebar structure
 */
import sidebarStructure from '@/docs/structure.json';
import { SidebarStructure, SectionItem, SidebarItem } from './types';
import { generateNavStructure } from './paths';

/**
 * Generate sidebar structure by scanning the docs directory
 */
export const generateSidebarStructure = async (): Promise<SidebarStructure> => {
  try {
    // Get dynamic sections from file structure
    const dynamicSections = await generateNavStructure();
    
    // Load static metadata from structure.json
    const staticStructure = sidebarStructure as any;
    
    // Create a map of section paths to their static metadata
    const sectionMetadataMap: Record<string, any> = {};
    
    if (staticStructure.sections && Array.isArray(staticStructure.sections)) {
      staticStructure.sections.forEach((section: any) => {
        const path = section.path.replace(/^\/docs\//, '').replace(/^\/docs$/, '');
        sectionMetadataMap[path || 'index'] = {
          title: section.title,
          description: section.description,
          icon: section.icon || 'file',
          isExpanded: section.isExpanded || false
        };
      });
    }
    
    // Enhance dynamic sections with static metadata where available
    const enhancedSections: SectionItem[] = dynamicSections.map((section: any) => {
      const sectionPath = section.path.replace(/^\/docs\//, '').replace(/^\/docs$/, '');
      const sectionKey = sectionPath || 'index';
      const metadata = sectionMetadataMap[sectionKey] || {};
      
      return {
        title: metadata.title || section.title,
        path: section.path,
        description: metadata.description || '',
        icon: metadata.icon || 'file',
        isExpanded: metadata.isExpanded || false,
        items: section.items || []
      };
    });
    
    return {
      sections: enhancedSections
    };
  } catch (error) {
    console.error("Error generating sidebar structure:", error);
    return { sections: [] };
  }
};
