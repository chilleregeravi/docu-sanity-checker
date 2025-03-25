
import { loadMarkdownFile } from './paths';

/**
 * Attempts to load a localized markdown file with fallback to default (English)
 * @param basePath The base document path
 * @param language The current language code
 * @returns The markdown content
 */
export const loadLocalizedMarkdownFile = async (basePath: string, language: string): Promise<string> => {
  if (language === 'en') {
    // Default language, load the file directly
    return loadMarkdownFile(basePath);
  }
  
  try {
    // Try to load the localized version of the file
    // Format: path/to/file.{language}.md
    const pathWithoutExtension = basePath.replace(/\.md$/, '');
    const localizedPath = `${pathWithoutExtension}.${language}.md`;
    return await loadMarkdownFile(localizedPath);
  } catch (error) {
    // Fallback to English version if localized version doesn't exist
    console.log(`Localized version for ${basePath} in ${language} not found, falling back to English`);
    return loadMarkdownFile(basePath);
  }
};
