import { User } from './api.types';

/**
 * Stato autenticazione globale (Zustand store)
 */
export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;  // Per spinner durante checkAuth
}

/**
 * Azioni Zustand auth store
 */
export interface AuthActions {
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  checkAuth: () => Promise<void>;  // Verifica token al mount app
}

/**
 * Store completo = State + Actions
 */
export interface AuthStore extends AuthState, AuthActions {}
