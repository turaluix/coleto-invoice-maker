'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Client {
  id: string;
  companyName: string;
  email: string;
  address: string;
  vat?: string;
  phoneNumber: string;
}

interface ClientContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);

  const addClient = (clientData: Omit<Client, 'id'>) => {
    const newClient: Client = {
      id: Date.now().toString(),
      ...clientData
    };
    setClients(prevClients => [...prevClients, newClient]);
  };

  const updateClient = (id: string, clientData: Partial<Client>) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === id ? { ...client, ...clientData } : client
      )
    );
  };

  const deleteClient = (id: string) => {
    setClients(prevClients => prevClients.filter(client => client.id !== id));
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, updateClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
}