import { useState } from 'react';
import { authApi } from '../api/authApi';
import { societaApi } from '../api/societaApi';

export default function TestAPI() {
  const [result, setResult] = useState<string>('Premi un pulsante per testare...');

  const testLogin = async () => {
    try {
      setResult('⏳ Login in corso...');
      
      const res = await authApi.login({
        username: 'admin',
        password: 'admin123'
      });
      
      localStorage.setItem('ma_portal_token', res.token);
      
      setResult(`✅ LOGIN OK!\n\nUsername: ${res.user.username}\nRuolo: ${res.user.role}\nToken: ${res.token.substring(0, 30)}...`);
      
    } catch (error: any) {
      setResult(`❌ ERRORE: ${error.response?.data?.error || error.message}`);
    }
  };

  const testGetAll = async () => {
    try {
      setResult('⏳ Caricamento società...');
      
      const res = await societaApi.getAll();
      
      const societaList = res.data.map((s: any) => 
        `• ${s.nome} - ${s.regione}`
      ).join('\n');
      
      setResult(`✅ GETALL OK!\n\n${res.message}\n\nSocietà trovate: ${res.data.length}\n\n${societaList}`);
      
    } catch (error: any) {
      setResult(`❌ ERRORE: ${error.response?.data?.error || error.message}`);
    }
  };

  const testGetById = async () => {
    try {
      setResult('⏳ Caricamento dettaglio...');
      
      const res = await societaApi.getById(1);
      
      const societa = res.data as any;
      
      setResult(`✅ GETBYID(1) OK!\n\n${res.message}\n\nNome: ${societa.nome}\nFatturato: €${societa.fatturato?.toLocaleString() || 'N/A'}\nEBITDA: €${societa.ebitda?.toLocaleString() || 'N/A'}\nRegione: ${societa.regione}\nSettore: ${societa.settore}`);
      
    } catch (error: any) {
      setResult(`❌ ERRORE: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-t-xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800">🧪 Test API M&A Portal</h1>
          <p className="text-gray-600 mt-2">Verifica che backend e axios funzionino</p>
        </div>

        {/* Pulsanti */}
        <div className="bg-gray-50 p-6 shadow-lg">
          <div className="flex gap-4">
            <button
              onClick={testLogin}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              1️⃣ Login Admin
            </button>
            <button
              onClick={testGetAll}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              2️⃣ Lista Società
            </button>
            <button
              onClick={testGetById}
              className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              3️⃣ Dettaglio (ID:1)
            </button>
          </div>
        </div>

        {/* Risultato */}
        <div className="bg-gray-900 rounded-b-xl p-6 shadow-lg">
          <div className="text-green-400 font-mono text-sm whitespace-pre-wrap">
            {result}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-sm text-yellow-800">
            <strong>💡 Ordine corretto:</strong>
          </p>
          <ol className="text-sm text-yellow-700 mt-2 ml-4 list-decimal">
            <li>Clicca "Login Admin" → salva token</li>
            <li>Clicca "Lista Società" → vedi tutte (admin)</li>
            <li>Clicca "Dettaglio" → vedi TechCorp completa</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
