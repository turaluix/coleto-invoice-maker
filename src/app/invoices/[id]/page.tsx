'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ProjectData } from '../../../data/mockData'
import { StatusType } from '../../../types/StatusType'
import { useInvoices } from '../../../contexts/InvoiceContext'
import { useSettings } from '../../../contexts/SettingsContext'
import { useClients } from '../../../contexts/ClientContext'
import { ArrowLeft, Edit2, Save, X, Plus } from 'lucide-react'

interface InvoiceItem {
  description: string;
  amount: string;
}

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { invoices, updateInvoice } = useInvoices()
  const { companyDetails } = useSettings()
  const { clients } = useClients()
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
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        <ArrowLeft className="mr-2" size={20} /> Back to Invoices
      </button>
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Invoice #{invoice.id}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(invoice.status)}`}>
              {invoice.status}
            </span>
          </div>
          <div className="mt-4 md:mt-0 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{companyDetails.companyName}</h2>
            <p className="text-gray-600">{companyDetails.address}</p>
            <p className="text-gray-600">{companyDetails.email}</p>
            <p className="text-gray-600">{companyDetails.phoneNumber}</p>
            {companyDetails.vat && <p className="text-gray-600">VAT: {companyDetails.vat}</p>}
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
            {isEditing ? (
              <select
                name="clientName"
                value={editedInvoice.clientName}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.companyName}>{client.companyName}</option>
                ))}
              </select>
            ) : (
              <>
                <p className="font-medium">{invoice.clientName}</p>
                {clients.find(c => c.companyName === invoice.clientName)?.address && (
                  <p className="text-gray-600">{clients.find(c => c.companyName === invoice.clientName)?.address}</p>
                )}
                {clients.find(c => c.companyName === invoice.clientName)?.email && (
                  <p className="text-gray-600">{clients.find(c => c.companyName === invoice.clientName)?.email}</p>
                )}
              </>
            )}
          </div>
          <div className="text-right">
            <div className="mb-2">
              <span className="font-semibold">Invoice Date:</span>{' '}
              {isEditing ? (
                <input
                  type="date"
                  name="invoiceDate"
                  value={editedInvoice.invoiceDate}
                  onChange={handleInputChange}
                  className="border rounded p-2"
                />
              ) : (
                formatDate(invoice.invoiceDate)
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Due Date:</span>{' '}
              {isEditing ? (
                <input
                  type="date"
                  name="dueDate"
                  value={editedInvoice.dueDate}
                  onChange={handleInputChange}
                  className="border rounded p-2"
                />
              ) : (
                formatDate(invoice.dueDate)
              )}
            </div>
            {isEditing && (
              <select
                name="status"
                value={editedInvoice.status}
                onChange={handleInputChange}
                className="w-full border rounded p-2 mt-2"
              >
                {Object.values(StatusType).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-right py-3 px-4">Amount</th>
                {isEditing && <th className="text-right py-3 px-4">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="w-full border rounded p-2"
                      />
                    ) : (
                      item.description
                    )}
                  </td>
                  <td className="text-right py-3 px-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.amount}
                        onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                        className="w-full border rounded p-2 text-right"
                        placeholder="0.00"
                      />
                    ) : (
                      item.amount || '$0.00'
                    )}
                  </td>
                  {isEditing && (
                    <td className="text-right py-3 px-4">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold bg-gray-50">
                <td className="py-3 px-4">Total</td>
                <td className="text-right py-3 px-4">
                  ${calculateTotal(items)}
                </td>
                {isEditing && (
                  <td className="text-right py-3 px-4">
                    <button
                      onClick={addItem}
                      className="text-blue-500 hover:text-blue-700 flex items-center justify-end w-full"
                    >
                      <Plus size={20} className="mr-1" /> Add Item
                    </button>
                  </td>
                )}
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Notes:</h4>
          <p className="text-gray-600">Thank you for your business!</p>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              >
                <Save className="mr-2" size={20} /> Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditedInvoice(invoice)
                  setItems([{ description: invoice.projectName, amount: invoice.amount }])
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center"
              >
                <X className="mr-2" size={20} /> Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
              >
                <Edit2 className="mr-2" size={20} /> Edit Invoice
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