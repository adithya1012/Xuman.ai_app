import { mockCreators } from '@/mock/data/creators';
import { mockReels } from '@/mock/data/reels';
import { mockReviews } from '@/mock/data/reviews';
import { type CreatorProfileResponse } from '@/types';

export function getMockCreatorProfileResponse(creatorId: string): CreatorProfileResponse {
  const creator = mockCreators.find((candidate) => candidate.id === creatorId);
  if (!creator) {
    throw new Error(`Unknown creator: ${creatorId}`);
  }

  return {
    creator,
    reels: mockReels.filter((reel) => reel.creator.id === creatorId),
    reviews: mockReviews.filter((review) => review.creatorId === creatorId),
  };
}
