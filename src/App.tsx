
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
