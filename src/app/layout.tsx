import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from '@/components/Sidebar';
import { InvoiceProvider } from '../contexts/InvoiceContext';
import { SettingsProvider } from '../contexts/SettingsContext';
import { ClientProvider } from '../contexts/ClientContext';
import { ProjectProvider } from '../contexts/ProjectContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice Manager",
  description: "Manage your invoices with ease",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>
          <InvoiceProvider>
            <ClientProvider>
              <ProjectProvider>
                <div className="flex flex-col lg:flex-row min-h-screen">
                  <Sidebar />
                  <main className="flex-1 p-4 lg:p-8">
                    {children}
                  </main>
                </div>
              </ProjectProvider>
            </ClientProvider>
          </InvoiceProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
