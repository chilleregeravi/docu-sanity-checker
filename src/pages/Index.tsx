
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
  
  // Prepare community data for the CTA section
  const community = {
    title: content.community?.title || "Join our community",
    url: content.community?.url || "https://github.com"
  };
  
  console.log("Index rendering with sidebar structure:", structureData);

  // Make sure we have sections to show
  const sections = structureData.sections || [];
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Documentation Sections */}
        <DocumentationSection sections={sections} />
        
        {/* CTA Section */}
        <CTASection community={community} />
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
