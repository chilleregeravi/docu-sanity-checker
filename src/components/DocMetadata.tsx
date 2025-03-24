
import React from 'react';
import { Calendar, Github } from 'lucide-react';
import { extractPublishDate, getGitHubPath } from '@/utils/docs';

interface DocMetadataProps {
  markdown: string;
  githubPath?: string;
}

const DocMetadata = ({ markdown, githubPath = "docs" }: DocMetadataProps) => {
  const publishDate = extractPublishDate(markdown);
  const docPath = getGitHubPath(githubPath);
  const repoUrl = `https://github.com/docusanity/documentation/blob/main/${docPath}`;
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-3 px-4 bg-muted/40 border rounded-lg text-sm mb-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Published: {publishDate}</span>
      </div>
      
      <a 
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-primary hover:underline"
      >
        <Github className="h-4 w-4" />
        <span>Edit on GitHub</span>
      </a>
    </div>
  );
};

export default DocMetadata;
