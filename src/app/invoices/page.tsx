'use client'

import { useState } from 'react'
import Link from 'next/link'
import { InvoiceCard } from '../../components/ui/InvoiceCard'
import { StatusType } from '../../types/StatusType'
import NewInvoiceModal from '../../components/NewInvoiceModal'
import { useInvoices } from '../../contexts/InvoiceContext'
import { useProjects } from '../../contexts/ProjectContext'

export default function InvoicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { invoices, addInvoice } = useInvoices()
  const { projects } = useProjects()

  const handleNewInvoice = (projectId: string, amount: string, dueDate: string) => {
    const project = projects.find((p) => p.id === projectId)
    
    if (project) {
      const newInvoice = {
        id: Date.now().toString(),
        status: StatusType.Pending,
        amount: `$${amount}`,
        projectName: project.projectName,
        clientName: project.clientName,
        totalInvoiced: `$${amount}`,
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: dueDate,
        items: [{ description: project.projectName, amount: `$${amount}` }]
      }
      
      addInvoice(newInvoice)
    }
    
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
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
          {invoices.map((invoice) => (
            <Link key={invoice.id} href={`/invoices/${invoice.id}`}>
              <InvoiceCard 
                status={invoice.status}
                amount={invoice.amount}
                clientName={invoice.clientName}
                dueDate={invoice.dueDate}
              />
            </Link>
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