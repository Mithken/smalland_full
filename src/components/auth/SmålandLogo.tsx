import React from 'react';
import { Globe } from 'lucide-react';

export function SmålandLogo() {
  return (
    <div className="relative">
      <div className="w-32 h-32 bg-indigo-900 rounded-full flex items-center justify-center">
        <Globe className="w-20 h-20 text-white" />
      </div>
      <div className="absolute -top-2 right-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center transform rotate-12">
        <div className="w-4 h-6 bg-white rounded-t-lg" />
      </div>
      <div className="absolute -bottom-1 left-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center transform -rotate-12">
        <div className="w-3 h-5 bg-white rounded-t-lg" />
      </div>
    </div>
  );
}