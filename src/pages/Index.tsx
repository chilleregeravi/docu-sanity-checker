
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import sidebarStructure from '@/docs/structure.json';
import Hero from '@/components/home/Hero';
import DocumentationSection from '@/components/home/DocumentationSection';
import CTASection from '@/components/home/CTASection';
import content from '@/content.json';

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
  const community = content.community && {
    title: content.community.title,
    url: content.community.url
  };
  
  console.log("Index rendering with content:", content);
  console.log("Structure data:", structureData);

  // Make sure we have at least some sections to show
  const sectionsToShow = structureData.sections || [];
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Documentation Sections */}
        <DocumentationSection sections={sectionsToShow} />
        
        {/* CTA Section */}
        <CTASection community={community} />
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
