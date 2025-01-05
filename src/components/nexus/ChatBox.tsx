import React from 'react';
import { Send } from 'lucide-react';

export function ChatBox() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-64 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {/* Chat messages will go here */}
        <div className="text-gray-500 text-center mt-8">
          No messages yet
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button className="p-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}