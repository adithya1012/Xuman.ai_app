import { type Creator } from '@/types/creator';
import { type Reel } from '@/types/reel';
import { type Review } from '@/types/review';

export interface FeedResponse {
  reels: Reel[];
}

export interface CreatorProfileResponse {
  creator: Creator;
  reels: Reel[];
  reviews: Review[];
}
