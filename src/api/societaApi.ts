import axiosInstance from './axiosConfig';
import {
  Societa,
  CreateSocietaRequest,
  UpdateSocietaRequest,
  GetSocietaListResponse,
  GetSocietaDetailResponse,
  ApiSuccessResponse,
} from '../types/api.types';
import { AxiosResponse } from 'axios';

// ============================================
// SOCIETÀ API - Endpoints CRUD
// ============================================

export const societaApi = {
  /**
   * GET /api/societa
   * Lista società con RBAC filtering
   * - Admin: tutte le società
   * - Buyer: solo propria società
   * - Public: dati censurati
   */
  getAll: async (): Promise<GetSocietaListResponse> => {
    const response: AxiosResponse<GetSocietaListResponse> = await axiosInstance.get('/societa');
    return response.data;
  },

  /**
   * GET /api/societa/:id
   * Dettaglio singola società
   * 
   * @param id - ID società
   */
  getById: async (id: number): Promise<GetSocietaDetailResponse> => {
    const response: AxiosResponse<GetSocietaDetailResponse> = await axiosInstance.get(
      `/societa/${id}`
    );
    return response.data;
  },

  /**
   * POST /api/societa
   * Crea nuova società (solo Admin)
   * 
   * @param data - Dati società
   */
  create: async (data: CreateSocietaRequest): Promise<ApiSuccessResponse<Societa>> => {
    const response: AxiosResponse<ApiSuccessResponse<Societa>> = await axiosInstance.post(
      '/societa',
      data
    );
    return response.data;
  },

  /**
   * PATCH /api/societa/:id
   * Modifica parziale società (solo Admin)
   * 
   * @param id - ID società
   * @param data - Campi da aggiornare
   */
  update: async (
    id: number,
    data: UpdateSocietaRequest
  ): Promise<ApiSuccessResponse<Societa>> => {
    const response: AxiosResponse<ApiSuccessResponse<Societa>> = await axiosInstance.patch(
      `/societa/${id}`,
      data
    );
    return response.data;
  },

  /**
   * DELETE /api/societa/:id
   * Elimina società (solo Admin)
   * 
   * @param id - ID società
   */
  delete: async (id: number): Promise<ApiSuccessResponse<{ deletedId: number }>> => {
    const response: AxiosResponse<ApiSuccessResponse<{ deletedId: number }>> =
      await axiosInstance.delete(`/societa/${id}`);
    return response.data;
  },
};
