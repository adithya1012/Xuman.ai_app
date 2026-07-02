import { getMockAvailabilityResponse } from '@/mock/responses/availability-response';
import { getMockCreateBookingResponse } from '@/mock/responses/booking-response';
import { api } from '@/services/api';
import {
  type AvailabilityResponse,
  type CreateBookingRequest,
  type CreateBookingResponse,
} from '@/types';

export async function getAvailability(
  creatorId: string,
  date: string,
): Promise<AvailabilityResponse> {
  try {
    const { data } = await api.get<AvailabilityResponse>(
      `/creators/${creatorId}/availability`,
      { params: { date } },
    );
    return data;
  } catch {
    return getMockAvailabilityResponse(creatorId, date);
  }
}

export async function createBooking(
  request: CreateBookingRequest,
): Promise<CreateBookingResponse> {
  try {
    const { data } = await api.post<CreateBookingResponse>('/bookings', request);
    return data;
  } catch {
    return getMockCreateBookingResponse(request);
  }
}
