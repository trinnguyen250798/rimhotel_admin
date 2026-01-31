import axiosClient from '@/lib/axios';

// Define standard Laravel pagination response type if needed
export interface LaravelPaginatedResponse<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

// Example service
export const ExampleService = {
  // Get list
  getAll: async () => {
    const response = await axiosClient.get('/examples');
    return response.data;
  },

  // Get one
  getById: async (id: number | string) => {
    const response = await axiosClient.get(`/examples/${id}`);
    return response.data;
  },

  // Create
  create: async (data: any) => {
    const response = await axiosClient.post('/examples', data);
    return response.data;
  },

  // Update
  update: async (id: number | string, data: any) => {
    const response = await axiosClient.put(`/examples/${id}`, data);
    return response.data;
  },

  // Delete
  delete: async (id: number | string) => {
    const response = await axiosClient.delete(`/examples/${id}`);
    return response.data;
  }
};

export default ExampleService;
