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
