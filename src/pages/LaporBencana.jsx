import { useState, useRef } from 'react';
import { AlertTriangle, MapPin, User, Users, Camera, Send, Phone, CheckSquare, Square } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DISASTER_TYPES, NEEDS } from '../data/mockData';

export default function LaporBencana() {
  const { addReport, showToast } = useApp();
  const fileRef = useRef();
  const [anonymous, setAnonymous] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', location: '', lat: null, lng: null,
    disasterType: '', needs: [], peopleAffected: '',
    description: '', photo: null, urgency: 3,
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const toggleNeed = (n) => {
    set('needs', form.needs.includes(n) ? form.needs.filter(x => x !== n) : [...form.needs, n]);
  };

  const getGPS = () => {
    if (!navigator.geolocation) { showToast('Browser tidak mendukung GPS', 'error'); return; }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        set('lat', pos.coords.latitude.toFixed(6));
        set('lng', pos.coords.longitude.toFixed(6));
        set('location', `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setGpsLoading(false);
        showToast('Lokasi GPS berhasil didapatkan!', 'success');
      },
      () => { setGpsLoading(false); showToast('Gagal mendapatkan GPS. Masukkan lokasi manual.', 'error'); }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.location || !form.disasterType || form.needs.length === 0) {
      showToast('Harap lengkapi lokasi, jenis bencana, dan kebutuhan mendesak.', 'error');
      return;
    }
    addReport({
      ...form,
      name: anonymous ? 'Anonim' : (form.name || 'Tidak disebutkan'),
      anonymous,
      peopleAffected: parseInt(form.peopleAffected) || 1,
      province: 'Tidak Diketahui',
    });
    showToast('Laporan berhasil dikirim! Tim BPBD akan segera meninjau.', 'success');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="card py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckSquare className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Laporan Terkirim!</h2>
            <p className="text-gray-500 mb-6">Terima kasih. Tim koordinator BPBD akan segera menindaklanjuti laporan Anda.</p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700 mb-6 text-left">
              <p className="font-semibold mb-1">📋 Langkah selanjutnya:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Laporan masuk ke sistem prioritas AI</li>
                <li>Relawan terdekat akan dihubungi</li>
                <li>Status dapat dipantau di Peta Situasi</li>
              </ul>
            </div>
            <button onClick={() => setSubmitted(false)} className="btn-primary w-full justify-center">
              Kirim Laporan Lain
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Laporan Bencana</h1>
          </div>
          <p className="text-gray-500">Isi formulir di bawah untuk melaporkan situasi bencana di lokasi Anda.</p>
        </div>

        {/* SMS info box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
          <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-0.5">Tanpa Internet? Gunakan SMS!</p>
            <p>Kirim SMS ke <strong>1500-XXX</strong>:</p>
            <code className="bg-amber-100 px-2 py-0.5 rounded text-xs block mt-1">BUTUH [lokasi] [kebutuhan] [jumlah]</code>
            <p className="text-xs mt-1 text-amber-600">Contoh: BUTUH Desa Maju Banjir 45</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          {/* Anonymous toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Laporkan Anonim</p>
              <p className="text-xs text-gray-500">Nama Anda tidak akan ditampilkan</p>
            </div>
            <button
              type="button"
              onClick={() => setAnonymous(!anonymous)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${anonymous ? 'bg-primary-600' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${anonymous ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          {/* Name */}
          {!anonymous && (
            <div>
              <label htmlFor="name" className="form-label"><User className="w-4 h-4 inline mr-1" />Nama Lengkap</label>
              <input id="name" type="text" className="form-input" placeholder="Nama pelapor (opsional)" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
          )}

          {/* Location */}
          <div>
            <label htmlFor="location" className="form-label"><MapPin className="w-4 h-4 inline mr-1" />Lokasi Bencana <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <input id="location" type="text" className="form-input" placeholder="Nama desa/kelurahan, kecamatan, kabupaten..." value={form.location} onChange={e => set('location', e.target.value)} required />
              <button type="button" onClick={getGPS} disabled={gpsLoading} className="shrink-0 px-3 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 flex items-center gap-1.5">
                {gpsLoading ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : <MapPin className="w-4 h-4" />}
                GPS
              </button>
            </div>
            {form.lat && <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1"><CheckSquare className="w-3.5 h-3.5" /> GPS: {form.lat}, {form.lng}</p>}
          </div>

          {/* Disaster type */}
          <div>
            <label htmlFor="disasterType" className="form-label">Jenis Bencana <span className="text-red-500">*</span></label>
            <select id="disasterType" className="form-input" value={form.disasterType} onChange={e => set('disasterType', e.target.value)} required>
              <option value="">-- Pilih Jenis Bencana --</option>
              {DISASTER_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Needs */}
          <div>
            <label className="form-label">Kebutuhan Mendesak <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {NEEDS.map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => toggleNeed(n)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-150 ${form.needs.includes(n) ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  {form.needs.includes(n) ? <CheckSquare className="w-3.5 h-3.5 shrink-0" /> : <Square className="w-3.5 h-3.5 shrink-0" />}
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* People affected */}
          <div>
            <label htmlFor="people" className="form-label"><Users className="w-4 h-4 inline mr-1" />Jumlah Jiwa Terdampak</label>
            <input id="people" type="number" min="1" className="form-input" placeholder="Perkiraan jumlah jiwa" value={form.peopleAffected} onChange={e => set('peopleAffected', e.target.value)} />
          </div>

          {/* Urgency */}
          <div>
            <label className="form-label">Tingkat Urgensi</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(u => (
                <button key={u} type="button" onClick={() => set('urgency', u)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 transition-all ${form.urgency === u ? u >= 4 ? 'bg-red-600 border-red-600 text-white' : u === 3 ? 'bg-yellow-500 border-yellow-500 text-white' : 'bg-green-500 border-green-500 text-white' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  {u}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">1 = Rendah, 5 = Sangat Kritis</p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="desc" className="form-label">Deskripsi Situasi</label>
            <textarea id="desc" rows={4} className="form-input resize-none" placeholder="Jelaskan kondisi saat ini, jumlah korban, kerusakan yang terjadi, akses jalan, dll..." value={form.description} onChange={e => set('description', e.target.value)} />
          </div>

          {/* Photo upload */}
          <div>
            <label className="form-label"><Camera className="w-4 h-4 inline mr-1" />Upload Foto</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all duration-200"
            >
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">{form.photo ? form.photo.name : 'Klik untuk upload foto situasi bencana'}</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF (maks. 10MB)</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => set('photo', e.target.files[0])} />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary justify-center py-3 text-base">
            <Send className="w-5 h-5" /> Kirim Laporan
          </button>
        </form>
      </div>
    </div>
  );
}
