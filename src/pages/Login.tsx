import LoginForm from '../components/forms/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🚀 M&A Portal
          </h1>
          <p className="text-gray-600">
            Accedi al tuo account
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p className="font-mono">admin / admin123</p>
        </div>
        
      </div>
    </div>
  );
}
