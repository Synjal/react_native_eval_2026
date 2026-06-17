import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

import { getStopById, getStopDepartures } from '../../services/stopService';
import { getIncidentsByStop } from '../../services/incidentService';
import { getMinutesUntil } from '../../utils/time';
import StatusBadge from "../../components/StatusBadge";

export default function StopDetailScreen({ route }: any) {
  const { id } = route.params;

  const [stop, setStop] = useState<any>(null);
  const [departures, setDepartures] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setLoading(true);

      const [stopData, depData, incData] = await Promise.all([
        getStopById(id),
        getStopDepartures(id, 10),
        getIncidentsByStop(id),
      ]);

      setStop(stopData);
      setDepartures(depData.departures);
      setIncidents(incData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 30000); // refresh toutes les 30s

    return () => clearInterval(interval);
  }, []);

  if (loading || !stop) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>

      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
        {stop.name}
      </Text>

      <Text style={{ color: '#666', marginBottom: 12 }}>
        {stop.address}
      </Text>

      {/* INCIDENTS */}
      {incidents.length > 0 && (
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: '700', marginBottom: 6 }}>
            Incidents
          </Text>

          {incidents.map((i) => (
            <Text key={i.id} style={{ color: 'red' }}>
              ⚠ {i.title}
            </Text>
          ))}
        </View>
      )}

      {/* REFRESH */}
      <TouchableOpacity
        onPress={loadData}
        style={{
          padding: 10,
          backgroundColor: '#eee',
          marginBottom: 10,
          borderRadius: 6,
        }}
      >
        <Text>Rafraîchir</Text>
      </TouchableOpacity>

      {/* DEPARTURES */}
      <FlatList
        data={departures}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const minutes = getMinutesUntil(item.expectedAt);

          return (
            <View
              style={{
                padding: 12,
                borderBottomWidth: 1,
                borderColor: '#eee',
              }}
            >
              <Text style={{ fontWeight: '600' }}>
                Ligne {item.lineName} → {item.destination}
              </Text>

              <StatusBadge status={item.status} />

              <Text style={{ marginTop: 4 }}>
                Dans {minutes} min
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}