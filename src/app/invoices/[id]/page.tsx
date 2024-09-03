'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ProjectData, clientsData } from '../../../data/mockData'
import { StatusType } from '../../../types/StatusType'
import { useInvoices } from '../../../contexts/InvoiceContext'

interface InvoiceItem {
  description: string;
  amount: string;
}

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { invoices, updateInvoice } = useInvoices()
  const [invoice, setInvoice] = useState<ProjectData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedInvoice, setEditedInvoice] = useState<ProjectData | null>(null)
  const [items, setItems] = useState<InvoiceItem[]>([])

  useEffect(() => {
    const foundInvoice = invoices.find(inv => inv.id === params.id)
    setInvoice(foundInvoice || null)
    setEditedInvoice(foundInvoice || null)
    setItems(foundInvoice ? [{ description: foundInvoice.projectName, amount: foundInvoice.amount }] : [])
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return 'Invalid Date'
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editedInvoice) {
      setEditedInvoice({ ...editedInvoice, [e.target.name]: e.target.value })
    }
  }

  const handleItemChange = (index: number, field: 'description' | 'amount', value: string) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { description: '', amount: '' }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => {
      const amount = parseFloat(item.amount.replace('$', '').trim());
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0).toFixed(2);
  };

  const handleSave = () => {
    if (editedInvoice) {
      const totalAmount = calculateTotal(items);
      const updatedInvoice = {
        ...editedInvoice,
        projectName: items.map(item => item.description).join(', '),
        amount: `$${totalAmount}`,
        totalInvoiced: `$${totalAmount}`
      };
      updateInvoice(updatedInvoice);
      setInvoice(updatedInvoice);
      setIsEditing(false);
    }
  }

  if (!invoice || !editedInvoice) {
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
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Invoice</h1>
            <p className="text-gray-600">#{invoice.id}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold mb-2">Your Company Name</h2>
            <p className="text-gray-600">123 Your Street</p>
            <p className="text-gray-600">Your City, State 12345</p>
            <p className="text-gray-600">your@email.com</p>
          </div>
        </div>

        <div className="flex justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
            {isEditing ? (
              <select
                name="clientName"
                value={editedInvoice.clientName}
                onChange={handleInputChange}
                className="border rounded p-1"
              >
                {clientsData.map(client => (
                  <option key={client.id} value={client.name}>{client.name}</option>
                ))}
              </select>
            ) : (
              <p className="font-medium">{invoice.clientName}</p>
            )}
            <p className="text-gray-600">Client Address</p>
            <p className="text-gray-600">Client City, State 54321</p>
          </div>
          <div className="text-right">
            <p>
              <span className="font-semibold">Invoice Date:</span>{' '}
              {isEditing ? (
                <input
                  type="date"
                  name="invoiceDate"
                  value={editedInvoice.invoiceDate}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                formatDate(invoice.invoiceDate)
              )}
            </p>
            <p>
              <span className="font-semibold">Due Date:</span>{' '}
              {isEditing ? (
                <input
                  type="date"
                  name="dueDate"
                  value={editedInvoice.dueDate}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                />
              ) : (
                formatDate(invoice.dueDate)
              )}
            </p>
            <p className="mt-2">
              {isEditing ? (
                <select
                  name="status"
                  value={editedInvoice.status}
                  onChange={handleInputChange}
                  className="border rounded p-1"
                >
                  {Object.values(StatusType).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              ) : (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              )}
            </p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Amount</th>
              {isEditing && <th className="text-right py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td className="text-right py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={item.amount}
                      onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                      className="border rounded p-1 text-right w-full"
                      placeholder="0.00"
                    />
                  ) : (
                    item.amount || '$0.00'
                  )}
                </td>
                {isEditing && (
                  <td className="text-right py-2">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t font-semibold">
              <td className="py-2">Total</td>
              <td className="text-right py-2">
                ${calculateTotal(items)}
              </td>
              {isEditing && (
                <td className="text-right py-2">
                  <button
                    onClick={addItem}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Add Item
                  </button>
                </td>
              )}
            </tr>
          </tfoot>
        </table>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Notes:</h4>
          <p className="text-gray-600">Thank you for your business!</p>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditedInvoice(invoice)
                  setItems([{ description: invoice.projectName, amount: invoice.amount }])
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Invoice
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Mark as Paid
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}