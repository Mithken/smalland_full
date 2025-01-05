import { create } from 'zustand';

interface SearchState {
  searchTerm: string;
  searchScope: 'nexuses' | 'stories' | 'users';
  setSearchTerm: (term: string) => void;
  setSearchScope: (scope: 'nexuses' | 'stories' | 'users') => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  searchScope: 'nexuses',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSearchScope: (searchScope) => set({ searchScope })
}));