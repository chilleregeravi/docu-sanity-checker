
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebarStructure } from '@/utils/docs';
import { SectionItem } from '@/utils/docs/types';
import SidebarSection from './sidebar/SidebarSection';
import { RefreshCw } from 'lucide-react';

const DocsSidebar = () => {
  const { sidebar, loading, error } = useSidebarStructure();
  const [docs, setDocs] = useState<SectionItem[]>([]);
  const location = useLocation();

  // Update docs when sidebar structure changes
  useEffect(() => {
    if (sidebar.sections && sidebar.sections.length > 0) {
      // Use structure directly from the dynamically generated sidebar
      setDocs(sidebar.sections);
    }
  }, [sidebar]);

  useEffect(() => {
    // Expand the section that contains the current path
    const expandCurrentSection = () => {
      if (!docs || docs.length === 0) return;
      
      const newDocs = [...docs];
      
      for (const doc of newDocs) {
        // Check if current path matches the section itself
        if (doc.path === location.pathname) {
          doc.isExpanded = true;
          continue;
        }
        
        // Check if current path matches any child items or starts with the section path (for nested routes)
        if (doc.items) {
          for (const item of doc.items) {
            if (item.path === location.pathname) {
              doc.isExpanded = true;
              break;
            }
          }
        }
        
        // Also expand if the current path starts with the section path (for nested routes)
        if (location.pathname.startsWith(doc.path) && doc.path !== "/docs") {
          doc.isExpanded = true;
        }
      }
      
      setDocs(newDocs);
    };
    
    expandCurrentSection();
  }, [location.pathname, docs]);

  const toggleExpand = (index: number) => {
    const newDocs = [...docs];
    newDocs[index].isExpanded = !newDocs[index].isExpanded;
    setDocs(newDocs);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0 border-r bg-background">
      <ScrollArea className="h-full py-6 pl-8 pr-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">
              Documentation
            </h3>
            <nav className="space-y-1">
              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground py-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Loading documentation...</span>
                </div>
              )}
              
              {error && (
                <div className="text-red-500 py-2">
                  Error loading documentation structure
                </div>
              )}
              
              {!loading && !error && docs && docs.length > 0 ? (
                docs.map((section, i) => (
                  <SidebarSection
                    key={section.title + i}
                    section={section}
                    isActive={isActive}
                    index={i}
                    toggleExpand={toggleExpand}
                  />
                ))
              ) : (
                !loading && !error && (
                  <div className="text-muted-foreground py-2">No documentation found.</div>
                )
              )}
            </nav>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default DocsSidebar;
