
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import sidebarStructure from '@/docs/structure.json';
import content from '@/content.json';
import Hero from '@/components/home/Hero';
import DocumentationSection from '@/components/home/DocumentationSection';
import CTASection from '@/components/home/CTASection';

type StructureData = {
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
};

const Index = () => {
  const structureData = sidebarStructure as StructureData;
  const { community } = content;
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Documentation Sections */}
        <DocumentationSection sections={structureData.sections} />
        
        {/* CTA Section */}
        <CTASection community={community} />
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
