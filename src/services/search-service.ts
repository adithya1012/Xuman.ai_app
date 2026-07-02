import { getMockSearchResponse } from '@/mock/responses/search-response';
import { api } from '@/services/api';
import { type SearchCreatorsResponse } from '@/types';

export async function searchCreators(
  query: string,
  category?: string,
): Promise<SearchCreatorsResponse> {
  try {
    const { data } = await api.get<SearchCreatorsResponse>('/creators/search', {
      params: { q: query, category },
    });
    return data;
  } catch {
    return getMockSearchResponse(query, category);
  }
}
