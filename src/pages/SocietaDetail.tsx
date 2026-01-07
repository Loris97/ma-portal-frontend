import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { societaApi } from '../api/societaApi';
import { Societa } from '../types/api.types';
import { useAuthStore } from '../store/authStore';

export default function SocietaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [societa, setSocieta] = useState<Societa | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSocieta = async () => {
      if (!id) {
        setError('ID società non valido');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        const result = await societaApi.getById(parseInt(id));
        setSocieta(result.data as Societa);

      } catch (err: any) {
        setError(
          err.response?.data?.error || 'Errore caricamento società'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocieta();
  }, [id]);  // Re-fetch se id cambia

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Caricamento dettagli...</p>
        </div>
      </div>
    );
  }

  if (error || !societa) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
          <div className="text-center">
            <p className="text-6xl mb-4">⚠️</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Errore
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              to="/dashboard"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Torna alla Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handler eliminazione
  const handleDelete = async () => {
    if (!id || !societa) return;

    const confirmed = window.confirm(
      `Sei sicuro di eliminare "${societa.nome}"? Questa azione è irreversibile.`
    );

    if (!confirmed) return;

    try {
      await societaApi.delete(parseInt(id));
      navigate('/dashboard');
      // (per ora alert, poi toast notification)

    } catch (error: any) {
      alert(
        error.response?.data?.error || 'Errore durante eliminazione'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            📄 Dettaglio Società
          </h1>

          {/* Button Indietro */}
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">

        {/* Card Principale */}
        <div className="bg-white rounded-lg shadow-md p-8">

          {/* Header Card con Nome Società */}
          <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {societa.nome}
              </h2>
              <div className="flex gap-2 items-center">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                  {societa.settore}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">
                  {societa.regione}
                </span>
              </div>
            </div>

            {/* Action Buttons (solo admin) */}
            {user?.role === 'admin' && (
              <div className="flex gap-3">
                {/* Button Modifica */}
                <button
                  onClick={() => navigate(`/societa/${id}/edit`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ✏️ Modifica
                </button>
                {/* Button Elimina */}
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  🗑️ Elimina
                </button>
              </div>
            )}
          </div>

          {/* Griglia Info*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Fatturato */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Fatturato</p>
              <p className="text-2xl font-bold text-gray-900">
                €{societa.fatturato.toLocaleString('it-IT')}
              </p>
            </div>

            {/* EBITDA */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">EBITDA</p>
              <p className="text-2xl font-bold text-gray-900">
                €{societa.ebitda?.toLocaleString('it-IT') || 'N/A'}
              </p>
            </div>

            {/* Codice ATECO */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Codice ATECO</p>
              <p className="text-lg font-semibold text-gray-900">
                {societa.codice_ateco}
              </p>
            </div>
          </div>

          {/* Descrizione */}
          {societa.descrizione && (
            <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                📝 Descrizione
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {societa.descrizione}
              </p>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
