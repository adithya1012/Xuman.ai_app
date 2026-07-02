import { create } from 'zustand';

import { getUser } from '@/services/user-service';
import { type UserProfile } from '@/types';

type ProfileStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface AppSettings {
  autoplayReels: boolean;
  pushNotifications: boolean;
  emailUpdates: boolean;
}

interface ProfileState {
  user: UserProfile | null;
  status: ProfileStatus;
  settings: AppSettings;
  loadProfile: () => Promise<void>;
  toggleSetting: (key: keyof AppSettings) => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  user: null,
  status: 'idle',
  settings: {
    autoplayReels: true,
    pushNotifications: true,
    emailUpdates: false,
  },

  loadProfile: async () => {
    set({ status: 'loading' });
    try {
      const { user } = await getUser();
      set({ user, status: 'ready' });
    } catch {
      set({ status: 'error' });
    }
  },

  toggleSetting: (key) => {
    const { settings } = get();
    set({ settings: { ...settings, [key]: !settings[key] } });
  },
}));
