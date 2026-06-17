import api from "../api/client";

export async function searchStops(query: string) {
  const res = await api.get('/stops', {
    params: { q: query },
  });

  return res.data;
}