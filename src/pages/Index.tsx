
import React, { useEffect } from 'react';
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
  const community = {
    title: content.community.title,
    url: content.community.url
  };
  
  console.log("Index rendering with content:", content);
  console.log("Structure data:", structureData);
  
  // Make sure all sections have the showOnMainPage property
  useEffect(() => {
    if (structureData && structureData.sections) {
      structureData.sections.forEach(section => {
        if (section.showOnMainPage === undefined) {
          console.log(`Section ${section.title} doesn't have showOnMainPage property`);
        }
      });
    }
  }, [structureData]);
  
  // If we have no sections in structure.json, create fallback sections
  const fallbackSections = [
    {
      title: "Getting Started",
      path: "/docs/getting-started/introduction",
      description: "Welcome to the FrameD documentation. Get started with installation, learn the fundamentals, and explore advanced topics.",
      icon: "folder",
      showOnMainPage: true
    },
    {
      title: "Style Guide",
      path: "/docs/style-guide/overview",
      description: "Ensure consistent writing style across all documentation.",
      icon: "folder",
      showOnMainPage: true
    },
    {
      title: "GitHub Actions",
      path: "/docs/github-actions/overview",
      description: "Seamlessly integrate validation into your CI/CD workflow.",
      icon: "folder",
      showOnMainPage: true
    }
  ];
  
  // Use fallback sections if no sections are available with showOnMainPage
  const sectionsToShow = structureData.sections?.filter(s => s.showOnMainPage).length > 0 
    ? structureData.sections 
    : fallbackSections;
  
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
