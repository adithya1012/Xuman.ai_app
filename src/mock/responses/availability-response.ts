import { type AvailabilityResponse, type TimeSlot } from '@/types';

const FIRST_HOUR = 9;
const LAST_HOUR = 17;

// Deterministic so a given creator/date always shows the same availability.
function isSlotAvailable(creatorId: string, date: string, hour: number): boolean {
  const seed = `${creatorId}:${date}:${hour}`;
  let hash = 0;
  for (let index = 0; index < seed.length; index++) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 997;
  }
  return hash % 3 !== 0;
}

export function getMockAvailabilityResponse(
  creatorId: string,
  date: string,
): AvailabilityResponse {
  const slots: TimeSlot[] = [];
  for (let hour = FIRST_HOUR; hour <= LAST_HOUR; hour++) {
    const label = `${String(hour).padStart(2, '0')}:00`;
    slots.push({
      id: `${creatorId}-${date}-${label}`,
      label,
      available: isSlotAvailable(creatorId, date, hour),
    });
  }
  return { date, slots };
}
