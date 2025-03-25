
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DocSection {
  title: string;
  path: string;
  description: string;
  showOnMainPage?: boolean;
}

interface DocumentationSectionProps {
  sections: DocSection[];
}

const DocumentationSection: React.FC<DocumentationSectionProps> = ({ sections }) => {
  const { t } = useLanguage();
  const filteredSections = sections.filter(section => section.showOnMainPage);
  
  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('docsIndex.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('docsIndex.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSections.map((section, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentationSection;
