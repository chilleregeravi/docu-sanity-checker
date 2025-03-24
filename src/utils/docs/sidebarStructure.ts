
/**
 * Utilities for generating and loading sidebar structure
 */
import sidebarStructure from '@/docs/structure.json';
import { SidebarStructure, SectionItem, SidebarItem } from './types';
import { generateNavStructure } from './paths';
import { loadMarkdownFile, extractTitle, extractOrder } from './frontmatter';

/**
 * Sort items by order
 */
const sortByOrder = (a: any, b: any) => {
  const orderA = typeof a.order === 'number' ? a.order : 999;
  const orderB = typeof b.order === 'number' ? b.order : 999;
  
  return orderA - orderB;
};

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
    
    // Enhance dynamic sections with titles and order from markdown files
    const enhancedSections: SectionItem[] = await Promise.all(dynamicSections.map(async (section: any) => {
      const sectionPath = section.path.replace(/^\/docs\//, '').replace(/^\/docs$/, '');
      const sectionKey = sectionPath || 'index';
      const metadata = sectionMetadataMap[sectionKey] || {};
      
      // Try to load the markdown file for this section to get the title and order
      let order = 999;
      try {
        const markdownContent = await loadMarkdownFile(sectionPath);
        const titleFromMarkdown = extractTitle(markdownContent);
        order = extractOrder(markdownContent);
        
        if (titleFromMarkdown) {
          metadata.title = titleFromMarkdown;
        }
      } catch (error) {
        // If we can't load the markdown, use the fallback title
        console.warn(`Couldn't load markdown for section ${sectionPath}`, error);
      }
      
      // Process child items to get their titles and order from markdown
      const enhancedItems = await Promise.all((section.items || []).map(async (item: any) => {
        const itemPath = item.path.replace(/^\/docs\//, '');
        let itemOrder = 999;
        
        try {
          const markdownContent = await loadMarkdownFile(itemPath);
          const titleFromMarkdown = extractTitle(markdownContent);
          itemOrder = extractOrder(markdownContent);
          
          return {
            ...item,
            title: titleFromMarkdown || item.title,
            order: itemOrder
          };
        } catch (error) {
          // If we can't load the markdown, use the fallback title
          console.warn(`Couldn't load markdown for item ${itemPath}`, error);
          return {
            ...item,
            order: itemOrder
          };
        }
      }));
      
      // Sort items by order
      const sortedItems = enhancedItems.sort(sortByOrder);
      
      return {
        title: metadata.title || section.title,
        path: section.path,
        description: metadata.description || '',
        icon: metadata.icon || 'file',
        isExpanded: metadata.isExpanded || false,
        order: order,
        items: sortedItems || []
      };
    }));
    
    // Sort sections by order
    const sortedSections = enhancedSections.sort(sortByOrder);
    
    return {
      sections: sortedSections
    };
  } catch (error) {
    console.error("Error generating sidebar structure:", error);
    return { sections: [] };
  }
};

