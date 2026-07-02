import { create } from 'zustand';

import { getFeed } from '@/services/feed-service';
import { type Reel } from '@/types';

type FeedStatus = 'idle' | 'loading' | 'ready' | 'error';

interface FeedState {
  reels: Reel[];
  status: FeedStatus;
  activeIndex: number;
  likedReelIds: Record<string, boolean>;
  muted: boolean;
  /**
   * Reel whose play state the user flipped away from the default (the
   * autoplay preference). Cleared when scrolling to another reel.
   */
  playbackOverrideReelId: string | null;
  loadFeed: () => Promise<void>;
  setActiveIndex: (index: number) => void;
  toggleLike: (reelId: string) => void;
  toggleMuted: () => void;
  togglePlayback: (reelId: string) => void;
}

export const useFeedStore = create<FeedState>((set, get) => ({
  reels: [],
  status: 'idle',
  activeIndex: 0,
  likedReelIds: {},
  muted: false,
  playbackOverrideReelId: null,

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
      set({ activeIndex: index, playbackOverrideReelId: null });
    }
  },

  toggleLike: (reelId) => {
    const { likedReelIds } = get();
    set({ likedReelIds: { ...likedReelIds, [reelId]: !likedReelIds[reelId] } });
  },

  toggleMuted: () => {
    set({ muted: !get().muted });
  },

  togglePlayback: (reelId) => {
    set({
      playbackOverrideReelId: get().playbackOverrideReelId === reelId ? null : reelId,
    });
  },
}));
