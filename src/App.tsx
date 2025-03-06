
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AskMeProvider } from "./components/AskMe";
import ViewportHeightFix from "./components/ViewportHeightFix";
import { initGA, trackPageview } from "./lib/analytics";

// Component to track page views
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics once on component mount
    initGA();
  }, []);

  useEffect(() => {
    // Track page view on each route change
    const currentPath = location.pathname + location.search;
    trackPageview(currentPath);
  }, [location]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AskMeProvider>
        <ViewportHeightFix />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteTracker />
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AskMeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
