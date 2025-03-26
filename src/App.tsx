import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AskMeProvider } from "./components/AskMe";
import ViewportHeightFix from "./components/ViewportHeightFix";
import { CoinCounterProvider } from "./context/CoinCounterContext";
import { CVPopupProvider } from "./components/CVPopup";
// import SchemaOrg from "./components/SchemaOrg"; // Uncomment after installing react-helmet

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CoinCounterProvider>
        <AskMeProvider>
          <CVPopupProvider>
            <ViewportHeightFix />
            <Toaster />
            <Sonner />
            {/* 
            <SchemaOrg 
              url="https://elinportfolio.se"
              title="Elin - Business Intelligence Analyst Portfolio"
              description="Explore Elin's Business Intelligence Analyst portfolio showcasing expertise in Power BI, SQL, Python, and data visualization."
              imageUrl="/images/og-image.png"
            />
            */}
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CVPopupProvider>
        </AskMeProvider>
      </CoinCounterProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
