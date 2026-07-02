import { create } from 'zustand';

import { createBooking, getAvailability } from '@/services/booking-service';
import { type Booking, type TimeSlot } from '@/types';
import { getUpcomingDates, toISODate } from '@/utils/date';

const BOOKABLE_DAYS = 14;

type SlotsStatus = 'idle' | 'loading' | 'ready' | 'error';
type ConfirmStatus = 'idle' | 'submitting' | 'success' | 'error';

interface BookingState {
  creatorId: string | null;
  dates: string[];
  selectedDate: string | null;
  slots: TimeSlot[];
  slotsStatus: SlotsStatus;
  selectedSlotId: string | null;
  confirmStatus: ConfirmStatus;
  lastBooking: Booking | null;
  start: (creatorId: string) => void;
  selectDate: (date: string) => Promise<void>;
  selectSlot: (slotId: string) => void;
  confirm: (note?: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  creatorId: null,
  dates: [],
  selectedDate: null,
  slots: [],
  slotsStatus: 'idle',
  selectedSlotId: null,
  confirmStatus: 'idle',
  lastBooking: null,

  start: (creatorId) => {
    const dates = getUpcomingDates(BOOKABLE_DAYS).map(toISODate);
    set({
      creatorId,
      dates,
      selectedDate: null,
      slots: [],
      slotsStatus: 'idle',
      selectedSlotId: null,
      confirmStatus: 'idle',
      lastBooking: null,
    });
    const firstDate = dates[0];
    if (firstDate) {
      get().selectDate(firstDate);
    }
  },

  selectDate: async (date) => {
    const { creatorId } = get();
    if (!creatorId) {
      return;
    }
    set({ selectedDate: date, slots: [], slotsStatus: 'loading', selectedSlotId: null });
    try {
      const { slots } = await getAvailability(creatorId, date);
      // Ignore responses for dates the user has already navigated away from.
      if (get().selectedDate === date) {
        set({ slots, slotsStatus: 'ready' });
      }
    } catch {
      if (get().selectedDate === date) {
        set({ slotsStatus: 'error' });
      }
    }
  },

  selectSlot: (slotId) => {
    set({ selectedSlotId: slotId === get().selectedSlotId ? null : slotId });
  },

  confirm: async (note) => {
    const { creatorId, selectedDate, slots, selectedSlotId } = get();
    const slot = slots.find((candidate) => candidate.id === selectedSlotId);
    if (!creatorId || !selectedDate || !slot) {
      return;
    }
    set({ confirmStatus: 'submitting' });
    try {
      const { booking } = await createBooking({
        creatorId,
        date: selectedDate,
        timeLabel: slot.label,
        note: note?.trim() ? note.trim() : undefined,
      });
      set({ confirmStatus: 'success', lastBooking: booking });
    } catch {
      set({ confirmStatus: 'error' });
    }
  },
}));
