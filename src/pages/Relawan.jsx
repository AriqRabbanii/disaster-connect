import { useState } from 'react';
import { Users, UserPlus, CheckSquare, Square, MapPin, Phone, Mail, Zap, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SKILLS } from '../data/mockData';

const availabilityConfig = {
  available: { label: 'Tersedia', color: 'bg-green-500', badge: 'badge-green' },
  'on-duty': { label: 'Sedang Bertugas', color: 'bg-yellow-500', badge: 'badge-yellow' },
  inactive: { label: 'Tidak Aktif', color: 'bg-gray-400', badge: 'badge-gray' },
};

export default function Relawan() {
  const { volunteers, addVolunteer, isAdmin, showToast } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filterAvail, setFilterAvail] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', skills: [], location: '', availability: 'available' });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggleSkill = (s) => set('skills', form.skills.includes(s) ? form.skills.filter(x => x !== s) : [...form.skills, s]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || form.skills.length === 0) { showToast('Harap isi nama, telepon, dan pilih minimal 1 skill.', 'error'); return; }
    addVolunteer(form);
    setForm({ name: '', phone: '', email: '', skills: [], location: '', availability: 'available' });
    setShowForm(false);
    showToast('Pendaftaran relawan berhasil! Terima kasih atas kepedulian Anda.', 'success');
  };

  const filtered = volunteers.filter(v => {
    if (filterAvail && v.availability !== filterAvail) return false;
    if (filterSkill && !v.skills.includes(filterSkill)) return false;
    return true;
  });

  const stats = {
    total: volunteers.length,
    available: volunteers.filter(v => v.availability === 'available').length,
    onDuty: volunteers.filter(v => v.availability === 'on-duty').length,
  };

  const handleChangeStatus = (vol, newStatus) => {
    // Update volunteer availability in-place via showToast feedback
    vol.availability = newStatus;
    const label = availabilityConfig[newStatus]?.label || newStatus;
    showToast(`Status ${vol.name} diubah menjadi "${label}"`, 'success');
  };

  const handleAssign = (vol) => {
    showToast(`${vol.name} berhasil ditugaskan ke laporan terbaru`, 'success');
  };

  const handleSkillMatch = (vol) => {
    showToast(`Skill-matching: ${vol.name} cocok untuk ${vol.skills.length} jenis tugas`, 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-3">
              <Users className="w-7 h-7 text-primary-600" /> Manajemen Relawan
            </h1>
            <p className="text-gray-500">
              {isAdmin
                ? 'Kelola, tugaskan, dan pantau seluruh relawan terdaftar.'
                : 'Daftarkan diri sebagai relawan atau lihat relawan aktif saat ini.'}
            </p>
          </div>
          {/* Hide registration button for admin */}
          {!isAdmin && (
            <button onClick={() => setShowForm(!showForm)} className="btn-primary">
              <UserPlus className="w-4 h-4" /> Daftar Relawan
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Relawan', value: stats.total, color: 'text-gray-900' },
            { label: 'Tersedia Sekarang', value: stats.available, color: 'text-green-600' },
            { label: 'Sedang Bertugas', value: stats.onDuty, color: 'text-yellow-600' },
          ].map(s => (
            <div key={s.label} className="card text-center">
              <div className={`text-3xl font-extrabold ${s.color} mb-1`}>{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Registration form — only for guest */}
        {!isAdmin && showForm && (
          <div className="card mb-8 border-2 border-primary-100 animate-slide-down">
            <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2"><UserPlus className="w-5 h-5 text-primary-600" /> Form Pendaftaran Relawan</h2>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
              <div><label className="form-label">Nama Lengkap *</label><input className="form-input" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Nama lengkap Anda" /></div>
              <div><label className="form-label">Nomor HP *</label><input className="form-input" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="08xxxxxxxxxx" /></div>
              <div><label className="form-label">Email</label><input type="email" className="form-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@domain.com" /></div>
              <div><label className="form-label">Lokasi Saat Ini</label><input className="form-input" value={form.location} onChange={e => set('location', e.target.value)} placeholder="Kota/Kabupaten" /></div>
              
              <div className="sm:col-span-2">
                <label className="form-label">Keahlian * (pilih minimal 1)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SKILLS.map(s => (
                    <button key={s} type="button" onClick={() => toggleSkill(s)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${form.skills.includes(s) ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      {form.skills.includes(s) ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />} {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Status Ketersediaan</label>
                <select className="form-input" value={form.availability} onChange={e => set('availability', e.target.value)}>
                  <option value="available">Tersedia</option>
                  <option value="on-duty">Sedang Bertugas</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex gap-3 pt-2">
                <button type="submit" className="btn-primary">Daftar Sekarang</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Batal</button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select className="form-input w-auto py-1.5 text-sm" value={filterAvail} onChange={e => setFilterAvail(e.target.value)}>
            <option value="">Semua Status</option>
            <option value="available">Tersedia</option>
            <option value="on-duty">Sedang Bertugas</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
          <select className="form-input w-auto py-1.5 text-sm" value={filterSkill} onChange={e => setFilterSkill(e.target.value)}>
            <option value="">Semua Keahlian</option>
            {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span className="text-sm text-gray-500 flex items-center">Menampilkan {filtered.length} relawan</span>
        </div>

        {/* Volunteer cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(v => {
            const avail = availabilityConfig[v.availability];
            return (
              <div key={v.id} className="card-hover group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {v.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{v.name}</p>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${avail.color}`} />
                        <span className="text-xs text-gray-500">{avail.label}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {v.skills.map(s => <span key={s} className="badge-blue text-xs">{s}</span>)}
                </div>

                <div className="space-y-1 text-xs text-gray-500 mb-4">
                  {v.location && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{v.location}</div>}
                  {v.phone && <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{v.phone}</div>}
                  <div className="flex items-center gap-1.5"><CheckSquare className="w-3.5 h-3.5 text-green-500" />{v.tasksCompleted} tugas diselesaikan</div>
                </div>

                {/* Admin management tools */}
                {isAdmin && (
                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    {/* Status dropdown */}
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500 whitespace-nowrap">Ubah Status:</label>
                      <select
                        className="form-input py-1 text-xs flex-1"
                        value={v.availability}
                        onChange={e => handleChangeStatus(v, e.target.value)}
                      >
                        <option value="available">Tersedia</option>
                        <option value="on-duty">Sedang Bertugas</option>
                        <option value="inactive">Tidak Aktif</option>
                      </select>
                    </div>
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      {v.availability === 'available' && (
                        <button onClick={() => handleAssign(v)}
                          className="flex-1 btn-primary py-1.5 text-xs justify-center">
                          <Zap className="w-3.5 h-3.5" /> Tugaskan
                        </button>
                      )}
                      <button onClick={() => handleSkillMatch(v)}
                        className="flex-1 py-1.5 text-xs justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors flex items-center gap-1">
                        <CheckSquare className="w-3.5 h-3.5" /> Skill Match
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
