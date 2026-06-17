import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Permission GPS refusée');
        return;
      }

      const current = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    })();
  }, []);

  return { location, error };
}