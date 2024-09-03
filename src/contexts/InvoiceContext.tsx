'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { invoicesData, ProjectData } from '../data/mockData';

interface InvoiceContextType {
  invoices: ProjectData[];
  addInvoice: (invoice: ProjectData) => void;
  updateInvoice: (updatedInvoice: ProjectData) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [invoices, setInvoices] = useState<ProjectData[]>(invoicesData);

  const addInvoice = (invoice: ProjectData) => {
    setInvoices(prevInvoices => [...prevInvoices, invoice]);
  };

  const updateInvoice = (updatedInvoice: ProjectData) => {
    setInvoices(prevInvoices => 
      prevInvoices.map(invoice => 
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
}