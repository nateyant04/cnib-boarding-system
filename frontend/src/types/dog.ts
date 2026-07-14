export interface Dog {
  id: number;
  name: string;
  breed: string | null;
  age: number | null;
  medicalInfo: string | null;
  foodType: string | null;
  profilePictureUrl: string | null;
  puppyRaiserId: number;
  puppyRaiserName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDogRequest {
  name: string;
  breed?: string;
  age?: number;
  medicalInfo?: string;
  foodType?: string;
  profilePictureUrl?: string;
  puppyRaiserId: number;
}
