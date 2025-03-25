
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Import translation files
import en from '@/translations/en.json';
import es from '@/translations/es.json';
import fr from '@/translations/fr.json';

// Define available languages
export const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' }
};

// Create the translations object with all language data
const translations = { en, es, fr };

// Define context type
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => any;
  getLocalizedPath: (basePath: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  getLocalizedPath: (path: string) => path
});

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with the browser language or fallback to English
  const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return Object.keys(languages).includes(browserLang) ? browserLang : 'en';
  };
  
  const [language, setLanguage] = useState(() => {
    // Try to get language from localStorage first
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || getBrowserLanguage();
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Translation function that navigates through the nested keys
  const t = (key: string) => {
    const keys = key.split('.');
    let value = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        // Fallback to English if the key doesn't exist in the current language
        let fallback = translations.en;
        for (const fallbackKey of keys) {
          if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
            fallback = fallback[fallbackKey as keyof typeof fallback];
          } else {
            return key; // Return the key itself if not found in any language
          }
        }
        return fallback;
      }
    }
    
    return value;
  };

  // Function to get the localized path for markdown content
  const getLocalizedPath = (basePath: string): string => {
    if (language === 'en') {
      return basePath; // Default language uses the base path
    }
    
    // For non-English languages, add language prefix to the path
    // This assumes your markdown files are organized in language-specific folders
    const pathWithoutExtension = basePath.replace(/\.md$/, '');
    return `${pathWithoutExtension}.${language}.md`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLocalizedPath }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
