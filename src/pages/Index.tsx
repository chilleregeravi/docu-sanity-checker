
import React, { useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import sidebarStructure from '@/docs/structure.json';
import Hero from '@/components/home/Hero';
import ScrollIndicator from '@/components/home/ScrollIndicator';
import FeaturesSection from '@/components/home/FeaturesSection';
import DocumentationSection from '@/components/home/DocumentationSection';
import CTASection from '@/components/home/CTASection';

type StructureData = {
  hero: {
    tagline: string;
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
  };
  sections: Array<{
    title: string;
    path: string;
    description: string;
    icon: string;
    showOnMainPage?: boolean;
    items?: Array<{
      title: string;
      path: string;
      description: string;
    }>;
  }>;
  featurePaths: Array<{
    path: string;
  }>;
  community?: {
    title: string;
    url: string;
  };
};

const Index = () => {
  const structureData = sidebarStructure as StructureData;
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <Hero 
          tagline={structureData.hero.tagline}
          title={structureData.hero.title}
          description={structureData.hero.description}
          primaryButtonText={structureData.hero.primaryButtonText}
          primaryButtonUrl={structureData.hero.primaryButtonUrl}
          secondaryButtonText={structureData.hero.secondaryButtonText}
          secondaryButtonUrl={structureData.hero.secondaryButtonUrl}
        />
        
        {/* Scroll indicator */}
        <ScrollIndicator onClick={scrollToFeatures} />
        
        {/* Features Section */}
        <FeaturesSection 
          featurePaths={structureData.featurePaths} 
          featuresSectionRef={featuresRef} 
        />
        
        {/* Documentation Sections */}
        <DocumentationSection sections={structureData.sections} />
        
        {/* CTA Section */}
        <CTASection community={structureData.community} />
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
