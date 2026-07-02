export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getUpcomingDates(count: number): Date[] {
  const today = new Date();
  return Array.from({ length: count }, (_, index) => addDays(today, index));
}

/** ISO calendar date, e.g. "2026-07-06". */
export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatWeekday(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/** e.g. "Mon, Jul 6". */
export function formatShortDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
