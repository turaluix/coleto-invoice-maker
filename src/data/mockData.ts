export interface ProjectData {
  id: string
  projectName: string
  totalInvoiced: string
  clientName: string
  status?: StatusType // Add this if it's not already there
}

export interface Project {
  id: string
  name: string
}

export const projectsData: Project[] = [
  { id: '1', name: 'Logo Design' },
  { id: '2', name: 'Website Redesign' },
  // Add more projects as needed
];

// Make sure there's no default export that might be interfering
// export default { ... }  // Remove or comment out if present

export const invoicesData: ProjectData[] = [
  {
    status: 'Sent',
    amount: '$5,000',
    projectName: 'Logo Design',
    clientName: 'TechStart Inc.'
  },
  {
    status: 'Viewed',
    amount: '$10,000',
    projectName: 'Website Redesign',
    clientName: 'Acme Corporation'
  },
  // ... more invoice data ...
];

export const clientsData = [
  { id: '1', name: 'TechStart Inc.' },
  { id: '2', name: 'Acme Corporation' },
  { id: '3', name: 'Global Solutions Ltd.' },
  { id: '4', name: 'Innovative Startups Co.' },
];

// ... other data types