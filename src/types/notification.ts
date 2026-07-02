export type NotificationType = 'booking' | 'reminder' | 'creator' | 'system';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  /** ISO datetime. */
  createdAt: string;
  read: boolean;
  /** Present when the notification links to a creator. */
  creatorId?: string;
}
