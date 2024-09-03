export interface ProjectData {
  id: string
  projectName: string
  totalInvoiced: string
  clientName: string
}

export const projectsData: ProjectData[] = [
  {
    id: '1',
    projectName: 'Logo Design',
    totalInvoiced: '$5,000',
    clientName: 'TechStart Inc.'
  },
  {
    id: '2',
    projectName: 'Website Redesign',
    totalInvoiced: '$10,000',
    clientName: 'Acme Corporation'
  },
  {
    id: '3',
    projectName: 'Mobile App Development',
    totalInvoiced: '$15,000',
    clientName: 'Global Solutions Ltd.'
  },
  {
    id: '4',
    projectName: 'Brand Identity',
    totalInvoiced: '$7,500',
    clientName: 'Innovative Startups Co.'
  }
]

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