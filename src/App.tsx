
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DocsLayout from "./pages/DocsLayout";
import DocPage from "./pages/docs/DocPage";

const queryClient = new QueryClient();

// Get the base path from environment or default to /
const basePath = import.meta.env.BASE_URL || '/';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basePath}>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Documentation Routes with dynamic catch-all pattern */}
          <Route path="/docs" element={<DocsLayout />}>
            {/* Root docs path */}
            <Route index element={<DocPage />} />
            
            {/* Use catch-all route for all documentation paths */}
            <Route path="*" element={<DocPage />} />
          </Route>
          
          {/* Catch-all for non-matching routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
