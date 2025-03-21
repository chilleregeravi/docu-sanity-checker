
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Github, Zap, Shield, SquareTerminal } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const features = [
  {
    title: 'Broken Link Detection',
    description: 'Automatically detect and fix broken links in your documentation.',
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Style Guide Enforcement',
    description: 'Ensure consistent writing style across all documentation.',
    icon: <Check className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Dictionary Validation',
    description: 'Validate technical terms against custom dictionaries.',
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: 'GitHub Actions Integration',
    description: 'Seamlessly integrate validation into your CI/CD workflow.',
    icon: <Github className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Command Line Interface',
    description: 'Run validation checks locally during development.',
    icon: <SquareTerminal className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Detailed Reports',
    description: 'Get detailed reports with actionable recommendations.',
    icon: <ArrowRight className="h-6 w-6 text-primary" />,
  },
];

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section - Updated top padding to prevent overlap with header */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          <div className="max-w-7xl mx-auto text-center relative">
            <div className="inline-block animate-fadeIn">
              <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary/10 text-primary inline-block mb-6">
                Documentation Made Beautiful
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slideUpAndFade leading-tight">
              Create Beautiful Docs <br className="hidden md:block" />
              <span className="text-gradient">with Automated Validation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slideUpAndFade" style={{ animationDelay: '100ms' }}>
              Build stunning documentation websites with built-in GitHub actions that check for broken links,
              validate against custom dictionaries, and enforce your style guide.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUpAndFade" style={{ animationDelay: '200ms' }}>
              <Button size="lg" className="rounded-md px-8 w-full sm:w-auto shadow-sm hover:shadow-md transition-all">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-md px-8 w-full sm:w-auto">
                View on GitHub
                <Github className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Moved the scroll indicator to fixed position at bottom of viewport */}
        <div 
          className="hidden md:flex fixed bottom-8 right-10 z-10 animate-bounce cursor-pointer"
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
        
        {/* Features Section - Added ref for scroll target */}
        <section ref={featuresRef} className="py-16 md:py-24 px-6 md:px-10 bg-secondary relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create amazing documentation with automated quality checks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border hover:border-primary/20 group"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
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
                <Button size="lg" variant="secondary" className="rounded-md px-8 shadow-sm">
                  View Documentation
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10 text-white hover:text-white rounded-md px-8">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Button>
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
