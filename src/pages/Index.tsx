
import React from 'react';
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
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block animate-fadeIn">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary inline-block mb-6">
                Documentation Made Beautiful
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slideUpAndFade">
              Create Beautiful Docs <br className="hidden md:block" />
              <span className="text-gradient">with Automated Validation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slideUpAndFade" style={{ animationDelay: '100ms' }}>
              Build stunning documentation websites with built-in GitHub actions that check for broken links,
              validate against custom dictionaries, and enforce your style guide.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUpAndFade" style={{ animationDelay: '200ms' }}>
              <Button size="lg" className="rounded-md px-8">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-md px-8">
                View on GitHub
                <Github className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 px-6 md:px-10 bg-secondary">
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
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-subtle hover:shadow-md transition-shadow duration-300 border"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
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
        <section className="py-16 md:py-24 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 lg:p-16 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="md:max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-lg mb-6 md:mb-0 text-primary-foreground/90">
                  Start creating beautiful documentation with automated validation in minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="rounded-md px-8">
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
