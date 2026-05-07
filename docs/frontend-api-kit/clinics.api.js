import { apiRequest } from './apiClient.js';

export const clinicsApi = {
  getNearby({ lat, lng, radiusKm = 10 }) {
    return apiRequest('/clinics/nearby', {
      method: 'GET',
      query: { lat, lng, radiusKm },
    });
  },

  getById(id) {
    return apiRequest(`/clinics/${id}`, {
      method: 'GET',
    });
  },
};
