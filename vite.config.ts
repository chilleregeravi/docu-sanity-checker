
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { componentTagger } from "lovable-tagger";

// Get the repository name to use as base path for GitHub Pages
// If running locally or in a different environment, no base path is needed
const base = process.env.GITHUB_REPOSITORY 
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` 
  : '/';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  base, // Use the base path for all environments to ensure consistency
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.md'],
  server: {
    host: "::",
    port: 8080
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Ensure markdown files are properly handled during build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            // Add other UI libraries as needed
          ],
        }
      }
    }
  }
}));
