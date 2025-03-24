
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const loadSidebar = async () => {
      try {
        setLoading(true);
        // Generate the sidebar structure
        const structure = await generateSidebarStructure();
        setSidebar(structure);
        setError(null);
      } catch (err: any) {
        console.error("Failed to load sidebar structure:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadSidebar();
  }, []);
  
  return { sidebar, loading, error };
};

/**
 * Export the generate function for direct usage
 */
export { generateSidebarStructure } from './sidebarStructure';
