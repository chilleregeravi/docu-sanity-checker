
/**
 * React hooks for managing sidebar state
 */
import { useEffect, useState } from 'react';
import { SidebarStructure } from './types';
import { generateSidebarStructure } from './sidebarStructure';

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
 * Generate sidebar structure by loading from the static structure.json
 * This function is exported for direct usage where hooks cannot be used
 */
export { generateSidebarStructure } from './sidebarStructure';
