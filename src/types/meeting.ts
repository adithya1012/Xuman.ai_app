import { type Creator } from '@/types/creator';

export type MeetingStatus = 'upcoming' | 'completed';

export interface Meeting {
  id: string;
  creator: Creator;
  /** ISO date, e.g. "2026-07-06". */
  date: string;
  /** 24h start time label, e.g. "14:00". */
  timeLabel: string;
  durationMinutes: number;
  note?: string;
  status: MeetingStatus;
}
