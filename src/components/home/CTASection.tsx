
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import content from '@/content.json';

interface CommunityLink {
  title: string;
  url: string;
}

interface CTASectionProps {
  community?: CommunityLink;
}

const CTASection: React.FC<CTASectionProps> = ({ community }) => {
  // Use community from props first, fallback to content.json
  const communityInfo = community || {
    title: content.community?.title || "Join our community",
    url: content.community?.url || "https://github.com"
  };
  
  console.log("CTA section rendering with community:", communityInfo);
  
  return (
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
            {communityInfo && (
              <a href={communityInfo.url} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10 text-white hover:text-white rounded-md px-8">
                  <Github className="mr-2 h-5 w-5" />
                  {communityInfo.title}
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
