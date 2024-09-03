import { projectsData } from '../../../data/mockData'

// Add this type definition
type Project = {
  id: string;
  name: string;
  clientName: string;
  totalInvoiced: string | number;
  // Add other properties as needed
};

export default function ProjectPage({ params }: { params: { id: string } }) {
  // Update the find function to use the correct type
  const project = projectsData.find(p => p.id === params.id) as Project | undefined;

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <div className="space-y-2">
        <p><span className="font-semibold">Client:</span> {project.clientName}</p>
        <p><span className="font-semibold">Total Invoiced:</span> {project.totalInvoiced}</p>
      </div>
      {/* Add more project details here */}
    </div>
  )
}