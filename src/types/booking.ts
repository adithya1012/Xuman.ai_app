export interface TimeSlot {
  id: string;
  /** 24h start time label, e.g. "09:00". */
  label: string;
  available: boolean;
}

export interface Booking {
  id: string;
  creatorId: string;
  /** ISO date, e.g. "2026-07-06". */
  date: string;
  timeLabel: string;
  note?: string;
  status: 'upcoming' | 'completed';
}
