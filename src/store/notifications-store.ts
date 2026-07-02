import { create } from 'zustand';

import { getNotifications } from '@/services/notification-service';
import { type AppNotification } from '@/types';

type NotificationsStatus = 'idle' | 'loading' | 'ready' | 'error';

interface NotificationsState {
  notifications: AppNotification[];
  status: NotificationsStatus;
  loadNotifications: () => Promise<void>;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  status: 'idle',

  loadNotifications: async () => {
    set({ status: 'loading' });
    try {
      const { notifications } = await getNotifications();
      set({ notifications, status: 'ready' });
    } catch {
      set({ status: 'error' });
    }
  },

  markRead: (id) => {
    set({
      notifications: get().notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    });
  },

  markAllRead: () => {
    set({
      notifications: get().notifications.map((notification) =>
        notification.read ? notification : { ...notification, read: true },
      ),
    });
  },
}));

export function countUnread(notifications: AppNotification[]): number {
  return notifications.filter((notification) => !notification.read).length;
}
