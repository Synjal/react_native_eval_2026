import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import api from '../../api/client';

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);

  async function load() {
    const res = await api.get('/users/me');
    setUser(res.data);
  }

  async function update() {
    await api.put('/users/me', user);
    alert('Profil mis à jour');
  }

  useEffect(() => {
    load();
  }, []);

  if (!user) return <Text>Chargement...</Text>;

  return (
    <View style={{ padding: 16 }}>

      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
        Profil
      </Text>

      <TextInput
        value={user.name}
        onChangeText={(t) => setUser({ ...user, name: t })}
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <TextInput
        value={user.email}
        onChangeText={(t) => setUser({ ...user, email: t })}
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <TouchableOpacity
        onPress={update}
        style={{
          marginTop: 16,
          backgroundColor: '#2563eb',
          padding: 12,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Sauvegarder
        </Text>
      </TouchableOpacity>

    </View>
  );
}