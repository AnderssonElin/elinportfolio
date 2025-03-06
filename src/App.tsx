
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
import { initGA, trackPageview, setGAMeasurementId } from "./lib/analytics";

// Use an empty string as default - we'll load the real ID from localStorage
const GA_DEFAULT = ""; 

// Component for tracking pageviews
const RouteTracker = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Initialize Google Analytics (will use localStorage value if exists)
    initGA();
    
    // For testing - uncomment this line to set a measurement ID
    // Example: setGAMeasurementId('G-XXXXXXXXXX');
  }, []);

  useEffect(() => {
    // Track pageview on each route change
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
