import { create } from 'zustand';

import { getCreatorProfile } from '@/services/creator-service';
import { type CreatorProfileResponse } from '@/types';

type CreatorStatus = 'idle' | 'loading' | 'ready' | 'error';

interface CreatorState {
  profile: CreatorProfileResponse | null;
  status: CreatorStatus;
  loadCreator: (creatorId: string) => Promise<void>;
}

export const useCreatorStore = create<CreatorState>((set) => ({
  profile: null,
  status: 'idle',

  loadCreator: async (creatorId) => {
    set({ status: 'loading', profile: null });
    try {
      const profile = await getCreatorProfile(creatorId);
      set({ profile, status: 'ready' });
    } catch {
      set({ status: 'error' });
    }
  },
}));
