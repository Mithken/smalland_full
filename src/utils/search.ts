import type { Story } from '../types/story';
import type { User } from '../types/user';

interface Searchable {
  id: string;
  [key: string]: any;
}

export function searchSmåland<T extends Searchable>(
  items: T[],
  searchTerm: string,
  fields: (keyof T)[]
): T[] {
  const searchTermLower = searchTerm.toLowerCase();
  
  return items
    .map(item => {
      let score = 0;
      
      for (const field of fields) {
        const value = item[field];
        
        if (!value) continue;
        
        const stringValue = Array.isArray(value) 
          ? value.join(' ') 
          : String(value);
        
        if (stringValue.toLowerCase() === searchTermLower) {
          score += 5; // Exact match
        } else if (stringValue.toLowerCase().startsWith(searchTermLower)) {
          score += 4; // Starts with
        } else if (stringValue.toLowerCase().includes(searchTermLower)) {
          score += 2; // Contains
        }
      }
      
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

export function searchStories(stories: Story[], searchTerm: string): Story[] {
  return searchSmåland(stories, searchTerm, ['title', 'content', 'tags']);
}

export function searchUsers(users: User[], searchTerm: string): User[] {
  return searchSmåland(users, searchTerm, ['username', 'displayName', 'bio']);
}