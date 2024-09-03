import { ClientCard } from '../../components/ui/ClientCard'
import { clientsData } from '../../data/mockData'

export default function Clients() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-primary">Clients</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientsData.map((client, index) => (
          <ClientCard 
            key={index}
            // ... client-specific props
          />
        ))}
      </div>
    </>
  )
}
