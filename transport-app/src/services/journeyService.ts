import api from '../api/client';

export async function searchJourneys(params: {
  fromStopId: number;
  toStopId: number;
  datetime?: string;
  type?: string;
}) {
  const response = await api.get('/journeys', {
    params,
  });

  return response.data;
}