import { projectsData } from '../../../data/mockData'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projectsData.find(p => p.id === params.id)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{project.projectName}</h1>
      <div className="space-y-2">
        <p><span className="font-semibold">Client:</span> {project.clientName}</p>
        <p><span className="font-semibold">Total Invoiced:</span> {project.totalInvoiced}</p>
      </div>
      {/* Add more project details here */}
    </div>
  )
}