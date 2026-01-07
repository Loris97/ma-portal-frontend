# M&A Portal - Frontend

![React](https://img.shields.io/badge/react-18.3-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.6-blue)
![Vite](https://img.shields.io/badge/vite-6.0-646CFF)
![Tailwind](https://img.shields.io/badge/tailwind-4.0-38BDF8)
![License](https://img.shields.io/badge/license-MIT-green)

Frontend SPA per piattaforma gestione acquisizioni aziendali (M&A Portal) con autenticazione JWT e interfaccia responsive.

> **🔗 Backend Repository:** [ma-portal-backend](https://github.com/Loris97/ma-portal-backend)

## ✨ Features

- ✅ **Vite Build Tool** - HMR istantaneo e build ottimizzato
- ✅ **TypeScript Strict Mode** - Type-safety completa
- ✅ **Tailwind CSS v4** - Utility-first styling moderno
- 🚧 **JWT Authentication** - Login con persistenza token
- 🚧 **Protected Routes** - Navigation guard basata su ruolo
- 🚧 **React Hook Form** - Validazione performante
- 🚧 **Zustand Store** - State management minimale
- 🚧 **Axios Interceptors** - Gestione automatica JWT

## 🚀 Tech Stack

| Categoria | Tecnologie |
|-----------|-----------|
| **Framework** | React 18.3 |
| **Language** | TypeScript 5.6 |
| **Build Tool** | Vite 6.0 |
| **Styling** | Tailwind CSS 4.0 |
| **Routing** | React Router 6.x |
| **State Management** | Zustand 5.x |
| **HTTP Client** | Axios 1.x |
| **Forms** | React Hook Form + Zod |
| **Tools** | Git, npm, ESLint |

## 📁 Struttura Progetto

```

ma-portal-frontend/
├── src/
│   ├── api/                      \# HTTP client e chiamate API
│   │   ├── axiosConfig.ts        \# Axios instance + JWT interceptor
│   │   ├── authApi.ts            \# Authentication endpoints
│   │   └── societaApi.ts         \# Società CRUD endpoints
│   ├── components/               \# Componenti riusabili
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        \# Top navigation + user menu
│   │   │   └── PrivateRoute.tsx  \# Protected route wrapper
│   │   ├── forms/
│   │   │   ├── LoginForm.tsx     \# Form login con validazione
│   │   │   └── SocietaForm.tsx   \# Form crea/modifica società
│   │   └── common/
│   │       ├── Button.tsx        \# Button component styled
│   │       ├── Input.tsx         \# Input controlled con errori
│   │       └── Card.tsx          \# Card container
│   ├── pages/                    \# Route pages
│   │   ├── Login.tsx             \# /login
│   │   ├── Dashboard.tsx         \# /dashboard (lista società)
│   │   ├── SocietaDetail.tsx     \# /societa/:id
│   │   ├── SocietaCreate.tsx     \# /societa/new (admin only)
│   │   └── SocietaEdit.tsx       \# /societa/:id/edit (admin only)
│   ├── store/                    \# Zustand stores
│   │   └── authStore.ts          \# Auth state (token, user, actions)
│   ├── types/                    \# TypeScript interfaces
│   │   ├── api.types.ts          \# API response types
│   │   └── auth.types.ts         \# Auth types
│   ├── utils/                    \# Utility functions
│   │   ├── validators.ts         \# Form validation functions
│   │   └── formatters.ts         \# Data formatting helpers
│   ├── App.tsx                   \# Router principale
│   ├── main.tsx                  \# Entry point React
│   └── index.css                 \# Tailwind imports + global styles
├── public/                       \# Asset statici
├── index.html                    \# HTML entry point
├── .env.development              \# Environment variables (dev)
├── .env.production               \# Environment variables (prod)
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

```

## 🔧 Installazione

### Prerequisiti

- Node.js 18+
- npm o yarn
- Backend API attivo (vedi [repo backend](https://github.com/Loris97/ma-portal-backend))

### Setup

```bash
# 1. Clona repository
git clone https://github.com/Loris97/ma-portal-frontend.git
cd ma-portal-frontend

# 2. Installa dipendenze
npm install

# 3. Configura environment
cp .env.development .env
# Verifica URL backend in .env

# 4. Avvia dev server
npm run dev

# 5. Apri browser
# http://localhost:5173
```


## ⚙️ Configurazione

Crea file `.env` nella root:

```env
# API Backend
VITE_API_BASE_URL=http://localhost:3000/api

# LocalStorage key per JWT token
VITE_JWT_TOKEN_KEY=ma_portal_token
```

**Importante:** Le variabili devono avere prefisso `VITE_` per essere esposte al client.

## 🎨 Pagine e Route

| Route | Descrizione | Permessi |
| :-- | :-- | :-- |
| `/login` | Form autenticazione | Pubblico |
| `/dashboard` | Lista società | Autenticato |
| `/societa/:id` | Dettaglio società | Autenticato |
| `/societa/new` | Crea società | Admin only |
| `/societa/:id/edit` | Modifica società | Admin only |

### Navigazione Protetta

```tsx
// Esempio: Solo admin può accedere
<PrivateRoute requiredRole="admin">
  <SocietaCreate />
</PrivateRoute>
```


## 🔐 Autenticazione Flow

1. **Login** → POST `/api/auth/login` → Ricevi JWT token
2. **Store Token** → Zustand store + localStorage (persistenza)
3. **Axios Interceptor** → Inietta `Authorization: Bearer TOKEN` in ogni richiesta
4. **Protected Route** → Verifica token prima di renderizzare componente
5. **401 Response** → Redirect automatico a `/login`

## 🧪 Test

### Login Utenti Demo

```
Admin (CRUD completo):
  username: admin
  password: admin123
  
Buyer (solo propria società):
  username: buyer1
  password: buyer1
```


### Test Manuale

```bash
# 1. Avvia backend (porta 3000)
cd ma-portal-backend
npm run dev

# 2. Avvia frontend (porta 5173)
cd ma-portal-frontend
npm run dev

# 3. Apri browser → http://localhost:5173
# 4. Login con admin/admin123
# 5. Verifica dashboard società
```


## 🚀 Scripts NPM

```bash
npm run dev          # Development server con HMR (porta 5173)
npm run build        # Build production → dist/
npm run preview      # Preview build production locale
npm run lint         # ESLint check
```


## 📊 State Management (Zustand)

```typescript
// Esempio uso auth store
import { useAuthStore } from './store/authStore';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  
```

return <div>Ciao {user.username}</div>;

```
}
```


## 📝 Roadmap

### Implementato ✅

- [x] Setup Vite + React + TypeScript
- [x] Configurazione Tailwind CSS v4
- [x] Struttura cartelle professionale
- [x] TypeScript strict mode
- [x] Axios instance configurato
- [x] TypeScript types da backend schema
- [x] JWT authentication flow
- [x] Zustand auth store con persistenza
- [x] Pagina Login con validazione
- [x] Dashboard lista società
- [x] Protected routes component

### In Sviluppo 🚧

- [ ] CRUD società (admin only)
- [ ] Form validation con React Hook Form


### TODO 📋

- [ ] Paginazione tabella società
- [ ] Filtri e ricerca
- [ ] Loading states e skeleton screens
- [ ] Error boundary
- [ ] Toast notifications
- [ ] Dark mode
- [ ] Test unitari (Vitest)
- [ ] Deploy su Vercel/Netlify


## 🔐 Sicurezza

- ✅ Environment variables per config sensibili
- ✅ TypeScript strict mode
- 🚧 JWT token in localStorage (HttpOnly cookie in futuro)
- 🚧 Protected routes con redirect
- 🚧 Input sanitization
- 🚧 XSS prevention


## 🤝 Contribuire

Questo è un progetto portfolio. Feedback e suggerimenti sono benvenuti!

1. Fork il progetto
2. Crea branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Apri Pull Request

## 📄 License

MIT License - vedi file [LICENSE](LICENSE)

## 👤 Author

**Loris97**

- GitHub: [@Loris97](https://github.com/Loris97)
- LinkedIn: [Loris Scola](https://it.linkedin.com/in/loris-scola-dev)


## 🔗 Related Projects

- [Backend API](https://github.com/Loris97/ma-portal-backend) - Node.js + Express + TypeScript + MySQL

---

**Note:** Questo è un progetto portfolio per dimostrare competenze React + TypeScript. Per uso in produzione, implementare ulteriori misure (HttpOnly cookies, CSP headers, rate limiting lato client).

## 🙏 Riconoscimenti

- Vite team
- React community
- Tailwind CSS
- Zustand authors