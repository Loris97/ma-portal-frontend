// ============================================
// TYPES BASE - Database Entities
// ============================================

export interface Societa {
  id: number;
  nome: string;
  fatturato: number;
  ebitda: number;
  regione: string;
  codice_ateco: string;
  settore: string;
  descrizione: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SocietaCensurata {
  id: number;
  regione: string;
  codice_ateco: string;
  settore: string;
  descrizione: string | null;
}

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'buyer';
  societaId?: number;
}

// ============================================
// AUTH TYPES
// ============================================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: string;
  tokenType: string;
}

export interface MeResponse {
  user: User;
}

// ============================================
// SOCIETÀ REQUEST TYPES
// ============================================

export interface CreateSocietaRequest {
  nome: string;
  fatturato: number;
  ebitda: number;
  regione: string;
  codice_ateco: string;
  settore: string;
  descrizione?: string;
}

export interface UpdateSocietaRequest {
  nome?: string;
  fatturato?: number;
  ebitda?: number;
  regione?: string;
  codice_ateco?: string;
  settore?: string;
  descrizione?: string;
}

// ============================================
// GENERIC RESPONSE TYPES
// ============================================

export interface ApiSuccessResponse<T = any> {
  success: true;
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  error: string;
}

export interface GetSocietaListResponse {
  message: string;
  data: Societa[] | SocietaCensurata[];
}

export interface GetSocietaDetailResponse {
  message: string;
  data: Societa | SocietaCensurata;
}
