
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, File, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type DocItem = {
  title: string;
  path: string;
  icon?: 'file' | 'folder';
  children?: DocItem[];
  isExpanded?: boolean;
};

const initialDocs: DocItem[] = [
  {
    title: 'Getting Started',
    path: '/docs',
    icon: 'folder',
    isExpanded: true,
    children: [
      { title: 'Introduction', path: '/docs' },
      { title: 'Installation', path: '/docs/installation' },
      { title: 'Configuration', path: '/docs/configuration' },
    ],
  },
  {
    title: 'Style Guide',
    path: '/docs/style-guide',
    icon: 'folder',
    children: [
      { title: 'Overview', path: '/docs/style-guide' },
      { title: 'Writing Rules', path: '/docs/style-guide/writing-rules' },
      { title: 'Formatting', path: '/docs/style-guide/formatting' },
    ],
  },
  {
    title: 'Link Validation',
    path: '/docs/link-validation',
    icon: 'folder',
    children: [
      { title: 'Overview', path: '/docs/link-validation' },
      { title: 'Setting Up Checks', path: '/docs/link-validation/setup' },
      { title: 'Fixing Broken Links', path: '/docs/link-validation/fixing' },
    ],
  },
  {
    title: 'Dictionary Validation',
    path: '/docs/dictionary-validation',
    icon: 'folder',
    children: [
      { title: 'Overview', path: '/docs/dictionary-validation' },
      { title: 'Custom Dictionaries', path: '/docs/dictionary-validation/custom' },
      { title: 'Integration', path: '/docs/dictionary-validation/integration' },
    ],
  },
  {
    title: 'GitHub Actions',
    path: '/docs/github-actions',
    icon: 'folder',
    children: [
      { title: 'Overview', path: '/docs/github-actions' },
      { title: 'Setting Up Workflows', path: '/docs/github-actions/workflows' },
      { title: 'CI/CD Pipeline', path: '/docs/github-actions/ci-cd' },
    ],
  },
  {
    title: 'Contributing',
    path: '/docs/contributing',
    icon: 'file',
  },
  {
    title: 'FAQ',
    path: '/docs/faq',
    icon: 'file',
  },
];

const DocsSidebar = () => {
  const [docs, setDocs] = useState<DocItem[]>(initialDocs);
  const location = useLocation();

  useEffect(() => {
    // Expand the section that contains the current path
    const expandCurrentSection = () => {
      const newDocs = [...docs];
      
      // Find if the current path is in any nested children
      let foundInNestedChildren = false;
      
      for (const doc of newDocs) {
        if (doc.children) {
          for (const child of doc.children) {
            if (child.path === location.pathname) {
              doc.isExpanded = true;
              foundInNestedChildren = true;
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
                  {item.children ? (
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
                      {item.isExpanded && item.children && (
                        <div className="ml-5 border-l pl-3 space-y-1">
                          {item.children.map((child) => (
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
