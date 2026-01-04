import axiosInstance from './axiosConfig';
import { LoginRequest, LoginResponse, MeResponse } from '../types/api.types';
import { AxiosResponse } from 'axios';

// ============================================
// AUTH API - Endpoints Autenticazione
// ============================================

export const authApi = {
  /**
   * POST /api/auth/login
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
   */
  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },

  /**
   * GET /api/auth/me
   */
  getMe: async (): Promise<MeResponse> => {
    const response: AxiosResponse<MeResponse> = await axiosInstance.get('/auth/me');
    return response.data;
  },

  /**
   * POST /api/auth/refresh
   */
  refreshToken: async (): Promise<{ token: string; expiresIn: string }> => {
    const response: AxiosResponse<{ token: string; expiresIn: string }> = 
      await axiosInstance.post('/auth/refresh');
    
    const { token, expiresIn } = response.data;
    return { token, expiresIn };
  },
};
