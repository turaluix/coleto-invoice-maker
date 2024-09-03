'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { projectsData, clientsData, Project } from '../data/mockData'
import { StatusType } from '../types/StatusType'

interface NewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectId: string, clientId: string, amount: string, status: StatusType) => void;
}

export default function NewInvoiceModal({ isOpen, onClose, onSubmit }: NewInvoiceModalProps) {
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState<StatusType>(StatusType.Pending)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Invoice</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(selectedProject, selectedClient, amount, status);
          setSelectedProject('');
          setSelectedClient('');
          setAmount('');
          setStatus(StatusType.Pending);
        }}>
          <div className="mb-4">
            <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
              Project
            </label>
            <select
              id="project"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select a project</option>
              {projectsData.map((project: Project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <select
              id="client"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select a client</option>
              {clientsData.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              {Object.values(StatusType).map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Create Invoice
          </button>
        </form>
      </div>
    </div>
  );
}