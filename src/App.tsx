import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Landing and Auth Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

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
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";

import NotFound from "./pages/NotFound";

const App = () => (
  <AppProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute requireAuth={false}>
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute requireAuth={false}>
              <ForgotPassword />
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
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </AppProvider>
);

export default App;
