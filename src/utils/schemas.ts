import { z } from 'zod';

// ============================================
// LOGIN VALIDATION SCHEMA
// ============================================

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username deve avere almeno 3 caratteri')
    .max(50, 'Username non può superare 50 caratteri')
    .trim(),
  
  password: z
    .string()
    .min(4, 'Password deve avere almeno 4 caratteri')
    .max(100, 'Password non può superare 100 caratteri')
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ============================================
// SOCIETÀ VALIDATION SCHEMA
// ============================================

export const createSocietaSchema = z.object({
  nome: z.string()
    .min(2, 'Nome deve avere almeno 2 caratteri')
    .max(100, 'Nome non può superare 100 caratteri')
    .trim(),
  
  fatturato: z.number()
    .positive('Fatturato deve essere maggiore di 0'),
  
  ebitda: z.number()
    .positive('EBITDA deve essere maggiore di 0'),
  
  regione: z.string()
    .min(2, 'Regione deve avere almeno 2 caratteri')
    .max(50, 'Regione non può superare 50 caratteri')
    .trim(),
  
  codice_ateco: z.string()
    .regex(
      /^\d{2}\.\d{2}\.\d{2}$/,
      'Codice ATECO formato non valido (es: 62.01.00)'
    )
    .trim(),
  
  settore: z.string()
    .min(2, 'Settore deve avere almeno 2 caratteri')
    .max(100, 'Settore non può superare 100 caratteri')
    .trim(),
  
  descrizione: z.string()
    .min(10, 'Descrizione deve avere almeno 10 caratteri')
    .max(1000, 'Descrizione non può superare 1000 caratteri')
    .trim()
    .optional(),
  
}).refine((data) => {
  return data.ebitda <= data.fatturato;
}, {
  message: 'EBITDA non può essere maggiore del fatturato',
  path: ['ebitda']
});

export type CreateSocietaFormData = z.infer<typeof createSocietaSchema>;
