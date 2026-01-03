import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🚀 M&A Portal Frontend
          </h1>
          <p className="text-gray-600">Setup completato!</p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-green-600">✅ Vite + React 18</p>
            <p className="text-sm text-green-600">✅ TypeScript Strict</p>
            <p className="text-sm text-green-600">✅ Tailwind CSS v4</p>
            <p className="text-sm text-green-600">✅ Struttura modulare</p>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
