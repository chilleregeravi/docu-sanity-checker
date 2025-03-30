
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
    const currentTranslations = translations[language as keyof typeof translations] as any;
    const fallbackTranslations = translations.en as any;
    
    let result: any = currentTranslations;
    let fallbackResult: any = fallbackTranslations;
    
    // Navigate through the nested keys
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      
      // Check if the key exists in the current language
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Key doesn't exist in current language, mark as undefined to use fallback
        result = undefined;
        break;
      }
      
      // Also navigate through fallback
      if (fallbackResult && typeof fallbackResult === 'object' && k in fallbackResult) {
        fallbackResult = fallbackResult[k];
      } else {
        // If key doesn't exist in fallback either, mark as undefined
        fallbackResult = undefined;
      }
    }
    
    // Return the result from current language, fallback to English or the key itself
    return result !== undefined ? result : (fallbackResult !== undefined ? fallbackResult : key);
  };

  // Function to get the localized path for markdown content
  const getLocalizedPath = (basePath: string): string => {
    if (language === 'en') {
      return basePath; // Default language uses the base path
    }
    
    // For non-English languages, add language suffix to the path
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
