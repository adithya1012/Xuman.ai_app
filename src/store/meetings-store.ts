import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getMeetings } from '@/services/meeting-service';
import { type Meeting } from '@/types';

type MeetingsStatus = 'idle' | 'loading' | 'ready' | 'error';

function startTimestamp(meeting: Meeting): number {
  return new Date(`${meeting.date}T${meeting.timeLabel}:00`).getTime();
}

interface MeetingsState {
  fetched: Meeting[];
  /** Bookings confirmed in this session, shown ahead of backend data. */
  local: Meeting[];
  status: MeetingsStatus;
  loadMeetings: () => Promise<void>;
  addMeeting: (meeting: Meeting) => void;
}

export const useMeetingsStore = create<MeetingsState>()(
  persist(
    (set, get) => ({
      fetched: [],
      local: [],
      status: 'idle',

      loadMeetings: async () => {
        set({ status: 'loading' });
        try {
          const { meetings } = await getMeetings();
          set({ fetched: meetings, status: 'ready' });
        } catch {
          set({ status: 'error' });
        }
      },

      addMeeting: (meeting) => {
        const local = get().local.filter((existing) => existing.id !== meeting.id);
        set({ local: [meeting, ...local] });
      },
    }),
    {
      name: 'xuman-local-meetings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ local: state.local }),
    },
  ),
);

export function selectMeetingsByStatus(
  state: Pick<MeetingsState, 'fetched' | 'local'>,
  status: Meeting['status'],
): Meeting[] {
  const merged = [...state.local, ...state.fetched].filter(
    (meeting) => meeting.status === status,
  );
  // Upcoming: soonest first. Completed: most recent first.
  return merged.sort((a, b) =>
    status === 'upcoming'
      ? startTimestamp(a) - startTimestamp(b)
      : startTimestamp(b) - startTimestamp(a),
  );
}

export function selectMeetingById(
  state: Pick<MeetingsState, 'fetched' | 'local'>,
  id: string,
): Meeting | undefined {
  return [...state.local, ...state.fetched].find((meeting) => meeting.id === id);
}
