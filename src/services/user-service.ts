import { mockUserResponse } from '@/mock/responses/user-response';
import { api } from '@/services/api';
import { type UserResponse } from '@/types';

export async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await api.get<UserResponse>('/me');
    return data;
  } catch {
    return mockUserResponse;
  }
}
