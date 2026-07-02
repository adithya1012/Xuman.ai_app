import { create } from 'zustand';

import { type Category } from '@/constants/categories';
import { searchCreators } from '@/services/search-service';
import { type Creator } from '@/types';

type SearchStatus = 'idle' | 'loading' | 'ready' | 'error';

interface SearchState {
  query: string;
  category: Category | null;
  results: Creator[];
  status: SearchStatus;
  setQuery: (query: string) => void;
  setCategory: (category: Category | null) => void;
  search: () => Promise<void>;
}

let requestId = 0;

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  category: null,
  results: [],
  status: 'idle',

  setQuery: (query) => set({ query }),

  setCategory: (category) => {
    set({ category });
    get().search();
  },

  search: async () => {
    const { query, category } = get();
    const currentRequest = ++requestId;
    set({ status: 'loading' });
    try {
      const { creators } = await searchCreators(query, category ?? undefined);
      if (currentRequest === requestId) {
        set({ results: creators, status: 'ready' });
      }
    } catch {
      if (currentRequest === requestId) {
        set({ status: 'error' });
      }
    }
  },
}));
