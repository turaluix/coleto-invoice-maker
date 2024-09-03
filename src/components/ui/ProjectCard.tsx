import * as React from "react"
import { cn } from "@/lib/utils"
import Link from 'next/link'

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  projectName: string
  totalInvoiced: string
  clientName: string
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, id, projectName, totalInvoiced, clientName, ...props }, ref) => (
    <Link href={`/projects/${id}`}>
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4 cursor-pointer hover:shadow-md transition-shadow",
          className
        )}
        {...props}
      >
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{projectName}</h3>
          <span className="text-sm text-muted-foreground">{clientName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Invoiced:</span>
          <span className="font-medium">{totalInvoiced}</span>
        </div>
      </div>
    </Link>
  )
)
ProjectCard.displayName = "ProjectCard"

export { ProjectCard }