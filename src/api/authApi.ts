import axiosInstance from './axiosConfig';
import { LoginRequest, LoginResponse, MeResponse } from '../types/api.types';
import { AxiosResponse } from 'axios';

// ============================================
// AUTH API - Endpoints Autenticazione
// ============================================

export const authApi = {
  /**
   * POST /api/auth/login
   * Autenticazione utente con username/password
   * 
   * @param credentials - Username e password
   * @returns Token JWT + dati utente
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
      '/auth/login',
      credentials
    );
    return response.data;
  },

  /**
   * POST /api/auth/logout
   * Logout lato server (opzionale, token invalidato lato client)
   */
  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
    // Token rimosso in AuthStore
  },

  /**
   * GET /api/auth/me
   * Recupera informazioni utente corrente (richiede JWT)
   * 
   * @returns Dati utente
   */
  getMe: async (): Promise<MeResponse> => {
    const response: AxiosResponse<MeResponse> = await axiosInstance.get('/auth/me');
    return response.data;
  },

  /**
   * POST /api/auth/refresh
   * Rinnova token JWT (richiede token valido)
   * 
   * @returns Nuovo token JWT
   */
  refreshToken: async (): Promise<{ token: string; expiresIn: string }> => {
    const response = await axiosInstance.post('/auth/refresh');
    return response.data;
  },
};
