import { mockCreators } from '@/mock/data/creators';
import { type SearchCreatorsResponse } from '@/types';

export function getMockSearchResponse(query: string, category?: string): SearchCreatorsResponse {
  const normalized = query.trim().toLowerCase();

  const creators = mockCreators.filter((creator) => {
    const matchesCategory = !category || creator.category === category;
    const matchesQuery =
      normalized.length === 0 ||
      creator.name.toLowerCase().includes(normalized) ||
      creator.handle.toLowerCase().includes(normalized) ||
      creator.profession.toLowerCase().includes(normalized) ||
      creator.category.toLowerCase().includes(normalized);
    return matchesCategory && matchesQuery;
  });

  return { creators };
}
