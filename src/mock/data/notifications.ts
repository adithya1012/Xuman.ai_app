import { type AppNotification } from '@/types';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function timeAgo(milliseconds: number): string {
  return new Date(Date.now() - milliseconds).toISOString();
}

export const mockNotifications: AppNotification[] = [
  {
    id: 'notification-1',
    type: 'reminder',
    title: 'Call starting soon',
    body: 'Your session with Andre Okafor starts in 30 minutes. Have your pitch deck ready.',
    createdAt: timeAgo(12 * MINUTE),
    read: false,
    creatorId: 'creator-2',
  },
  {
    id: 'notification-2',
    type: 'creator',
    title: 'New video from Maya Chen',
    body: 'Stop presenting screens. Present decisions. How senior designers run critique.',
    createdAt: timeAgo(3 * HOUR),
    read: false,
    creatorId: 'creator-1',
  },
  {
    id: 'notification-3',
    type: 'booking',
    title: 'Booking confirmed',
    body: 'Your call with Elena Volkov is confirmed. Check Meetings for the details.',
    createdAt: timeAgo(9 * HOUR),
    read: false,
  },
  {
    id: 'notification-4',
    type: 'creator',
    title: 'Sofia Reyes posted a new reel',
    body: 'Protein at breakfast changes everything. Three options you can make in five minutes.',
    createdAt: timeAgo(1 * DAY + 4 * HOUR),
    read: true,
    creatorId: 'creator-3',
  },
  {
    id: 'notification-5',
    type: 'system',
    title: 'Welcome to Xuman',
    body: 'Watch reels from experts and book a 1:1 call in minutes. Start exploring.',
    createdAt: timeAgo(3 * DAY),
    read: true,
  },
];
