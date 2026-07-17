import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, LogIn, AlertTriangle, Map, Users, Heart, BarChart2, Wifi, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navLinks = [
  { to: '/', label: 'Beranda', exact: true },
  { to: '/lapor', label: 'Lapor Bencana' },
  { to: '/peta', label: 'Peta Situasi', icon: <Map className="w-4 h-4" /> },
  { to: '/ai-prioritas', label: 'AI Prioritas' },
  { to: '/manajemen', label: 'Manajemen' },
  { to: '/relawan', label: 'Relawan', icon: <Users className="w-4 h-4" /> },
  { to: '/donatur', label: 'Donatur', icon: <Heart className="w-4 h-4" /> },
  { to: '/offline', label: 'Offline/SMS' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAdmin, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 px-2 py-1 rounded-md ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-lg leading-none">Disaster</span>
              <span className="font-bold text-primary-600 text-lg leading-none">Connect</span>
              <div className="text-xs text-gray-500 leading-none">BPBD Indonesia</div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map(l => (
              <NavLink key={l.to} to={l.to} end={l.exact} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden xl:flex items-center gap-3">
            {isAdmin ? (
              <>
                <NavLink to="/admin" className={linkClass}>
                  <span className="flex items-center gap-1.5"><BarChart2 className="w-4 h-4" /> Dashboard</span>
                </NavLink>
                <button onClick={handleLogout} className="btn-secondary py-2 px-4 text-sm">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="btn-primary py-2 px-4 text-sm">
                <Shield className="w-4 h-4" /> Login Admin
              </NavLink>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-4 pb-4 animate-slide-down">
          <div className="flex flex-col gap-1 pt-3">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.exact}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 pt-2 border-t border-gray-100">
              {isAdmin ? (
                <>
                  <NavLink to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <BarChart2 className="w-4 h-4" /> Dashboard Admin
                  </NavLink>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <NavLink to="/login" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-primary-600 text-white">
                  <Shield className="w-4 h-4" /> Login Admin
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
