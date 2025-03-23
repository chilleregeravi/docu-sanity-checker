
import React from 'react';
import FeatureCard from './FeatureCard';

interface Feature {
  title: string;
  description: string;
  icon: string;
  path?: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  featuresSectionRef: React.RefObject<HTMLDivElement>;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features, featuresSectionRef }) => {
  return (
    <section ref={featuresSectionRef} className="py-16 md:py-24 px-6 md:px-10 bg-secondary relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create amazing documentation with automated quality checks.
          </p>
        </div>
        
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
      </div>
    </section>
  );
};

export default FeaturesSection;
