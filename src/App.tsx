import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Donations from "./pages/Donations";
import DonationForm from "./pages/DonationForm";
import DonationSuccess from "./pages/DonationSuccess";
import HelpRequests from "./pages/HelpRequests";
import HelpRequestForm from "./pages/HelpRequestForm";
import RequestSuccess from "./pages/RequestSuccess";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/donate" element={<Donations />} />
            <Route path="/donate/new" element={<DonationForm />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="/request-help" element={<HelpRequests />} />
            <Route path="/request-help/new" element={<HelpRequestForm />} />
            <Route path="/request-success" element={<RequestSuccess />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
