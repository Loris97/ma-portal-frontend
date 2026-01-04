import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TestAPI from './pages/TestAPI';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Route Dashboard (protetta - per ora accessibile) */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Route Test API (per debug) */}
        <Route path="/test" element={<TestAPI />} />
        
        {/* Default: redirect a login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
