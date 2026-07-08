import api from './axios';
import type { Availability, CreateAvailabilityRequest, UpdateAvailabilityRequest } from '../types/availability';

export const availabilityService = {
  getByBoarder: (boarderId: number): Promise<Availability[]> =>
    api.get(`/availability/boarder/${boarderId}`).then(r => r.data),

  getById: (id: number): Promise<Availability> =>
    api.get(`/availability/${id}`).then(r => r.data),

  create: (request: CreateAvailabilityRequest): Promise<Availability> =>
    api.post('/availability', request).then(r => r.data),

  update: (id: number, request: UpdateAvailabilityRequest): Promise<Availability> =>
    api.put(`/availability/${id}`, request).then(r => r.data),

  delete: (id: number): Promise<void> =>
    api.delete(`/availability/${id}`).then(() => undefined),

  searchByDateRange: (start: string, end: string): Promise<Availability[]> =>
    api.get('/availability/search', { params: { start, end } }).then(r => r.data),
};
