'use client';

import { useState } from 'react';
import { ProjectCard } from '../../components/ui/ProjectCard'
import { NewProjectModal } from '../../components/NewProjectModal'
import { clientsData } from '../../data/mockData'

interface Project {
  id: string;
  projectName: string;
  totalInvoiced: string;
  clientName: string;
}

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleNewProject = (projectName: string, clientId: string) => {
    const client = clientsData.find(c => c.id === clientId);
    const clientName = client ? client.name : 'Unknown Client';

    const newProject: Project = {
      id: Date.now().toString(),
      projectName,
      totalInvoiced: '$0',
      clientName: clientName,
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
        >
          + Add new
        </button>
      </div>
      {projects.length > 0 ? (
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
      ) : (
        <p className="text-center text-gray-500">No projects yet. Create a new project to get started.</p>
      )}
      <NewProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewProject}
      />
    </div>
  )
}
