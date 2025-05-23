
import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  sector: string;
  setSector: (sector: string) => void;
  toneOfVoice: string;
  setToneOfVoice: (tone: string) => void;
  businessHours: {
    start: string;
    end: string;
  };
  setBusinessHours: (hours: { start: string; end: string }) => void;
  supportType: string;
  setSupportType: (type: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sector, setSector] = useState('');
  const [toneOfVoice, setToneOfVoice] = useState('');
  const [businessHours, setBusinessHours] = useState({ start: '09:00', end: '18:00' });
  const [supportType, setSupportType] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const value = {
    sidebarOpen,
    toggleSidebar,
    sector,
    setSector,
    toneOfVoice,
    setToneOfVoice,
    businessHours,
    setBusinessHours,
    supportType,
    setSupportType
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
