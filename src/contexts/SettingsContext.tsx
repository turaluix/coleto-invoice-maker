'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CompanyDetails {
  companyName: string;
  email: string;
  address: string;
  vat: string; // Add VAT field
  phoneNumber: string;
}

interface SettingsContextType {
  companyDetails: CompanyDetails;
  updateCompanyDetails: (details: Partial<CompanyDetails>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: '',
    email: '',
    address: '',
    vat: '', // Initialize VAT field
    phoneNumber: '',
  });

  const updateCompanyDetails = (details: Partial<CompanyDetails>) => {
    setCompanyDetails(prev => ({ ...prev, ...details }));
  };

  return (
    <SettingsContext.Provider value={{ companyDetails, updateCompanyDetails }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}