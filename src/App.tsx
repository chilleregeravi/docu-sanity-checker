
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
          
          {/* Documentation Routes */}
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocPage />} />
            <Route path="style-guide" element={<DocPage />} />
            <Route path="style-guide/writing-rules" element={<DocPage />} />
            <Route path="style-guide/formatting" element={<DocPage />} />
            <Route path="link-validation" element={<DocPage />} />
            <Route path="dictionary-validation" element={<DocPage />} />
            <Route path="github-actions" element={<DocPage />} />
            <Route path="contributing" element={<DocPage />} />
            <Route path="faq" element={<DocPage />} />
            <Route path="*" element={<DocPage />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
