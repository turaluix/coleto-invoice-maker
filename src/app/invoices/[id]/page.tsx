'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ProjectData } from '../../../data/mockData'
import { StatusType } from '../../../types/StatusType'
import { useInvoices } from '../../../contexts/InvoiceContext'

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [invoice, setInvoice] = useState<ProjectData | null>(null)
  const { invoices } = useInvoices()

  useEffect(() => {
    const foundInvoice = invoices.find(inv => inv.id === params.id)
    setInvoice(foundInvoice || null)
  }, [params.id, invoices])

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!invoice) {
    return <div>Invoice not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        &larr; Back to Invoices
      </button>
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">Invoice Details</h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Project:</span>
            <span>{invoice.projectName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Client:</span>
            <span>{invoice.clientName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Amount:</span>
            <span className="text-xl font-bold">{invoice.amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(invoice.status)}`}>
              {invoice.status}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Invoiced:</span>
            <span>{invoice.totalInvoiced}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Invoice ID:</span>
            <span>{invoice.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Invoice Date:</span>
            <span>{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Due Date:</span>
            <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}