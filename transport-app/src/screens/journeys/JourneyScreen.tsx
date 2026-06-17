import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { searchJourneys } from '../../services/journeyService';
import { searchStops } from "../../services/searchStops";

export default function JourneyScreen() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [journeys, setJourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [fromResults, setFromResults] = useState<any[]>([]);
  const [toResults, setToResults] = useState<any[]>([]);

  const dropdownStyle = {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    borderRadius: 6,
    position: 'absolute',
    top: 90,
    left: 16,
    right: 16,
    zIndex: 999,
    elevation: 10,
  };

  async function search() {
    if (!from || !to) return;

    setLoading(true);

    try {
      const data = await searchJourneys({
        fromStopId: Number(from),
        toStopId: Number(to),
        datetime: new Date().toISOString(),
      });

      setJourneys(data.journeys || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function searchFrom(text: string) {
    setFromQuery(text);

    if (text.length < 2) {
      setFromResults([]);
      return;
    }

    const res = await searchStops(text);

    const list = res?.stops ?? res?.data ?? res ?? [];

    console.log('FROM RESULTS:', list);

    setFromResults(Array.isArray(list) ? list : []);
  }

  async function searchTo(text: string) {
    setToQuery(text);

    if (text.length < 2) {
      setToResults([]);
      return;
    }

    const res = await searchStops(text);

    const list = res?.stops ?? res?.data ?? res ?? [];

    console.log('TO RESULTS:', list);

    setToResults(Array.isArray(list) ? list : []);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (fromQuery.length > 2) searchFrom(fromQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [fromQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (toQuery.length > 2) searchTo(toQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [toQuery]);

  return (
    <View style={{ flex: 1, padding: 16, position: 'relative' }}>

      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>
        Planifier un trajet
      </Text>

      <TextInput
        placeholder="Départ"
        value={fromQuery}
        onChangeText={searchFrom}
      />

      {fromQuery.length > 1 && (
        <View style={dropdownStyle}>
          {fromResults.length > 0 ? (
            fromResults.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setFromQuery(item.name);
                  setFrom(item.id);
                  setFromResults([]);
                }}
                style={{ padding: 10 }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ padding: 10, color: '#999' }}>
              Aucune adresse trouvée
            </Text>
          )}
        </View>
      )}

      <TextInput
        placeholder="Arrivée"
        value={toQuery}
        onChangeText={searchTo}
      />

      {toQuery.length > 1 && (
        <View style={dropdownStyle}>
          {toResults.length > 0 ? (
            toResults.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setToQuery(item.name);
                  setTo(item.id);
                  setToResults([]);
                }}
                style={{ padding: 10 }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ padding: 10, color: '#999' }}>
              Aucune adresse trouvée
            </Text>
          )}
        </View>
      )}

      <TouchableOpacity
        onPress={search}
        style={{
          backgroundColor: '#2563eb',
          padding: 12,
          borderRadius: 6,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Rechercher
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator />}

      <FlatList
        data={journeys}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderColor: '#eee',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: '700' }}>
              {item.totalDurationMinutes} min • {item.transfers} correspondance(s)
            </Text>

            <Text>
              Départ : {new Date(item.departureAt).toLocaleTimeString()}
            </Text>

            <Text>
              Arrivée : {new Date(item.arrivalAt).toLocaleTimeString()}
            </Text>

            {/* Legs (étapes) */}
            {item.legs?.map((leg: any) => (
              <View
                key={leg.order}
                style={{
                  marginTop: 6,
                  borderLeftWidth: 5,
                  borderLeftColor: item.legs?.[0]?.lineColor || '#000',
                  paddingLeft: 10,
                }}
              >
                <Text style={{ fontWeight: '600' }}>
                  {leg.lineName} ({leg.type})
                </Text>

                <Text style={{ color: '#666' }}>
                  • {leg.from?.stopName} → {leg.to?.stopName}
                </Text>

                {/* Intermédiaires */}
                {leg.intermediateStops?.length > 0 && (
                  <Text style={{ color: '#999', marginLeft: 8 }}>
                    via {leg.intermediateStops.map((s: any) => s.stopName).join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}