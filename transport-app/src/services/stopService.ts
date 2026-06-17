import api from '../api/client';

export async function getStopById(id: number) {
  const response = await api.get(`/stops/${id}`);
  return response.data;
}

export async function getNearestStops(lat: number, lng: number, limit = 5) {
  const response = await api.get('/stops/nearest', {
    params: { lat, lng, limit },
  });

  return response.data;
}

export async function getStopDepartures(id: number, limit = 10) {
  const response = await api.get(`/stops/${id}/departures`, {
    params: { limit },
  });

  return response.data;
}