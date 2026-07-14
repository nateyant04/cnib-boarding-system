import { api } from './axios';
import type { Dog, CreateDogRequest } from '../types/dog';

export const dogService = {
  create: (request: CreateDogRequest): Promise<Dog> =>
    api.post('/dogs', request).then(r => r.data),

  getById: (id: number): Promise<Dog> =>
    api.get(`/dogs/${id}`).then(r => r.data),

  getAll: (): Promise<Dog[]> =>
    api.get('/dogs').then(r => r.data),

  getByPuppyRaiser: (puppyRaiserId: number): Promise<Dog[]> =>
    api.get(`/dogs/puppy-raiser/${puppyRaiserId}`).then(r => r.data),
};
