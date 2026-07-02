import { create } from 'zustand';

import { getFeed } from '@/services/feed-service';
import { type Reel } from '@/types';

type FeedStatus = 'idle' | 'loading' | 'ready' | 'error';

interface FeedState {
  reels: Reel[];
  status: FeedStatus;
  activeIndex: number;
  likedReelIds: Record<string, boolean>;
  loadFeed: () => Promise<void>;
  setActiveIndex: (index: number) => void;
  toggleLike: (reelId: string) => void;
}

export const useFeedStore = create<FeedState>((set, get) => ({
  reels: [],
  status: 'idle',
  activeIndex: 0,
  likedReelIds: {},

  loadFeed: async () => {
    set({ status: 'loading' });
    try {
      const { reels } = await getFeed();
      set({ reels, status: 'ready', activeIndex: 0 });
    } catch {
      set({ status: 'error' });
    }
  },

  setActiveIndex: (index) => {
    if (index !== get().activeIndex) {
      set({ activeIndex: index });
    }
  },

  toggleLike: (reelId) => {
    const { likedReelIds } = get();
    set({ likedReelIds: { ...likedReelIds, [reelId]: !likedReelIds[reelId] } });
  },
}));
