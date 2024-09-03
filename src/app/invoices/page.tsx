'use client'

import { useState } from 'react'
import { InvoiceCard } from '../../components/ui/InvoiceCard'
import { projectsData, clientsData, Project } from '../../data/mockData'
import { StatusType } from '../../types'
import NewInvoiceModal from '../../components/NewInvoiceModal'

interface Invoice {
  id: string
  status: StatusType
  amount: string
  projectName: string
  clientName: string
}

export default function InvoicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const handleNewInvoice = (projectId: string, clientId: string, amount: string) => {
    const project = projectsData.find((p: Project) => p.id === projectId)
    const client = clientsData.find(c => c.id === clientId)
    
    if (project && client) {
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        status: 'Pending',
        amount: `$${amount}`,
        projectName: project.name,
        clientName: client.name
      }
      
      setInvoices(prevInvoices => [...prevInvoices, newInvoice])
    }
    
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
        >
          + Add new
        </button>
      </div>
      {invoices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {invoices.map((invoice: Invoice) => (
            <InvoiceCard 
              key={invoice.id}
              status={invoice.status}
              amount={invoice.amount}
              projectName={invoice.projectName}
              clientName={invoice.clientName}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No invoices yet. Create a new invoice to get started.</p>
      )}
      <NewInvoiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewInvoice}
      />
    </div>
  )
}