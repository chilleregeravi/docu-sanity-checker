
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SidebarStructure } from '@/utils/docs/types';
import { generateSidebarStructure } from '@/utils/docs/sidebarStructure';

interface SidebarContextType {
  sidebar: SidebarStructure;
  setSidebar: (sidebar: SidebarStructure) => void;
  loading: boolean;
  error: Error | null;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebar, setSidebar] = useState<SidebarStructure>({ sections: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  React.useEffect(() => {
    const loadSidebar = async () => {
      try {
        setLoading(true);
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

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar, loading, error }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
