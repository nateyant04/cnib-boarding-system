import { api } from './axios';

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: 'BOARDER' | 'PUPPY_RAISER' | 'TRAINER' | 'COORDINATOR';
  createdAt: string;
  updatedAt: string;
}

export const userService = {
  /**
   * Get user by ID
   */
  getUserById: async (id: number): Promise<UserProfile> => {
    const response = await api.get<UserProfile>(`/users/${id}`);
    return response.data;
  },

  /**
   * Get user by email
   */
  getUserByEmail: async (email: string): Promise<UserProfile> => {
    const response = await api.get<UserProfile>(`/users/email/${email}`);
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (id: number, data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await api.put<UserProfile>(`/users/${id}`, data);
    return response.data;
  }
};
