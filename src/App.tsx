
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResourcesProvider } from "./contexts/ResourcesContext";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import Upload from "./pages/Upload";
import Subjects from "./pages/Subjects";
import ResourceView from "./pages/ResourceView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ResourcesProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/resource/:resourceId" element={<ResourceView />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </ResourcesProvider>
  </QueryClientProvider>
);

export default App;
