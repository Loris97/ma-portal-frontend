import { create } from 'zustand';
import { User } from '../types/api.types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  checkAuth: () => Promise<void>;
}

const TOKEN_KEY = import.meta.env.VITE_JWT_TOKEN_KEY || 'ma_portal_token';

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({
    token: token,
    user: user,
    isAuthenticated: true
  });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({
    token: null,
    user: null,
    isAuthenticated: false
  });
  },

  setUser: (user) => {
    set({ user }); 
  },

  checkAuth: async () => {
    set({ isLoading: true });
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      return;
    }
    try {
      const { authApi } = await import('../api/authApi');
    
      const result = await authApi.getMe();
    
      set({
        token: token,
        user: result.user,
        isAuthenticated: true,
        isLoading: false
      });
    
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }
}));
