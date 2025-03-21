
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, File, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import sidebarStructure from '@/docs/structure.json';

type SidebarItem = {
  title: string;
  path: string;
  icon?: 'file' | 'folder';
};

type SectionItem = SidebarItem & {
  items?: SidebarItem[];
  isExpanded?: boolean;
};

interface SidebarStructure {
  sections: SectionItem[];
}

const DocsSidebar = () => {
  const [docs, setDocs] = useState<SectionItem[]>((sidebarStructure as SidebarStructure).sections);
  const location = useLocation();

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
  }, [location.pathname]);

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
              {docs.map((item, i) => (
                <div key={item.title} className="space-y-1">
                  {item.items ? (
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start p-2 text-sm font-medium",
                          isActive(item.path) ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
                        )}
                        onClick={() => toggleExpand(i)}
                      >
                        <div className="flex items-center w-full">
                          {item.icon === 'folder' ? (
                            <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                          ) : (
                            <File className="h-4 w-4 mr-2 text-muted-foreground" />
                          )}
                          <span className="flex-1 text-left">{item.title}</span>
                          {item.isExpanded ? (
                            <ChevronUp className="h-4 w-4 ml-auto" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-auto" />
                          )}
                        </div>
                      </Button>
                      {item.isExpanded && item.items && (
                        <div className="ml-5 border-l pl-3 space-y-1">
                          {item.items.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={cn(
                                "block py-2 px-2 text-sm transition-colors rounded-md",
                                isActive(child.path)
                                  ? "font-medium text-primary bg-accent"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                              )}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center py-2 px-2 text-sm font-medium transition-colors rounded-md",
                        isActive(item.path)
                          ? "text-primary bg-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      {item.icon === 'folder' ? (
                        <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
                      ) : (
                        <File className="h-4 w-4 mr-2 text-muted-foreground" />
                      )}
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default DocsSidebar;
