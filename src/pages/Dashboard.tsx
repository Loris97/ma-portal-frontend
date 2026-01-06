import { useAuthStore } from '../store/authStore';
import { useEffect, useState } from 'react';
import { societaApi } from '../api/societaApi';
import { Societa } from '../types/api.types';
import SocietaTable from '../components/tables/SocietaTable';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  
  // State per lista società
  const [societa, setSocieta] = useState<Societa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Carica società al mount
  useEffect(() => {
    const fetchSocieta = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const result = await societaApi.getAll();
        setSocieta(result.data as Societa[]);
        
      } catch (err: any) {
        setError(err.response?.data?.error || 'Errore caricamento società');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocieta();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            🚀 M&A Portal - Dashboard
          </h1>
          
          {/* User Info + Logout */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-sm text-right">
                <p className="font-semibold text-gray-700">
                  {user.username}
                </p>
                <span className={`
                  inline-block px-2 py-1 rounded text-xs font-semibold mt-1
                  ${user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                  }
                `}>
                  {user.role.toUpperCase()}
                </span>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="
                px-4 py-2 
                bg-red-600 
                text-white 
                rounded-lg 
                hover:bg-red-700 
                transition-colors
                font-semibold
              "
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            👋 Benvenuto, {user?.username}!
          </h2>
          <p className="text-gray-600">
            {user?.role === 'admin' 
              ? 'Hai accesso completo a tutte le società.' 
              : 'Visualizza le tue società in portfolio.'}
          </p>
        </div>

        {/* Tabella Società - Componente separato! */}
        <SocietaTable 
          societa={societa}
          isLoading={isLoading}
          error={error}
        />

      </main>
      
    </div>
  );
}
