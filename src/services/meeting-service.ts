import { mockMeetingsResponse } from '@/mock/responses/meetings-response';
import { api } from '@/services/api';
import { type MeetingsResponse } from '@/types';

export async function getMeetings(): Promise<MeetingsResponse> {
  try {
    const { data } = await api.get<MeetingsResponse>('/meetings');
    return data;
  } catch {
    return mockMeetingsResponse;
  }
}
