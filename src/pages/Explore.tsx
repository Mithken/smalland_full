import React from 'react';
import { Compass } from 'lucide-react';

export function Explore() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center space-y-6">
        <Compass className="w-16 h-16 mx-auto text-indigo-600" />
        <h1 className="text-3xl font-bold">Explore Nexuses</h1>
        <p className="text-gray-600">
          Discover communities and projects that match your interests.
        </p>
        {/* Search and filters will go here */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500">No nexuses found.</p>
        </div>
      </div>
    </div>
  );
}