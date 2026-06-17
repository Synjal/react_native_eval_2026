import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Controller, useForm } from 'react-hook-form';

import { useAuth } from '../../hooks/useAuth';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { signIn } = useAuth();

  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setErrorMessage('');
      await signIn(data.email, data.password);
    } catch {
      setErrorMessage('Email ou mot de passe incorrect');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email obligatoire',
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.email && (
        <Text style={styles.error}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Mot de passe obligatoire',
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },

  error: {
    color: '#dc2626',
    marginBottom: 12,
  },
});