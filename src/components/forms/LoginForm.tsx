import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../utils/schemas';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';

export default function LoginForm() {
  const [apiError, setApiError] = useState<string>('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setApiError('');
      const result = await authApi.login(data);
      login(result.token, result.user);
      navigate('/dashboard');
    } catch (error: any) {
      setApiError(
        error.response?.data?.error || 'Errore di connessione'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* INPUT USERNAME */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          {...register('username')}
          className={`
            w-full px-4 py-2 border rounded-lg
            focus:outline-none focus:ring-2
            ${errors.username
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
            }
          `}
          placeholder="Inserisci username"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* INPUT PASSWORD */}
      <div>
        <label 
          htmlFor="password" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={`
            w-full px-4 py-2 border rounded-lg
            focus:outline-none focus:ring-2
            ${errors.password
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
            }
          `}
          placeholder="Inserisci password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* ERRORE API */}
      {apiError && (
        <div className="
          bg-red-50
          border
          border-red-500
          text-red-700
          px-4 py-3
          rounded-lg
        ">
          <p className="font-medium">Errore:</p>
          <p className="text-sm">{apiError}</p>
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full py-3 rounded-lg font-semibold text-white
          transition-colors
          ${isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          }
        `}
      >
        {isSubmitting ? 'Accesso in corso...' : 'Accedi'}
      </button>
      
    </form>
  );
}
