// TODO: Add TypeScript interfaces from backend
export interface Societa {
  id: number;
  nome: string;
  fatturato: number;
  ebitda: number;
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

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: string;
  tokenType: string;
}
