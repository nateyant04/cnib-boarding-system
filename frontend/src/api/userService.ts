import { api } from './axios';
import type { UpdateProfileRequest, UserProfile } from '../types/user';

export const userService = {
  getUserById: async (id: number): Promise<UserProfile> => {
    const response = await api.get<UserProfile>(`/users/${id}`);
    return response.data;
  },

  getUserByEmail: async (email: string): Promise<UserProfile> => {
    const response = await api.get<UserProfile>(`/users/email/${email}`);
    return response.data;
  },

  updateProfile: async (id: number, data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await api.put<UserProfile>(`/users/${id}`, data);
    return response.data;
  },

  getUsersByRole: async (role: string): Promise<UserProfile[]> => {
    const response = await api.get<UserProfile[]>(`/users/role/${role}`);
    return response.data;
  },
};
