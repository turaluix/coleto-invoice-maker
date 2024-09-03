import { StatusType } from '../../types'
import * as React from "react"
import { cn } from "@/lib/utils"

interface InvoiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType
  amount: string
  projectName: string
  clientName: string
}

const statusStyles: Record<StatusType, string> = {
  Sent: "bg-blue-100 text-blue-800",
  Viewed: "bg-yellow-100 text-yellow-800",
  Paid: "bg-green-100 text-green-800"
}

const InvoiceCard = React.forwardRef<HTMLDivElement, InvoiceCardProps>(
  ({ className, status, amount, projectName, clientName, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-lg p-6 space-y-4",
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-center">
        <span className="text-3xl font-bold">{amount}</span>
        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", statusStyles[status])}>{status}</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Project:</span>
          <span className="font-medium">{projectName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Client:</span>
          <span className="font-medium">{clientName}</span>
        </div>
      </div>
    </div>
  )
)
InvoiceCard.displayName = "InvoiceCard"

export { InvoiceCard }