import { StatusType } from '../types/StatusType'

type ProjectData = {
  id: string;
  status: StatusType;
  amount: string;
  projectName: string;
  clientName: string;
  totalInvoiced: string;
  // Add other properties as needed
};

export interface Project {
  id: string;
  name: string;
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
    id: '1',
    status: StatusType.Pending,
    amount: '$5,000',
    projectName: 'Logo Design',
    clientName: 'TechStart Inc.',
    totalInvoiced: '$5,000'
  },
  {
    id: '2',
    status: StatusType.Paid,
    amount: '$10,000',
    projectName: 'Website Redesign',
    clientName: 'Acme Corporation',
    totalInvoiced: '$10,000'
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