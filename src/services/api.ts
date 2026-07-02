import { create } from 'axios';

import { API_BASE_URL } from '@/constants/api';

// Short timeout: the backend is still under development, so requests are
// expected to fail fast and fall back to mocked responses.
export const api = create({
  baseURL: API_BASE_URL,
  timeout: 2500,
});
