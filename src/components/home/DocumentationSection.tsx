
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import content from '@/content.json';

interface DocSection {
  title: string;
  path: string;
  description: string;
  showOnMainPage?: boolean;
  icon?: string;
}

interface DocumentationSectionProps {
  sections: DocSection[];
}

const DocumentationSection: React.FC<DocumentationSectionProps> = ({ sections }) => {
  const docsIndex = content.docsIndex;
  // Ensure we're actually showing sections by setting a default value if showOnMainPage is undefined
  const filteredSections = sections.filter(section => section.showOnMainPage !== false);
  
  console.log("Documentation section rendering with content:", docsIndex);
  console.log("Filtered sections:", filteredSections);
  
  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{docsIndex.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {docsIndex.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSections.length > 0 ? (
            filteredSections.map((section, index) => (
              <Link 
                to={section.path} 
                key={index} 
                className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border hover:border-primary/20 group"
              >
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{section.title}</h3>
                <p className="text-muted-foreground mb-4">{section.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center text-muted-foreground">
              No documentation sections available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DocumentationSection;
