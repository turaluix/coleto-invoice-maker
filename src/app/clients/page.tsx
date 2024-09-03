'use client'

import { useState } from 'react'
import ClientCard from '../../components/ui/ClientCard'
import NewClientModal from '../../components/NewClientModal'

interface Client {
  id: string;
  companyName: string;
  email: string;
  address: string;
  vat?: string;
  phoneNumber: string;
}

export default function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clients, setClients] = useState<Client[]>([])

  const handleNewClient = (clientData: Omit<Client, 'id'>) => {
    const newClient: Client = {
      id: Date.now().toString(),
      ...clientData
    }
    setClients(prevClients => [...prevClients, newClient])
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clients</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
        >
          + Add new
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <ClientCard 
            key={client.id}
            {...client}
          />
        ))}
      </div>
      <NewClientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewClient}
      />
    </div>
  )
}
