
import React, { useState, useEffect } from 'react';
import FeatureCard from './FeatureCard';
import { extractFeatureMetadata, normalizeDocPath } from '@/utils/docsUtils';

interface Feature {
  title: string;
  description: string;
  icon: string;
  path: string;
}

interface FeaturesSectionProps {
  featuresSectionRef: React.RefObject<HTMLDivElement>;
  featurePaths: { path: string }[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ featuresSectionRef, featurePaths }) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatures = async () => {
      setLoading(true);
      const loadedFeatures: Feature[] = [];

      for (const { path } of featurePaths) {
        try {
          // Strip leading slash for import
          const normalizedPath = normalizeDocPath(path);
          
          // Dynamic import of markdown files
          const moduleImport = await import(`@/docs/${normalizedPath}.md?raw`);
          const markdownContent = moduleImport.default;
          
          const featureData = extractFeatureMetadata(markdownContent, path);
          if (featureData) {
            loadedFeatures.push(featureData);
          }
        } catch (e) {
          console.error(`Failed to load feature metadata for path ${path}:`, e);
        }
      }

      setFeatures(loadedFeatures);
      setLoading(false);
    };

    loadFeatures();
  }, [featurePaths]);

  return (
    <section ref={featuresSectionRef} className="py-16 md:py-24 px-6 md:px-10 bg-secondary relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create amazing documentation with automated quality checks.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-background rounded-xl p-8 h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                path={feature.path}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
