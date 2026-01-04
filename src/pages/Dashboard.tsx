import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const { user, logout } = useAuthStore();

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
                {/* Username */}
                <p className="font-semibold text-gray-700">
                  {user.username}
                </p>
                
                {/* Role Badge */}
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
            
            {/* Logout Button */}
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
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ✅ Login Riuscito!
          </h2>
          
          {/* Card info utente */}
          {user && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Informazioni Utente
              </h3>
              
              <dl className="space-y-2">
                {/* ID */}
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-700 w-32">ID:</dt>
                  <dd className="text-gray-900">{user.id}</dd>
                </div>
                
                {/* Username */}
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-700 w-32">Username:</dt>
                  <dd className="text-gray-900">{user.username}</dd>
                </div>
                
                {/* Role */}
                <div className="flex gap-2">
                  <dt className="font-medium text-gray-700 w-32">Ruolo:</dt>
                  <dd className="text-gray-900">
                    <span className={`
                      px-2 py-1 rounded text-xs font-semibold
                      ${user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                      }
                    `}>
                      {user.role.toUpperCase()}
                    </span>
                  </dd>
                </div>
                
                {/* Società ID (solo per buyer) */}
                {user.societaId && (
                  <div className="flex gap-2">
                    <dt className="font-medium text-gray-700 w-32">Società ID:</dt>
                    <dd className="text-gray-900">{user.societaId}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Info prossimi step */}
          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              🚧 <strong>Dashboard in costruzione</strong>
            </p>
            <p className="text-sm text-yellow-700 mt-2">
              Prossimi step: Lista società, CRUD admin, Protected Routes
            </p>
          </div>
        </div>
      </main>
      
    </div>
  );
}
