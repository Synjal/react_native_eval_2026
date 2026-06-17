import api from "../api/client";

export async function getIncidentsByStop(stopId: number) {
  const response = await api.get('/incidents', {
    params: { stopId },
  });

  return response.data;
}