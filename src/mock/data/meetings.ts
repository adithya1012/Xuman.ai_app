import { mockCreators } from '@/mock/data/creators';
import { type Meeting } from '@/types';
import { addDays, toISODate } from '@/utils/date';

const DEFAULT_DURATION_MINUTES = 30;

// Relative dates keep the mock believable no matter when the app runs.
const today = new Date();

export const mockMeetings: Meeting[] = [
  {
    id: 'meeting-1',
    creator: mockCreators[1],
    date: toISODate(addDays(today, 2)),
    timeLabel: '14:00',
    durationMinutes: DEFAULT_DURATION_MINUTES,
    note: 'Reviewing my seed pitch deck before investor meetings next month.',
    status: 'upcoming',
  },
  {
    id: 'meeting-2',
    creator: mockCreators[4],
    date: toISODate(addDays(today, 6)),
    timeLabel: '10:00',
    durationMinutes: DEFAULT_DURATION_MINUTES,
    status: 'upcoming',
  },
  {
    id: 'meeting-3',
    creator: mockCreators[0],
    date: toISODate(addDays(today, -9)),
    timeLabel: '16:00',
    durationMinutes: DEFAULT_DURATION_MINUTES,
    note: 'Portfolio review: case study structure and storytelling.',
    status: 'completed',
  },
  {
    id: 'meeting-4',
    creator: mockCreators[2],
    date: toISODate(addDays(today, -21)),
    timeLabel: '09:00',
    durationMinutes: DEFAULT_DURATION_MINUTES,
    status: 'completed',
  },
  {
    id: 'meeting-5',
    creator: mockCreators[5],
    date: toISODate(addDays(today, -35)),
    timeLabel: '18:00',
    durationMinutes: DEFAULT_DURATION_MINUTES,
    note: 'Knife skills and pan sauce fundamentals.',
    status: 'completed',
  },
];
