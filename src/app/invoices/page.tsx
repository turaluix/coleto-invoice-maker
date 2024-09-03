import { InvoiceCard } from '../../components/ui/InvoiceCard'
import { invoicesData, ProjectData } from '../../data/mockData'
import { StatusType } from '../../types'
import Link from 'next/link'

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Link href="/invoices/new" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
          + Add new
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoicesData.map((invoice: ProjectData, index) => (
          <InvoiceCard 
            key={index}
            status={invoice.status as StatusType}
            amount={invoice.amount}
            projectName={invoice.projectName}
            clientName={invoice.clientName}
          />
        ))}
      </div>
    </div>
  )
}