import { StatusType } from '../types/StatusType'

type ProjectData = {
  id: string;
  status: StatusType;
  amount: string;
  projectName: string;
  clientName: string;
  totalInvoiced: string;
  invoiceDate: string;
  dueDate: string;
  items: { description: string; amount: string }[];
};

export interface Project {
  id: string;
  name: string;
}

export const projectsData: Project[] = [
  { id: '1', name: 'Logo Design' },
  { id: '2', name: 'Website Redesign' },
  // ... other projects ...
];

export const clientsData = [
  { id: '1', name: 'TechStart Inc.' },
  { id: '2', name: 'Acme Corporation' },
  // ... other clients ...
];

export const invoicesData: ProjectData[] = [
  // ... invoice data ...
];

// ... other exports ...