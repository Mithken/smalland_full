import React from 'react';
import { Trophy } from 'lucide-react';

export function TrophyShelf() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
        Trophy Shelf
      </h2>
      <div className="space-y-4">
        {/* Trophy placeholders - will be populated with actual trophies */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-gray-50 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}