'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { 
  FileText, 
  Users, 
  Settings,
  Folder,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const routes = [
  {
    label: 'Invoices',
    icon: FileText,
    href: '/',
    color: "text-violet-500",
  },
  {
    label: 'Projects',
    icon: Folder,
    color: "text-orange-700",
    href: '/projects',
  },
  {
    label: 'Clients',
    icon: Users,
    color: "text-pink-700",
    href: '/clients',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-primary text-white rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className={cn(
        "fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-10",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white w-64">
          <div className="px-3 py-2 flex-1">
            <Link href="/" className="flex items-center pl-3 mb-14">
              <h1 className="text-2xl font-bold">
                Invoice Manager
              </h1>
            </Link>
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                    pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}
