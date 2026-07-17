import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Login from './pages/Login';
import LaporBencana from './pages/LaporBencana';
import PetaSituasi from './pages/PetaSituasi';
import AIPrioritas from './pages/AIPrioritas';
import ManajemenBantuan from './pages/ManajemenBantuan';
import Relawan from './pages/Relawan';
import Donatur from './pages/Donatur';
import DashboardAdmin from './pages/DashboardAdmin';
import OfflineSMS from './pages/OfflineSMS';

function ProtectedRoute({ children }) {
  const { isAdmin } = useApp();
  return isAdmin ? children : <Navigate to="/login" replace />;
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lapor" element={<LaporBencana />} />
        <Route path="/peta" element={<PetaSituasi />} />
        <Route path="/ai-prioritas" element={<AIPrioritas />} />
        <Route path="/manajemen" element={<ManajemenBantuan />} />
        <Route path="/relawan" element={<Relawan />} />
        <Route path="/donatur" element={<Donatur />} />
        <Route path="/offline" element={<OfflineSMS />} />
        <Route path="/admin" element={<ProtectedRoute><DashboardAdmin /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}
