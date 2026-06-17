import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator, TouchableOpacity,
} from 'react-native';

import { useLocation } from '../../hooks/useLocation';
import { getNearestStops } from '../../services/stopService';
import { useNavigation } from "@react-navigation/native";
import {StopsStackParamList} from "../../types/Stops";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export default function StopsScreen() {
  type Nav = NativeStackNavigationProp<StopsStackParamList, 'StopsList'>;
  const navigation = useNavigation<Nav>();

  const { location, error } = useLocation();
  const [stops, setStops] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStops() {
      if (!location) return;

      setLoading(true);

      try {
        const data = await getNearestStops(
          location.latitude,
          location.longitude,
          10
        );

        setStops(data.stops);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    loadStops();
  }, [location]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!location || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>
        Arrêts proches
      </Text>

      <FlatList
        data={stops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { id: item.id })}
            style={{
              backgroundColor: '#fff',
              padding: 14,
              borderRadius: 10,
              marginBottom: 12,

              // ombre iOS
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },

              // ombre Android
              elevation: 3,

              borderWidth: 1,
              borderColor: '#f0f0f0',
            }}
          >
            {/* Nom arrêt */}
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 6 }}>
              {item.name}
            </Text>

            {/* Lignes */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {item.lines?.map((line: any, index: number) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#2563eb',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 12 }}>
                    Ligne {line}
                  </Text>
                </View>
              ))}
            </View>

            {/* Types (bus / métro / tram) */}
            {item.types?.length > 0 && (
              <Text style={{ marginTop: 8, color: '#666', fontSize: 12 }}>
                {item.types.join(' • ')}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}