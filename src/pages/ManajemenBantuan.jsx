import { useState } from 'react';
import { Package, Truck, CheckCircle, Plus, AlertTriangle, ChevronDown, Camera, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const statusLabel = { pending: 'Belum Ditangani', 'in-progress': 'Dalam Proses', resolved: 'Selesai' };
const statusClass = { pending: 'badge-red', 'in-progress': 'badge-yellow', resolved: 'badge-green' };
const rowBg = { pending: 'bg-red-50/30', 'in-progress': 'bg-yellow-50/30', resolved: 'bg-green-50/30' };

function Tab1({ logistics, addLogistic, isAdmin, showToast }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ item: '', category: '', quantity: '', unit: '', warehouse: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleAdd = (e) => {
    e.preventDefault();
    addLogistic(form);
    setForm({ item: '', category: '', quantity: '', unit: '', warehouse: '' });
    setShowForm(false);
    showToast('Stok berhasil ditambahkan!', 'success');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900">Stok Logistik</h2>
        {isAdmin && (
          <button onClick={() => setShowForm(!showForm)} className="btn-primary py-2 px-4 text-sm">
            <Plus className="w-4 h-4" /> Tambah Stok
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <form onSubmit={handleAdd} className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-200 grid sm:grid-cols-2 gap-4">
          <div><label className="form-label">Nama Item</label><input className="form-input" required value={form.item} onChange={e => set('item', e.target.value)} placeholder="Beras, Tenda, dll." /></div>
          <div><label className="form-label">Kategori</label><input className="form-input" required value={form.category} onChange={e => set('category', e.target.value)} placeholder="Makanan, Obat-obatan..." /></div>
          <div><label className="form-label">Jumlah</label><input type="number" className="form-input" required value={form.quantity} onChange={e => set('quantity', e.target.value)} /></div>
          <div><label className="form-label">Satuan</label><input className="form-input" required value={form.unit} onChange={e => set('unit', e.target.value)} placeholder="kg, unit, paket..." /></div>
          <div className="sm:col-span-2"><label className="form-label">Gudang/Lokasi</label><input className="form-input" required value={form.warehouse} onChange={e => set('warehouse', e.target.value)} placeholder="Nama gudang..." /></div>
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" className="btn-primary py-2 text-sm">Simpan</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-ghost py-2 text-sm">Batal</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              {['Item', 'Kategori', 'Jumlah', 'Satuan', 'Gudang', 'Status', 'Update'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-xs">{h}</th>
              ))}
            </tr>
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
                  {l.lowStock ? (
                    <span className="badge-red pulse-urgent"><AlertTriangle className="w-3 h-3" />Stok Rendah</span>
                  ) : (
                    <span className="badge-green"><CheckCircle className="w-3 h-3" />Normal</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(l.updatedAt).toLocaleDateString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tab2({ reports, volunteers, isAdmin, updateReportStatus, claimReport, showToast }) {
  const active = reports.filter(r => r.status !== 'resolved');
  const getVolName = (id) => volunteers.find(v => v.id === id)?.name || id;

  return (
    <div>
      <h2 className="font-bold text-gray-900 mb-5">Distribusi Bantuan — {active.length} Laporan Aktif</h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>{['Lokasi', 'Bencana', 'Kebutuhan', 'Jiwa', 'Status', 'Penugasan', 'Aksi'].map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-xs text-gray-600">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {active.map(r => (
              <tr key={r.id} className={`${rowBg[r.status]} hover:opacity-90 transition-opacity`}>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 max-w-[160px] truncate">{r.location.split(',')[0]}</p>
                  <p className="text-xs text-gray-400">{r.id}</p>
                </td>
                <td className="px-4 py-3 text-gray-700">{r.disasterType}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">{r.needs.slice(0, 2).map(n => <span key={n} className="badge-gray text-xs">{n}</span>)}{r.needs.length > 2 && <span className="badge-gray text-xs">+{r.needs.length - 2}</span>}</div>
                </td>
                <td className="px-4 py-3 font-bold text-gray-900">{r.peopleAffected?.toLocaleString('id-ID')}</td>
                <td className="px-4 py-3">
                  {isAdmin ? (
                    <select value={r.status} onChange={e => { updateReportStatus(r.id, e.target.value); showToast('Status diperbarui', 'success'); }}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-primary-500">
                      <option value="pending">Pending</option>
                      <option value="in-progress">Dalam Proses</option>
                      <option value="resolved">Selesai</option>
                    </select>
                  ) : (
                    <span className={`badge text-xs ${statusClass[r.status]}`}>{statusLabel[r.status]}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs">
                  {r.assignedVolunteer ? (
                    <span className="text-green-700 font-medium flex items-center gap-1"><User className="w-3 h-3" />{getVolName(r.assignedVolunteer)}</span>
                  ) : (
                    <button onClick={() => { claimReport(r.id, 'VOL-SELF'); showToast(`Anda berhasil klaim tugas di ${r.location.split(',')[0]}`, 'success'); }}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Klaim Tugas
                    </button>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => showToast('Fitur upload foto konfirmasi', 'info')}
                    className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs font-medium transition-colors">
                    <Camera className="w-3.5 h-3.5" /> Foto
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tab3({ reports }) {
  const done = reports.filter(r => r.status === 'resolved');
  return (
    <div>
      <h2 className="font-bold text-gray-900 mb-5">Riwayat Selesai — {done.length} Laporan</h2>
      {done.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p>Belum ada laporan yang diselesaikan</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>{['Lokasi', 'Bencana', 'Jiwa Dibantu', 'Koordinator', 'Selesai', 'Bukti'].map(h => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-xs text-gray-600">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {done.map(r => (
                <tr key={r.id} className="table-row-hover">
                  <td className="px-4 py-3 font-medium text-gray-900">{r.location.split(',')[0]}</td>
                  <td className="px-4 py-3 text-gray-600">{r.disasterType}</td>
                  <td className="px-4 py-3 font-bold text-green-700">{r.peopleAffected?.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-3 text-gray-600">{r.assignedVolunteer || 'Tim BPBD'}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{new Date(r.reportedAt).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-4 h-4 text-green-600" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ManajemenBantuan() {
  const [tab, setTab] = useState(0);
  const { reports, volunteers, logistics, addLogistic, updateReportStatus, claimReport, isAdmin, showToast } = useApp();

  const tabs = [
    { label: 'Stok Logistik', icon: <Package className="w-4 h-4" /> },
    { label: 'Distribusi Bantuan', icon: <Truck className="w-4 h-4" /> },
    { label: 'Riwayat Selesai', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Manajemen Bantuan</h1>
          <p className="text-gray-500">Kelola stok logistik, distribusi bantuan, dan riwayat penyelesaian.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1.5 border border-gray-200 shadow-sm w-fit">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === i ? 'bg-primary-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
              {t.icon} {t.label}
              {i === 0 && logistics.filter(l => l.lowStock).length > 0 && (
                <span className="w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  {logistics.filter(l => l.lowStock).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="card">
          {tab === 0 && <Tab1 logistics={logistics} addLogistic={addLogistic} isAdmin={isAdmin} showToast={showToast} />}
          {tab === 1 && <Tab2 reports={reports} volunteers={volunteers} isAdmin={isAdmin} updateReportStatus={updateReportStatus} claimReport={claimReport} showToast={showToast} />}
          {tab === 2 && <Tab3 reports={reports} />}
        </div>
      </div>
    </div>
  );
}
