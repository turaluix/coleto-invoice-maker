import React from 'react';

interface ClientCardProps {
  id: string;
  companyName: string;
  email: string;
  address: string;
  vat?: string;
  phoneNumber: string;
}

export default function ClientCard({ companyName, email, address, vat, phoneNumber }: ClientCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800">{companyName}</h3>
      <p className="text-sm text-gray-600">Email: {email}</p>
      <p className="text-sm text-gray-600">Address: {address}</p>
      {vat && <p className="text-sm text-gray-600">VAT: {vat}</p>}
      <p className="text-sm text-gray-600">Phone: {phoneNumber}</p>
    </div>
  );
}