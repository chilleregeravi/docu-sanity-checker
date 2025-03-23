
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DocsLayout from "./pages/DocsLayout";
import DocsIndex from "./pages/docs/Index";
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
            <Route index element={<DocsIndex />} />
            {/* Dynamic route that will match any path after /docs/ */}
            <Route path=":*" element={<DocPage />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
