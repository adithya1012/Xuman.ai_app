import { type Booking, type TimeSlot } from '@/types/booking';
import { type Creator } from '@/types/creator';
import { type Meeting } from '@/types/meeting';
import { type AppNotification } from '@/types/notification';
import { type UserProfile } from '@/types/user';
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

export interface AvailabilityResponse {
  date: string;
  slots: TimeSlot[];
}

export interface CreateBookingRequest {
  creatorId: string;
  date: string;
  timeLabel: string;
  note?: string;
}

export interface CreateBookingResponse {
  booking: Booking;
}

export interface MeetingsResponse {
  meetings: Meeting[];
}

export interface SearchCreatorsResponse {
  creators: Creator[];
}

export interface NotificationsResponse {
  notifications: AppNotification[];
}

export interface UserResponse {
  user: UserProfile;
}
