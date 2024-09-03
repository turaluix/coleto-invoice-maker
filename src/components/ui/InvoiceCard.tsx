import React from 'react'
import { StatusType } from '../../types/StatusType'

interface InvoiceCardProps {
  status: StatusType
  amount: string
  projectName: string
  clientName: string
}

export function InvoiceCard({ status, amount, projectName, clientName }: InvoiceCardProps) {
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

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{projectName}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{clientName}</p>
      <p className="text-2xl font-bold text-gray-900">{amount}</p>
    </div>
  )
}