import React from 'react';
import { Search } from 'lucide-react';
import { useSearchStore } from '../../store/searchStore';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = "Search Nexuses, tags, or descriptions", className = "" }: SearchBarProps) {
  const { searchTerm, setSearchTerm, searchScope, setSearchScope } = useSearchStore();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
      <select
        value={searchScope}
        onChange={(e) => setSearchScope(e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        <option value="nexuses">Nexuses</option>
        <option value="stories">Stories</option>
        <option value="users">Users</option>
      </select>
    </div>
  );
}