import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function NotFound() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        
        {/* 404 Rosso con Animazione */}
        <div className="text-8xl font-bold text-red-600 mb-4 animate-bounce">
          404
        </div>

        {/* Titolo */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Pagina non trovata
        </h1>

        {/* Descrizione */}
        <p className="text-gray-600 mb-6">
          Ops! Ti sei perso nel portale M&A 🧭
        </p>

        {/* Button Condizionale */}
        {isAuthenticated ? (
          <Link 
            to="/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            ← Torna alla Dashboard
          </Link>
        ) : (
          <Link 
            to="/login"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            🔐 Vai al Login
          </Link>
        )}
        
      </div>
      
    </div>
  );
}
