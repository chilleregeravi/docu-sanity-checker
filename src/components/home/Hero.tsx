
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const hero = t('hero');

  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
      <div className="max-w-7xl mx-auto text-center relative">
        <div className="inline-block animate-fadeIn">
          <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary/10 text-primary inline-block mb-6">
            {hero.tagline}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slideUpAndFade leading-tight">
          {hero.title.split(' with ')[0]} <br className="hidden md:block" />
          <span className="text-gradient">with {hero.title.split(' with ')[1]}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slideUpAndFade" style={{ animationDelay: '100ms' }}>
          {hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUpAndFade" style={{ animationDelay: '200ms' }}>
          <Link to={hero.primaryButtonUrl}>
            <Button size="lg" className="rounded-md px-8 w-full sm:w-auto shadow-sm hover:shadow-md transition-all">
              {hero.primaryButtonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a href={hero.secondaryButtonUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="rounded-md px-8 w-full sm:w-auto">
              {hero.secondaryButtonText}
              <Github className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
