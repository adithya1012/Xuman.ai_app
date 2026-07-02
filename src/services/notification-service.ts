import { mockNotificationsResponse } from '@/mock/responses/notifications-response';
import { api } from '@/services/api';
import { type NotificationsResponse } from '@/types';

export async function getNotifications(): Promise<NotificationsResponse> {
  try {
    const { data } = await api.get<NotificationsResponse>('/notifications');
    return data;
  } catch {
    return mockNotificationsResponse;
  }
}
