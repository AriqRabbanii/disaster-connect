import { createContext, useContext, useState, useCallback } from 'react';
import { mockReports, mockVolunteers, mockDonations, mockLogistics } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [reports, setReports] = useState(mockReports);
  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [donations, setDonations] = useState(mockDonations);
  const [logistics, setLogistics] = useState(mockLogistics);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const login = useCallback((username, password) => {
    if (username === 'admin' && password === 'bpbd2024') {
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
  }, []);

  const addReport = useCallback((report) => {
    const newReport = {
      ...report,
      id: `RPT-${String(Date.now()).slice(-4)}`,
      status: 'pending',
      urgency: report.urgency || 3,
      reportedAt: new Date().toISOString(),
      assignedVolunteer: null,
      photoUrl: null,
      isolated: false,
    };
    setReports(prev => [newReport, ...prev]);
    return newReport;
  }, []);

  const updateReportStatus = useCallback((reportId, status) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
  }, []);

  const assignVolunteer = useCallback((reportId, volunteerId) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, assignedVolunteer: volunteerId } : r));
  }, []);

  const toggleIsolated = useCallback((reportId) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, isolated: !r.isolated } : r));
  }, []);

  const addVolunteer = useCallback((volunteer) => {
    const newVol = {
      ...volunteer,
      id: `VOL-${String(Date.now()).slice(-4)}`,
      avatar: volunteer.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      joinedAt: new Date().toISOString().split('T')[0],
      tasksCompleted: 0,
    };
    setVolunteers(prev => [...prev, newVol]);
    return newVol;
  }, []);

  const addDonation = useCallback((donation) => {
    const newDon = {
      ...donation,
      id: `DON-${String(Date.now()).slice(-4)}`,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      proofUrl: '#',
    };
    setDonations(prev => [newDon, ...prev]);
    return newDon;
  }, []);

  const addLogistic = useCallback((item) => {
    const newLog = {
      ...item,
      id: `LOG-${String(Date.now()).slice(-4)}`,
      lowStock: Number(item.quantity) < 100,
      updatedAt: new Date().toISOString(),
    };
    setLogistics(prev => [...prev, newLog]);
    return newLog;
  }, []);

  const updateLogistic = useCallback((id, updates) => {
    setLogistics(prev => prev.map(l => l.id === id ? { ...l, ...updates, lowStock: Number(updates.quantity || l.quantity) < 100 } : l));
  }, []);

  const claimReport = useCallback((reportId, volunteerId) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, assignedVolunteer: volunteerId, status: 'in-progress' } : r));
  }, []);

  const value = {
    isAdmin, login, logout,
    reports, addReport, updateReportStatus, assignVolunteer, toggleIsolated, claimReport,
    volunteers, addVolunteer,
    donations, addDonation,
    logistics, addLogistic, updateLogistic,
    toasts, showToast, removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
