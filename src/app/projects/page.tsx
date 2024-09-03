'use client';

import { useState } from 'react';
import { ProjectCard } from '../../components/ui/ProjectCard'
import { NewProjectModal } from '../../components/NewProjectModal'
import { projectsData, clientsData } from '../../data/mockData'

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState(projectsData);

  const handleNewProject = (projectName: string, clientId: string) => {
    // Find the client name based on the clientId
    const client = clientsData.find(c => c.id === clientId);
    const clientName = client ? client.name : 'Unknown Client';

    const newProject = {
      id: (projects.length + 1).toString(),
      projectName,
      totalInvoiced: '$0',
      clientName: clientName, // Use the client name instead of ID
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
        >
          + Add new
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            projectName={project.projectName}
            totalInvoiced={project.totalInvoiced}
            clientName={project.clientName}
          />
        ))}
      </div>
      <NewProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewProject}
      />
    </div>
  )
}
