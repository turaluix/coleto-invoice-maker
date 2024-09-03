import React from 'react'
import { StatusType } from '../../types/StatusType'

interface InvoiceCardProps {
  status: StatusType
  amount: string
  clientName: string
  dueDate: string
}

export function InvoiceCard({ status, amount, clientName, dueDate }: InvoiceCardProps) {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
  }

  return (
    <div 
      className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{clientName}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      <div className="mb-2">
        <p className="text-sm text-gray-600">Amount</p>
        <p className="text-2xl font-bold text-gray-900">{amount}</p>
      </div>
      <p className="text-sm text-gray-600">Due: {formatDate(dueDate)}</p>
    </div>
  )
}