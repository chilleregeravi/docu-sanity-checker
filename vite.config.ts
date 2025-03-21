
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.md'],
  server: {
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
});
