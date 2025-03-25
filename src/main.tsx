
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize theme based on localStorage or system preference
const initializeTheme = () => {
  const theme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (theme === 'dark' || (theme === null && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Run theme initialization before rendering
initializeTheme();

createRoot(document.getElementById("root")!).render(<App />);
