import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import * as SecureStore from 'expo-secure-store';

import api from '../api/client';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function refreshProfile() {
    try {
      const response = await api.get('/users/me');
      setUser(response.data);
    } catch {
      await signOut();
    }
  }

  async function signIn(email: string, password: string) {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    const token = response.data.token;

    await SecureStore.setItemAsync('token', token);

    await refreshProfile();
  }

  async function signOut() {
    await SecureStore.deleteItemAsync('token');
    setUser(null);
  }

  useEffect(() => {
    async function loadUser() {
      const token = await SecureStore.getItemAsync('token');

      if (token) {
        await refreshProfile();
      }

      setIsLoading(false);
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}