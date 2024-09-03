import React from 'react'
import { X } from 'lucide-react'
import { ProjectData } from '../data/mockData'
import { StatusType } from '../types/StatusType'

interface InvoiceDetailsProps {
  invoice: ProjectData
  onClose: () => void
}

export default function InvoiceDetails({ invoice, onClose }: InvoiceDetailsProps) {
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case StatusType.Paid:
        return 'bg-green-100 text-green-800'
      case StatusType.Pending:
        return 'bg-yellow-100 text-yellow-800'
      case StatusType.Overdue:
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Invoice Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
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