import { useState } from 'react';
import { Heart, CreditCard, Package, Briefcase, Download, Shield, Users, QrCode, FileDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

const donationTypes = [
  { key: 'Uang Tunai', icon: <CreditCard className="w-5 h-5" />, label: 'Uang Tunai' },
  { key: 'Barang', icon: <Package className="w-5 h-5" />, label: 'Barang' },
  { key: 'Jasa', icon: <Briefcase className="w-5 h-5" />, label: 'Jasa' },
];

export default function Donatur() {
  const { reports, donations, addDonation, isAdmin, showToast } = useApp();
  const [donType, setDonType] = useState('Uang Tunai');
  const [form, setForm] = useState({ donorName: '', contact: '', targetReport: '', amount: '', description: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const unmetNeeds = reports
    .filter(r => r.status !== 'resolved')
    .flatMap(r => r.needs.map(n => ({ need: n, location: r.location.split(',')[0], people: r.peopleAffected, id: r.id })))
    .slice(0, 6);

  const totalPeopleHelped = donations.filter(d => d.status === 'Diterima').length * 45;

  const handleSubmit = (e) => {
    e.preventDefault();
    addDonation({ ...form, type: donType, amount: donType === 'Uang Tunai' ? form.amount : form.description });
    setForm({ donorName: '', contact: '', targetReport: '', amount: '', description: '' });
    showToast('Donasi berhasil dicatat! Terima kasih atas kepedulian Anda. 🙏', 'success');
  };

  const handleExportAll = () => {
    const csvHeader = 'ID,Nama Donatur,Tipe,Jumlah,Status,Tanggal,Tujuan\n';
    const csvRows = donations.map(d => `${d.id},${d.donorName},${d.type},${d.amount},${d.status},${d.date},${d.targetReport}`).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'riwayat_donasi.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data donasi berhasil diekspor!', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-3">
            <Heart className="w-7 h-7 text-primary-600" /> Portal Donatur
          </h1>
          <p className="text-gray-500">
            {isAdmin
              ? 'Kelola dan pantau seluruh riwayat donasi dari para donatur.'
              : 'Salurkan bantuan Anda langsung ke lokasi yang membutuhkan.'}
          </p>
        </div>

        {/* Impact counter + transparency */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white">
            <Heart className="w-6 h-6 mb-2 text-primary-200" />
            <div className="text-4xl font-extrabold mb-1">{totalPeopleHelped.toLocaleString('id-ID')}</div>
            <p className="text-primary-100">Jiwa yang telah dibantu oleh para donatur</p>
          </div>
          <div className="card border-2 border-green-100 bg-green-50/50">
            <Shield className="w-6 h-6 mb-2 text-green-600" />
            <h3 className="font-bold text-gray-900 mb-1">✅ Semua donasi terverifikasi dan terdokumentasi</h3>
            <p className="text-sm text-gray-500">Setiap donasi diaudit oleh tim BPBD dan dapat diunduh laporannya.</p>
          </div>
        </div>

        {/* ============ ADMIN VIEW ============ */}
        {isAdmin ? (
          <div className="space-y-6">
            {/* Export button */}
            <div className="flex justify-end">
              <button onClick={handleExportAll} className="btn-primary">
                <FileDown className="w-4 h-4" /> Export Semua Donasi (CSV)
              </button>
            </div>

            {/* Admin donation table */}
            <div className="card overflow-x-auto">
              <h2 className="font-bold text-gray-900 mb-4">📋 Riwayat Donasi dari Donatur</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="pb-3 font-semibold">ID</th>
                    <th className="pb-3 font-semibold">Nama Donatur</th>
                    <th className="pb-3 font-semibold">Tipe</th>
                    <th className="pb-3 font-semibold">Jumlah</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Tanggal</th>
                    <th className="pb-3 font-semibold">Tujuan</th>
                    <th className="pb-3 font-semibold text-center">Bukti</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map(d => (
                    <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-mono text-xs text-gray-400">{d.id}</td>
                      <td className="py-3 font-semibold text-gray-900">{d.donorName}</td>
                      <td className="py-3 text-gray-600">{d.type}</td>
                      <td className="py-3 text-gray-700 font-medium">{d.amount}</td>
                      <td className="py-3">
                        <span className={`badge text-xs ${d.status === 'Diterima' ? 'badge-green' : 'badge-yellow'}`}>{d.status}</span>
                      </td>
                      <td className="py-3 text-gray-500">{d.date}</td>
                      <td className="py-3 text-gray-500 text-xs">{d.targetReport}</td>
                      <td className="py-3 text-center">
                        <button onClick={() => showToast('Mengunduh bukti donasi...', 'info')}
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                          <Download className="w-3.5 h-3.5" /> Unduh
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {donations.length === 0 && (
                <p className="text-center text-gray-400 py-8">Belum ada data donasi.</p>
              )}
            </div>
          </div>
        ) : (
          /* ============ GUEST VIEW (unchanged) ============ */
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Unmet needs + Donation form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Unmet needs */}
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4">🚨 Kebutuhan yang Belum Terpenuhi</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {unmetNeeds.map((n, i) => (
                    <div key={i} className="border border-red-100 bg-red-50/50 rounded-xl p-3">
                      <p className="font-bold text-gray-900 text-sm">{n.need}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{n.location}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-primary-600 font-medium">
                        <Users className="w-3.5 h-3.5" /> {n.people?.toLocaleString('id-ID')} jiwa
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donation form */}
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-5">Form Donasi</h2>

                {/* Type selector */}
                <div className="flex gap-2 mb-5 p-1 bg-gray-100 rounded-xl">
                  {donationTypes.map(t => (
                    <button key={t.key} onClick={() => setDonType(t.key)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${donType === t.key ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="form-label">Nama Donatur</label><input className="form-input" required value={form.donorName} onChange={e => set('donorName', e.target.value)} placeholder="Nama / Lembaga" /></div>
                    <div><label className="form-label">Kontak</label><input className="form-input" required value={form.contact} onChange={e => set('contact', e.target.value)} placeholder="Email / No. HP" /></div>
                  </div>

                  <div>
                    <label className="form-label">Tujuan Donasi</label>
                    <select className="form-input" required value={form.targetReport} onChange={e => set('targetReport', e.target.value)}>
                      <option value="">-- Pilih Lokasi/Laporan --</option>
                      {reports.filter(r => r.status !== 'resolved').map(r => (
                        <option key={r.id} value={r.id}>{r.id} — {r.location.split(',')[0]} ({r.disasterType})</option>
                      ))}
                    </select>
                  </div>

                  {donType === 'Uang Tunai' && (
                    <div><label className="form-label">Jumlah Donasi</label><input className="form-input" required value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="Rp 100.000" /></div>
                  )}

                  {(donType === 'Barang' || donType === 'Jasa') && (
                    <div><label className="form-label">{donType === 'Barang' ? 'Deskripsi Barang' : 'Deskripsi Jasa'}</label>
                    <textarea className="form-input resize-none" rows={3} required value={form.description} onChange={e => set('description', e.target.value)} placeholder={donType === 'Barang' ? 'Contoh: 100 dus mie instan, 50 kg beras...' : 'Contoh: Tim medis 5 dokter, 2 ambulan...'} /></div>
                  )}

                  {donType === 'Uang Tunai' && (
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
                      {/* QRIS */}
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <QrCode className="w-4 h-4" /> Scan QRIS untuk transfer langsung
                        </div>
                        <div className="w-36 h-36 mx-auto bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center">
                          <svg viewBox="0 0 200 200" className="w-32 h-32">
                            {[...Array(7)].map((_, r) => [...Array(7)].map((_, c) => {
                              const inFinder = (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3);
                              return <rect key={`${r}-${c}`} x={c * 28 + 4} y={r * 28 + 4} width={22} height={22} fill={inFinder ? '#111' : (Math.random() > 0.5 ? '#111' : 'transparent')} rx={2} />;
                            }))}
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">QRIS DisasterConnect · BPBD Indonesia</p>
                      </div>
                      {/* Bank info */}
                      <div className="bg-white rounded-lg p-3 border border-gray-100 text-sm">
                        <p className="font-semibold text-gray-700 mb-2">Transfer Bank:</p>
                        <div className="space-y-1 text-gray-600 text-xs">
                          <p>🏦 BRI: <strong>0123-456-789-001</strong> a/n BPBD Nasional</p>
                          <p>🏦 Mandiri: <strong>1234-5678-9012-3</strong> a/n BPBD Nasional</p>
                          <p>🏦 BNI: <strong>9876-543-210</strong> a/n BPBD Nasional</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="w-full btn-primary justify-center py-3 text-base">
                    <Heart className="w-5 h-5" /> Kirim Donasi
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Donation history */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="font-bold text-gray-900 mb-4">Riwayat Donasi</h2>
                <div className="space-y-3">
                  {donations.map(d => (
                    <div key={d.id} className="border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold text-sm text-gray-900">{d.donorName}</p>
                        <span className={`badge text-xs ${d.status === 'Diterima' ? 'badge-green' : 'badge-yellow'}`}>{d.status}</span>
                      </div>
                      <p className="text-xs text-gray-500">{d.type} · {d.amount}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{d.date} · {d.targetReport}</p>
                      <button onClick={() => showToast('Mengunduh bukti donasi...', 'info')}
                        className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                        <Download className="w-3.5 h-3.5" /> Unduh Bukti
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
