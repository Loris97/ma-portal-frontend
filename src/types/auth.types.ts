import { User } from './api.types';

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}
