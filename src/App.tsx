import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SocietaDetail from './pages/SocietaDetail';
import TestAPI from './pages/TestAPI';
import PrivateRoute from './components/auth/PrivateRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route pubbliche */}
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<TestAPI />} />

        {/* Route protette */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        {/* Route dettaglio con parametro dinamico */}
        <Route path="/societa/:id" element={
          <PrivateRoute>
            <SocietaDetail />
          </PrivateRoute>
        } />

        {/* Default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* Catch-all route per 404 - ULTIMA! */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
