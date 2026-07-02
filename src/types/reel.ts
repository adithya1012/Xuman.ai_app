import { type Creator } from '@/types/creator';

export interface Reel {
  id: string;
  creator: Creator;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
}
