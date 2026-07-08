export interface Availability {
  id: number;
  boarderId: number;
  boarderName: string;
  startDate: string;
  endDate: string;
  capacity: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAvailabilityRequest {
  boarderId: number;
  startDate: string;
  endDate: string;
  capacity: number;
  notes?: string;
}

export interface UpdateAvailabilityRequest {
  startDate?: string;
  endDate?: string;
  capacity?: number;
  notes?: string;
}
