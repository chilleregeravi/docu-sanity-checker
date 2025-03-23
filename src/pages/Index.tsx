
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Github, Zap, Shield, SquareTerminal } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import sidebarStructure from '@/docs/structure.json';

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
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
};

const Index = () => {
  const structureData = sidebarStructure as StructureData;
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get the icon component based on name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'zap': return <Zap className="h-6 w-6 text-primary" />;
      case 'check': return <Check className="h-6 w-6 text-primary" />;
      case 'shield': return <Shield className="h-6 w-6 text-primary" />;
      case 'github': return <Github className="h-6 w-6 text-primary" />;
      case 'terminal-square': return <SquareTerminal className="h-6 w-6 text-primary" />;
      default: return <ArrowRight className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section - Now using data from structure.json */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          <div className="max-w-7xl mx-auto text-center relative">
            <div className="inline-block animate-fadeIn">
              <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary/10 text-primary inline-block mb-6">
                {structureData.hero.tagline}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slideUpAndFade leading-tight">
              {structureData.hero.title.split(' with ')[0]} <br className="hidden md:block" />
              <span className="text-gradient">with {structureData.hero.title.split(' with ')[1]}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slideUpAndFade" style={{ animationDelay: '100ms' }}>
              {structureData.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUpAndFade" style={{ animationDelay: '200ms' }}>
              <Link to={structureData.hero.primaryButtonUrl}>
                <Button size="lg" className="rounded-md px-8 w-full sm:w-auto shadow-sm hover:shadow-md transition-all">
                  {structureData.hero.primaryButtonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href={structureData.hero.secondaryButtonUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="rounded-md px-8 w-full sm:w-auto">
                  {structureData.hero.secondaryButtonText}
                  <Github className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>
        
        {/* Scroll indicator */}
        <div 
          className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer"
          onClick={scrollToFeatures}
          aria-label="Scroll to features"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToFeatures();
            }
          }}
        >
          <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/5 transition-colors bg-background/80 backdrop-blur-sm shadow-sm">
            <ArrowRight className="h-4 w-4 text-primary rotate-90" />
          </div>
        </div>
        
        {/* Features Section - Using features from structure.json */}
        <section ref={featuresRef} className="py-16 md:py-24 px-6 md:px-10 bg-secondary relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create amazing documentation with automated quality checks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {structureData.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border hover:border-primary/20 group"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    {getIconComponent(feature.icon)}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Documentation Sections - Show only those with showOnMainPage flag */}
        <section className="py-16 md:py-24 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Documentation</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our comprehensive guides and learn how to get the most out of DocuSanity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {structureData.sections
                .filter(section => section.showOnMainPage)
                .map((section, index) => (
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
        
        {/* CTA Section */}
        <section className="py-24 md:py-32 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-primary rounded-2xl p-8 md:p-12 lg:p-16 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between relative overflow-hidden shadow-lg">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />
              
              <div className="md:max-w-xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">Ready to get started?</h2>
                <p className="text-lg mb-8 md:mb-0 text-primary-foreground/90">
                  Start creating beautiful documentation with automated validation in minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <Link to="/docs">
                  <Button size="lg" variant="secondary" className="rounded-md px-8 shadow-sm">
                    View Documentation
                  </Button>
                </Link>
                <a href={structureData.community.url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10 text-white hover:text-white rounded-md px-8">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
