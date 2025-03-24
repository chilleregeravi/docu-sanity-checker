/**
 * Utilities for generating and loading sidebar structure
 */
import sidebarStructure from '@/docs/structure.json';
import { SidebarStructure, SectionItem, SidebarItem } from './types';
import { generateNavStructure } from './paths';
import { loadMarkdownFile, extractTitle, extractOrder, formatSectionTitle } from './frontmatter';

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
      
      // For section titles, always use formatted folder name instead of index.md title
      let sectionTitle = '';
      let order = 999;
      
      if (sectionKey === 'index') {
        // Special case for root index
        sectionTitle = 'Documentation';
        try {
          const markdownContent = await loadMarkdownFile('');
          order = extractOrder(markdownContent);
          // Use title from metadata if available, otherwise from markdown
          const titleFromMarkdown = extractTitle(markdownContent);
          if (titleFromMarkdown) {
            sectionTitle = titleFromMarkdown;
          }
        } catch (error) {
          // Keep default title and order
        }
      } else {
        // For section folders, always use the formatted section name
        sectionTitle = formatSectionTitle(sectionKey);
        
        // Try to get the order from index.md if it exists
        try {
          const markdownContent = await loadMarkdownFile(sectionKey);
          order = extractOrder(markdownContent);
        } catch (error) {
          // Keep default order
        }
      }
      
      // Include the index.md file as the first item in the section
      let sectionItems = [...(section.items || [])];
      
      // Only add the index page if it's not the root index
      if (sectionKey !== 'index') {
        try {
          const indexMarkdownContent = await loadMarkdownFile(sectionKey);
          const indexTitle = extractTitle(indexMarkdownContent) || 'Overview';
          const indexOrder = extractOrder(indexMarkdownContent) || 0;
          
          // Add index as the first item in the section
          sectionItems.unshift({
            title: indexTitle,
            path: section.path,
            order: indexOrder
          });
        } catch (error) {
          console.warn(`Couldn't load index markdown for section ${sectionKey}`, error);
        }
      }
      
      // Process remaining child items to get their titles and order from markdown
      const enhancedItems = await Promise.all(sectionItems.map(async (item: any) => {
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
        title: sectionTitle || metadata.title || section.title,
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
