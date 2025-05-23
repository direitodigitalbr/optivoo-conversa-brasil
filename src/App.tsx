
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Auth Pages
import Login from "./pages/Login";

// Onboarding Pages
import SectorSelection from "./pages/onboarding/SectorSelection";
import ToneSelection from "./pages/onboarding/ToneSelection";
import BusinessHours from "./pages/onboarding/BusinessHours";
import SupportType from "./pages/onboarding/SupportType";

// Dashboard Pages
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Contacts from "./pages/dashboard/Contacts";
import WhatsApp from "./pages/dashboard/WhatsApp";
import Proposals from "./pages/dashboard/Proposals";
import Calendar from "./pages/dashboard/Calendar";
import AIAssistant from "./pages/dashboard/AIAssistant";
import Settings from "./pages/dashboard/Settings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Auth Routes */}
              <Route
                path="/login"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                }
              />

              {/* Onboarding Routes */}
              <Route
                path="/onboarding/sector"
                element={
                  <ProtectedRoute>
                    <SectorSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/onboarding/tone"
                element={
                  <ProtectedRoute>
                    <ToneSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/onboarding/hours"
                element={
                  <ProtectedRoute>
                    <BusinessHours />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/onboarding/support"
                element={
                  <ProtectedRoute>
                    <SupportType />
                  </ProtectedRoute>
                }
              />

              {/* Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="whatsapp" element={<WhatsApp />} />
                <Route path="proposals" element={<Proposals />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="ai-assistant" element={<AIAssistant />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Redirect from root to either dashboard or login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
