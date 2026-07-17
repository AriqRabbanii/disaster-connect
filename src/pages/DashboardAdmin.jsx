import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LayoutDashboard, FileText, Users, Package, TrendingUp, Search, ChevronDown, AlertTriangle, Download, Calendar, ToggleLeft, ToggleRight, CheckCircle, Clock, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockChartData } from '../data/mockData';

const statusLabel = { pending: 'Belum Ditangani', 'in-progress': 'Dalam Proses', resolved: 'Selesai' };
const statusClass = { pending: 'status-pending', 'in-progress': 'status-progress', resolved: 'status-resolved' };

function StatCard({ label, value, icon, color, sub }) {
  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <p className="text-gray-400 text-sm">{label}</p>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
      </div>
      <p className="text-3xl font-extrabold text-white">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

const sidebarLinks = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'reports', label: 'Laporan', icon: <FileText className="w-4 h-4" /> },
  { id: 'volunteers', label: 'Relawan', icon: <Users className="w-4 h-4" /> },
  { id: 'logistics', label: 'Logistik', icon: <Package className="w-4 h-4" /> },
  { id: 'export', label: 'Ekspor', icon: <Download className="w-4 h-4" /> },
];

export default function DashboardAdmin() {
  const { reports, volunteers, logistics, donations, updateReportStatus, assignVolunteer, toggleIsolated, showToast } = useApp();
  const [activeSection, setActiveSection] = useState('overview');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const stats = {
    total: reports.length,
    handled: reports.filter(r => r.status === 'resolved').length,
    inProgress: reports.filter(r => r.status === 'in-progress').length,
    pending: reports.filter(r => r.status === 'pending').length,
    volunteers: volunteers.filter(v => v.availability !== 'inactive').length,
    donations: donations.filter(d => d.status === 'Diterima').length,
    completion: Math.round((reports.filter(r => r.status === 'resolved').length / reports.length) * 100),
  };

  const filteredReports = useMemo(() => reports.filter(r => {
    const matchSearch = !search || r.location.toLowerCase().includes(search.toLowerCase()) || r.id.includes(search);
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchStatus;
  }), [reports, search, filterStatus]);

  const handleExport = (type) => showToast(`Mengekspor laporan ${type}... File akan diunduh segera.`, 'info');

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col py-6">
        <div className="px-4 mb-6">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Command Center</p>
          <p className="text-sm text-gray-300 font-medium">BPBD Dashboard</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {sidebarLinks.map(l => (
            <button key={l.id} onClick={() => setActiveSection(l.id)}
              className={activeSection === l.id ? 'sidebar-link-active w-full' : 'sidebar-link-inactive w-full'}>
              {l.icon} {l.label}
            </button>
          ))}
        </nav>
        <div className="px-4 pt-4 border-t border-gray-800">
          <div className="bg-red-900/50 border border-red-700/50 rounded-lg p-3 text-xs">
            <p className="text-red-300 font-semibold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Darurat</p>
            <p className="text-red-400 mt-0.5">{stats.pending} laporan menunggu</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 text-gray-900">
        {/* Overview */}
        {activeSection === 'overview' && (
          <div className="p-6 space-y-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Overview Dashboard</h1>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-700 col-span-2 lg:col-span-1">
                <p className="text-gray-400 text-sm mb-3">Total Laporan Masuk</p>
                <p className="text-4xl font-extrabold text-white">{stats.total}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Selesai {stats.handled}/{stats.total}</span>
                    <span>{stats.completion}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full transition-all duration-1000" style={{ width: `${stats.completion}%` }} />
                  </div>
                </div>
              </div>
              <StatCard label="Sudah Ditangani" value={stats.handled} icon={<CheckCircle className="w-4 h-4" />} color="bg-green-900/50 text-green-400" />
              <StatCard label="Dalam Proses" value={stats.inProgress} icon={<Clock className="w-4 h-4" />} color="bg-yellow-900/50 text-yellow-400" />
              <StatCard label="Belum Ditangani" value={stats.pending} icon={<AlertTriangle className="w-4 h-4" />} color="bg-red-900/50 text-red-400" sub="Butuh perhatian segera" />
              <StatCard label="Relawan Aktif" value={stats.volunteers} icon={<Users className="w-4 h-4" />} color="bg-blue-900/50 text-blue-400" />
              <StatCard label="Donasi Diterima" value={`${stats.donations} donasi`} icon={<TrendingUp className="w-4 h-4" />} color="bg-purple-900/50 text-purple-400" />
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4">Laporan per Provinsi</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={mockChartData.reportsByProvince} margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="province" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#DC2626" radius={[4, 4, 0, 0]} name="Laporan" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4">Trend Laporan 7 Hari Terakhir</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={mockChartData.reportsByDay} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#DC2626" strokeWidth={2.5} dot={{ r: 4, fill: '#DC2626' }} name="Laporan" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Volunteer assignment */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4">Laporan Belum Ditugaskan</h2>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {reports.filter(r => !r.assignedVolunteer && r.status !== 'resolved').slice(0, 8).map(r => (
                    <div key={r.id} className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{r.location.split(',')[0]}</p>
                        <p className="text-xs text-gray-500">{r.id} · {r.peopleAffected} jiwa</p>
                      </div>
                      <select onChange={e => { if (e.target.value) { assignVolunteer(r.id, e.target.value); showToast(`Relawan ditugaskan ke ${r.location.split(',')[0]}`, 'success'); } }}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-primary-500">
                        <option value="">Tugaskan...</option>
                        {volunteers.filter(v => v.availability === 'available').map(v => (
                          <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4">Wilayah Terisolasi</h2>
                <div className="space-y-2">
                  {reports.map(r => (
                    <div key={r.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{r.location.split(',')[0]}</span>
                      <button onClick={() => { toggleIsolated(r.id); showToast(`${r.isolated ? 'Hapus' : 'Set'} TERISOLASI: ${r.location.split(',')[0]}`, 'info'); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${r.isolated ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {r.isolated ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        {r.isolated ? 'TERISOLASI' : 'Normal'}
                      </button>
                    </div>
                  )).slice(0, 5)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports table */}
        {activeSection === 'reports' && (
          <div className="p-6">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Manajemen Laporan</h1>
            <div className="card">
              <div className="flex flex-wrap gap-3 mb-5">
                <div className="relative flex-1 min-w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input className="form-input pl-9" placeholder="Cari lokasi atau ID laporan..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="form-input w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                  <option value="">Semua Status</option>
                  <option value="pending">Belum Ditangani</option>
                  <option value="in-progress">Dalam Proses</option>
                  <option value="resolved">Selesai</option>
                </select>
                <span className="text-sm text-gray-500 flex items-center">{filteredReports.length} laporan</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>{['ID', 'Lokasi', 'Bencana', 'Kebutuhan', 'Jiwa', 'Status', 'Relawan', 'Aksi'].map(h => (
                      <th key={h} className="text-left px-3 py-3 font-semibold text-xs text-gray-600">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredReports.map(r => (
                      <tr key={r.id} className="table-row-hover">
                        <td className="px-3 py-3 font-mono text-xs text-gray-500">{r.id}</td>
                        <td className="px-3 py-3 max-w-[140px]">
                          <p className="font-medium text-gray-900 truncate">{r.location.split(',')[0]}</p>
                          {r.isolated && <span className="text-xs bg-gray-800 text-white px-1.5 py-0.5 rounded">TERISOLASI</span>}
                        </td>
                        <td className="px-3 py-3 text-gray-600 text-xs">{r.disasterType}</td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap gap-1">{r.needs.slice(0, 2).map(n => <span key={n} className="badge-gray text-xs">{n}</span>)}</div>
                        </td>
                        <td className="px-3 py-3 font-bold text-gray-900">{r.peopleAffected?.toLocaleString()}</td>
                        <td className="px-3 py-3">
                          <select value={r.status} onChange={e => { updateReportStatus(r.id, e.target.value); showToast('Status diperbarui', 'success'); }}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:ring-1 focus:ring-primary-500">
                            <option value="pending">Pending</option>
                            <option value="in-progress">Dalam Proses</option>
                            <option value="resolved">Selesai</option>
                          </select>
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500">{r.assignedVolunteer || '—'}</td>
                        <td className="px-3 py-3">
                          <button onClick={() => toggleIsolated(r.id)} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            {r.isolated ? 'Normal' : 'Isolasi'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Volunteers section */}
        {activeSection === 'volunteers' && (
          <div className="p-6">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Manajemen Relawan</h1>
            <div className="card">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {volunteers.map(v => (
                  <div key={v.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">{v.avatar}</div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{v.name}</p>
                        <span className={`badge text-xs ${v.availability === 'available' ? 'badge-green' : v.availability === 'on-duty' ? 'badge-yellow' : 'badge-gray'}`}>
                          {v.availability === 'available' ? 'Tersedia' : v.availability === 'on-duty' ? 'Bertugas' : 'Tidak Aktif'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">{v.skills.slice(0, 3).map(s => <span key={s} className="badge-blue text-xs">{s}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Logistics section */}
        {activeSection === 'logistics' && (
          <div className="p-6">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Stok Logistik</h1>
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>{['Item', 'Kategori', 'Jumlah', 'Satuan', 'Gudang', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-xs text-gray-600">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {logistics.map(l => (
                    <tr key={l.id} className="table-row-hover">
                      <td className="px-4 py-3 font-medium text-gray-900">{l.item}</td>
                      <td className="px-4 py-3 text-gray-600">{l.category}</td>
                      <td className="px-4 py-3 font-bold text-gray-900">{l.quantity}</td>
                      <td className="px-4 py-3 text-gray-600">{l.unit}</td>
                      <td className="px-4 py-3 text-gray-600">{l.warehouse}</td>
                      <td className="px-4 py-3">
                        {l.lowStock ? <span className="badge-red"><AlertTriangle className="w-3 h-3" /> Rendah</span> : <span className="badge-green"><CheckCircle className="w-3 h-3" /> Normal</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Export section */}
        {activeSection === 'export' && (
          <div className="p-6">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Ekspor Laporan</h1>
            <div className="card max-w-lg">
              <h2 className="font-bold text-gray-900 mb-5">Unduh Laporan</h2>
              <div className="space-y-4">
                <div>
                  <label className="form-label"><Calendar className="w-4 h-4 inline mr-1" />Rentang Tanggal</label>
                  <div className="flex gap-3">
                    <input type="date" className="form-input" defaultValue="2024-05-01" />
                    <input type="date" className="form-input" defaultValue="2024-05-11" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <button onClick={() => handleExport('PDF Harian')} className="btn-primary justify-center py-3">
                    <Download className="w-5 h-5" /> Export PDF Harian
                  </button>
                  <button onClick={() => handleExport('Excel')} className="btn-secondary justify-center py-3">
                    <Download className="w-5 h-5" /> Export Excel
                  </button>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-sm text-gray-500">
                  <p className="font-medium text-gray-700 mb-1">Isi laporan yang diekspor:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Daftar semua laporan bencana</li>
                    <li>Status penanganan</li>
                    <li>Data relawan yang bertugas</li>
                    <li>Ringkasan donasi</li>
                    <li>Stok logistik</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
