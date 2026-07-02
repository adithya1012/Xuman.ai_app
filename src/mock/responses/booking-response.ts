import { type CreateBookingRequest, type CreateBookingResponse } from '@/types';

export function getMockCreateBookingResponse(
  request: CreateBookingRequest,
): CreateBookingResponse {
  return {
    booking: {
      id: `booking-${Date.now()}`,
      creatorId: request.creatorId,
      date: request.date,
      timeLabel: request.timeLabel,
      note: request.note,
      status: 'upcoming',
    },
  };
}
