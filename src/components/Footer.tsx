
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Github, Twitter, Slack, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: Record<string, React.ComponentType<any>> = {
  Github,
  Twitter,
  Slack,
  Heart
};

const Footer = () => {
  const { t } = useLanguage();
  const footer = t('footer');
  const currentYear = new Date().getFullYear();
  const copyrightText = footer.copyright.replace('{year}', currentYear.toString());

  return (
    <footer className="bg-secondary border-t py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xl">
                {footer.logo.logoLetter}
              </div>
              <span className="text-xl font-medium">{footer.logo.text}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {footer.description}
            </p>
            <div className="flex space-x-4">
              {footer.socialLinks.map((social, index) => {
                const Icon = iconMap[social.icon];
                return (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </div>
          </div>

          {footer.columns.map((column, index) => (
            <div key={index}>
              <h3 className="font-medium text-base mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <FooterLink key={linkIndex} href={link.href}>{link.label}</FooterLink>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>{copyrightText}</p>
          <p className="mt-2 md:mt-0 flex items-center">
            {footer.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <li>
      <Link
        to={href}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
