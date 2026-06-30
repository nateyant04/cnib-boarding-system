export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'BOARDER' | 'PUPPY_RAISER' | 'TRAINER' | 'COORDINATOR';
}

export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'BOARDER' | 'PUPPY_RAISER' | 'TRAINER' | 'COORDINATOR';
}
