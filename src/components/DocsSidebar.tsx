
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebarStructure, SidebarItem, SectionItem } from '@/utils/docsUtils';
import SidebarSection from './sidebar/SidebarSection';

const DocsSidebar = () => {
  const sidebar = useSidebarStructure();
  const [docs, setDocs] = useState<SectionItem[]>(sidebar.sections);
  const location = useLocation();

  // Update docs when sidebar structure changes
  useEffect(() => {
    setDocs(sidebar.sections);
  }, [sidebar]);

  useEffect(() => {
    // Expand the section that contains the current path
    const expandCurrentSection = () => {
      const newDocs = [...docs];
      
      for (const doc of newDocs) {
        if (doc.items) {
          for (const item of doc.items) {
            if (item.path === location.pathname) {
              doc.isExpanded = true;
              break;
            }
          }
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
              {docs.map((section, i) => (
                <SidebarSection
                  key={section.title}
                  section={section}
                  isActive={isActive}
                  index={i}
                  toggleExpand={toggleExpand}
                />
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default DocsSidebar;
