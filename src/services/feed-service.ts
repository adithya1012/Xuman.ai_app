import { mockFeedResponse } from '@/mock/responses/feed-response';
import { api } from '@/services/api';
import { type FeedResponse } from '@/types';

export async function getFeed(): Promise<FeedResponse> {
  try {
    const { data } = await api.get<FeedResponse>('/feed');
    return data;
  } catch {
    return mockFeedResponse;
  }
}
