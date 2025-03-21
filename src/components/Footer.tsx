
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Github, Twitter, Slack, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="text-xl font-medium">DocuSanity</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Beautiful documentation made simple. With built-in validation, style guide enforcement, and seamless GitHub integration.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Slack className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4">Documentation</h3>
            <ul className="space-y-2">
              <FooterLink href="/docs">Introduction</FooterLink>
              <FooterLink href="/docs/installation">Installation</FooterLink>
              <FooterLink href="/docs/configuration">Configuration</FooterLink>
              <FooterLink href="/docs/github-actions">GitHub Actions</FooterLink>
              <FooterLink href="/docs/faq">FAQ</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="/guides">Guides</FooterLink>
              <FooterLink href="/api">API Reference</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/community">Community</FooterLink>
              <FooterLink href="/showcase">Showcase</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} DocuSanity. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by the DocuSanity team
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
