import { getMockCreatorProfileResponse } from '@/mock/responses/creator-profile-response';
import { api } from '@/services/api';
import { type CreatorProfileResponse } from '@/types';

export async function getCreatorProfile(creatorId: string): Promise<CreatorProfileResponse> {
  try {
    const { data } = await api.get<CreatorProfileResponse>(`/creators/${creatorId}`);
    return data;
  } catch {
    return getMockCreatorProfileResponse(creatorId);
  }
}
