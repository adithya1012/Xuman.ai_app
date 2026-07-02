import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getNotifications } from '@/services/notification-service';
import { type AppNotification } from '@/types';

type NotificationsStatus = 'idle' | 'loading' | 'ready' | 'error';

interface NotificationsState {
  notifications: AppNotification[];
  /** Ids the user has read, persisted across sessions and applied on load. */
  readIds: Record<string, true>;
  status: NotificationsStatus;
  loadNotifications: () => Promise<void>;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      readIds: {},
      status: 'idle',

      loadNotifications: async () => {
        set({ status: 'loading' });
        try {
          const { notifications } = await getNotifications();
          const { readIds } = get();
          set({
            notifications: notifications.map((notification) =>
              readIds[notification.id] ? { ...notification, read: true } : notification,
            ),
            status: 'ready',
          });
        } catch {
          set({ status: 'error' });
        }
      },

      markRead: (id) => {
        const { notifications, readIds } = get();
        set({
          readIds: { ...readIds, [id]: true },
          notifications: notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          ),
        });
      },

      markAllRead: () => {
        const { notifications, readIds } = get();
        const allRead = { ...readIds };
        for (const notification of notifications) {
          allRead[notification.id] = true;
        }
        set({
          readIds: allRead,
          notifications: notifications.map((notification) =>
            notification.read ? notification : { ...notification, read: true },
          ),
        });
      },
    }),
    {
      name: 'xuman-notifications-read',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ readIds: state.readIds }),
      // If the fetch won the race against hydration, re-apply read ids.
      onRehydrateStorage: () => () => {
        const { notifications, readIds } = useNotificationsStore.getState();
        if (notifications.length > 0) {
          useNotificationsStore.setState({
            notifications: notifications.map((notification) =>
              readIds[notification.id] ? { ...notification, read: true } : notification,
            ),
          });
        }
      },
    },
  ),
);

export function countUnread(notifications: AppNotification[]): number {
  return notifications.filter((notification) => !notification.read).length;
}
