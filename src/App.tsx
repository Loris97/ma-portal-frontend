import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestAPI from './pages/TestAPI';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestAPI />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                🚀 M&A Portal Frontend
              </h1>
              <a href="/test" className="text-blue-600 underline">
                Vai alla pagina di test API →
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
