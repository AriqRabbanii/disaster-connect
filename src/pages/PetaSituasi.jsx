import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Filter, Layers, Map, Users, Building2, Route, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NEEDS, PROVINCES, mockPosko, mockGudang, mockEvakuasiRoutes } from '../data/mockData';

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createColorIcon = (color) => L.divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;background:${color};border:2.5px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.35);${color === '#DC2626' ? 'animation:pulseUrgent 1.5s ease-in-out infinite;' : ''}"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  popupAnchor: [0, -10],
});

const poskoBluIcon = L.divIcon({
  className: '',
  html: `<div style="width:22px;height:22px;background:#2563EB;border:2px solid white;border-radius:4px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-size:10px;color:white;font-weight:bold;">P</div>`,
  iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -12],
});

const gudangIcon = L.divIcon({
  className: '',
  html: `<div style="width:22px;height:22px;background:#7C3AED;border:2px solid white;border-radius:4px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-size:10px;color:white;font-weight:bold;">G</div>`,
  iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -12],
});

const statusColor = { pending: '#DC2626', 'in-progress': '#D97706', resolved: '#16A34A' };
const statusLabel = { pending: '🔴 Belum Ditangani', 'in-progress': '🟡 Sedang Ditangani', resolved: '🟢 Selesai' };

function MapBounds({ reports }) {
  const map = useMap();
  useEffect(() => {
    if (reports.length > 0) {
      const valid = reports.filter(r => r.lat && r.lng);
      if (valid.length > 0) {
        map.setView([-2.5, 118], 5);
      }
    }
  }, []);
  return null;
}

export default function PetaSituasi() {
  const { reports } = useApp();
  const [filterNeed, setFilterNeed] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterProvince, setFilterProvince] = useState('');
  const [showPosko, setShowPosko] = useState(true);
  const [showGudang, setShowGudang] = useState(false);
  const [showEvakuasi, setShowEvakuasi] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = reports.filter(r => {
    if (!r.lat || !r.lng) return false;
    if (filterNeed && !r.needs.includes(filterNeed)) return false;
    if (filterStatus && r.status !== filterStatus) return false;
    if (filterProvince && r.province !== filterProvince) return false;
    return true;
  });

  const clearFilters = () => { setFilterNeed(''); setFilterStatus(''); setFilterProvince(''); };
  const hasFilters = filterNeed || filterStatus || filterProvince;

  const counts = {
    pending: filtered.filter(r => r.status === 'pending').length,
    'in-progress': filtered.filter(r => r.status === 'in-progress').length,
    resolved: filtered.filter(r => r.status === 'resolved').length,
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Map className="w-5 h-5 text-primary-600" />
          <h1 className="font-bold text-gray-900">Peta Situasi Real-Time</h1>
          <span className="badge-red">{counts.pending} Mendesak</span>
          <span className="badge-yellow hidden sm:inline-flex">{counts['in-progress']} Dalam Proses</span>
          <span className="badge-green hidden sm:inline-flex">{counts.resolved} Selesai</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${showFilters ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            <Filter className="w-4 h-4" /> Filter
            {hasFilters && <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>}
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 animate-slide-down">
          <div className="flex flex-wrap items-center gap-3">
            <select className="form-input w-auto py-1.5 text-sm" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">Semua Status</option>
              <option value="pending">🔴 Belum Ditangani</option>
              <option value="in-progress">🟡 Dalam Proses</option>
              <option value="resolved">🟢 Selesai</option>
            </select>
            <select className="form-input w-auto py-1.5 text-sm" value={filterNeed} onChange={e => setFilterNeed(e.target.value)}>
              <option value="">Semua Kebutuhan</option>
              {NEEDS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <select className="form-input w-auto py-1.5 text-sm" value={filterProvince} onChange={e => setFilterProvince(e.target.value)}>
              <option value="">Semua Provinsi</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {/* Layer toggles */}
            <div className="flex items-center gap-2 ml-auto">
              <Layers className="w-4 h-4 text-gray-500" />
              {[
                { label: 'Posko', state: showPosko, set: setShowPosko, color: 'bg-blue-600' },
                { label: 'Gudang', state: showGudang, set: setShowGudang, color: 'bg-purple-600' },
                { label: 'Evakuasi', state: showEvakuasi, set: setShowEvakuasi, color: 'bg-orange-600' },
              ].map(l => (
                <button key={l.label} onClick={() => l.set(!l.state)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${l.state ? `${l.color} text-white` : 'bg-gray-100 text-gray-600'}`}>
                  {l.label}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium">
                <X className="w-3.5 h-3.5" /> Hapus Filter
              </button>
            )}
          </div>
        </div>
      )}

      {/* Map */}
      <div className="flex-1 relative">
        <style>{`
          @keyframes pulseUrgent {
            0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.7); }
            50% { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
          }
        `}</style>
        <MapContainer center={[-2.5, 118]} zoom={5} className="w-full h-full">
          <MapBounds reports={filtered} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Report markers */}
          {filtered.map(r => (
            <Marker key={r.id} position={[r.lat, r.lng]} icon={createColorIcon(statusColor[r.status])}>
              <Popup maxWidth={260}>
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.status === 'pending' ? 'bg-red-100 text-red-700' : r.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {statusLabel[r.status]}
                    </span>
                    {r.isolated && <span className="text-xs bg-gray-800 text-white px-1.5 py-0.5 rounded">TERISOLASI</span>}
                  </div>
                  <p className="font-bold text-gray-900 mb-0.5">{r.location}</p>
                  <p className="text-primary-600 font-medium text-xs mb-2">{r.disasterType}</p>
                  <div className="space-y-1 text-gray-600">
                    <p>👥 {r.peopleAffected?.toLocaleString('id-ID')} jiwa terdampak</p>
                    <p>🕐 {Math.round((Date.now() - new Date(r.reportedAt)) / 3600000)} jam lalu</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {r.needs.slice(0, 4).map(n => <span key={n} className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded">{n}</span>)}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Posko markers */}
          {showPosko && mockPosko.map(p => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={poskoBluIcon}>
              <Popup><p className="font-semibold text-blue-700">{p.name}</p><p className="text-xs text-gray-500">Posko Bantuan</p></Popup>
            </Marker>
          ))}

          {/* Gudang markers */}
          {showGudang && mockGudang.map(g => (
            <Marker key={g.id} position={[g.lat, g.lng]} icon={gudangIcon}>
              <Popup><p className="font-semibold text-purple-700">{g.name}</p><p className="text-xs text-gray-500">Gudang Logistik</p></Popup>
            </Marker>
          ))}

          {/* Evacuation routes */}
          {showEvakuasi && mockEvakuasiRoutes.map(e => (
            <Polyline key={e.id} positions={e.coords} color="#EA580C" weight={3} dashArray="8,4">
              <Popup><p className="font-semibold text-orange-700">{e.name}</p></Popup>
            </Polyline>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur rounded-xl shadow-lg p-3 text-xs border border-gray-100">
          <p className="font-bold text-gray-700 mb-2">Legenda</p>
          {[
            { color: '#DC2626', label: 'Belum Ditangani' },
            { color: '#D97706', label: 'Sedang Ditangani' },
            { color: '#16A34A', label: 'Selesai' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full border-2 border-white shadow" style={{ background: l.color }} />
              <span className="text-gray-600">{l.label}</span>
            </div>
          ))}
          {showPosko && <div className="flex items-center gap-2 mb-1"><div className="w-4 h-4 bg-blue-600 rounded text-white text-center text-[9px] leading-4 font-bold">P</div><span className="text-gray-600">Posko Bantuan</span></div>}
          {showGudang && <div className="flex items-center gap-2 mb-1"><div className="w-4 h-4 bg-purple-600 rounded text-white text-center text-[9px] leading-4 font-bold">G</div><span className="text-gray-600">Gudang Logistik</span></div>}
          {showEvakuasi && <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-orange-500 border-t-2 border-dashed border-orange-500"></div><span className="text-gray-600">Jalur Evakuasi</span></div>}
        </div>

        {/* Stats overlay */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur rounded-xl shadow-lg p-3 text-xs border border-gray-100 min-w-[120px]">
          <p className="font-bold text-gray-700 mb-2">Statistik</p>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center"><span className="text-gray-500">Menampilkan</span><span className="font-bold text-gray-900">{filtered.length}</span></div>
            <div className="flex justify-between items-center"><span className="text-red-500">🔴 Mendesak</span><span className="font-bold text-red-600">{counts.pending}</span></div>
            <div className="flex justify-between items-center"><span className="text-yellow-600">🟡 Proses</span><span className="font-bold text-yellow-600">{counts['in-progress']}</span></div>
            <div className="flex justify-between items-center"><span className="text-green-600">🟢 Selesai</span><span className="font-bold text-green-600">{counts.resolved}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
