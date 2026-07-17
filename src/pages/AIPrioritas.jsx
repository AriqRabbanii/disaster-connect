import { useState, useEffect, useCallback } from 'react';
import { Brain, AlertTriangle, Clock, Users, TrendingUp, Zap, Info, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

function calcScore(r) {
  const urgencyScore = (r.urgency / 5) * 40;
  const maxPeople = 1000;
  const peopleScore = (Math.min(r.peopleAffected, maxPeople) / maxPeople) * 35;
  const hoursWaited = (Date.now() - new Date(r.reportedAt)) / 3600000;
  const waitScore = (Math.min(hoursWaited, 48) / 48) * 25;
  const isolatedBonus = r.isolated ? 10 : 0;
  return {
    total: Math.min(Math.round(urgencyScore + peopleScore + waitScore + isolatedBonus), 100),
    urgency: Math.round(urgencyScore),
    people: Math.round(peopleScore),
    wait: Math.round(waitScore),
  };
}

function ScoreBar({ label, value, max, color }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-20 text-gray-500 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
      <span className="w-8 text-right font-semibold text-gray-700">{value}</span>
    </div>
  );
}

function CountdownTimer() {
  const [seconds, setSeconds] = useState(900);
  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s <= 1 ? 900 : s - 1), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <RefreshCw className="w-4 h-4 animate-spin-slow text-primary-500" style={{ animation: 'spin 8s linear infinite' }} />
      <span>Update berikutnya dalam: <strong className="text-primary-600 font-mono">{m}:{s}</strong></span>
    </div>
  );
}

const rankColors = ['#DC2626', '#D97706', '#16A34A', '#2563EB', '#7C3AED', '#0891B2', '#065F46', '#92400E', '#1E3A8A', '#6B21A8'];

export default function AIPrioritas() {
  const { reports, updateReportStatus, showToast } = useApp();

  const pending = reports.filter(r => r.status !== 'resolved');
  const ranked = pending
    .map(r => ({ ...r, score: calcScore(r) }))
    .sort((a, b) => b.score.total - a.score.total)
    .slice(0, 10);

  const urgent2hr = ranked.filter(r => {
    const hrs = (Date.now() - new Date(r.reportedAt)) / 3600000;
    return hrs > 2 && r.status === 'pending';
  });

  const handleTangani = (r) => {
    updateReportStatus(r.id, 'in-progress');
    showToast(`Laporan ${r.id} diubah menjadi "Dalam Proses"`, 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900">AI Priority Engine</h1>
              <span className="badge bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1 text-xs font-bold shadow-sm">
                ✨ INOVASI UTAMA
              </span>
            </div>
            <p className="text-gray-500 text-sm">Sistem AI menganalisis dan memprioritaskan laporan berdasarkan urgensi, jumlah jiwa, dan waktu tunggu.</p>
          </div>
          <CountdownTimer />
        </div>

        {/* Alert banner */}
        {urgent2hr.length > 0 && (
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6 flex items-start gap-3 pulse-urgent">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-800">⚠️ {urgent2hr.length} titik prioritas tinggi belum ada respons lebih dari 2 jam!</p>
              <p className="text-sm text-red-600 mt-0.5">Lokasi: {urgent2hr.slice(0, 3).map(r => r.location.split(',')[0]).join(', ')}</p>
            </div>
          </div>
        )}

        {/* Ranked cards */}
        <div className="space-y-4 mb-10">
          {ranked.map((r, i) => {
            const hrs = Math.round((Date.now() - new Date(r.reportedAt)) / 3600000);
            const isUrgent = r.score.total >= 70;
            return (
              <div key={r.id} className={`bg-white rounded-xl border-2 p-5 shadow-sm hover:shadow-md transition-all duration-200 ${isUrgent ? 'border-red-200' : 'border-gray-100'}`}>
                <div className="flex items-start gap-4">
                  {/* Rank badge */}
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-md" style={{ background: rankColors[i] }}>
                    #{i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-900">{r.location.split(',')[0]}</h3>
                          {r.isolated && <span className="badge bg-gray-800 text-white text-xs">TERISOLASI</span>}
                          {isUrgent && <span className="badge-red text-xs pulse-urgent">KRITIS</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{r.location}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-2xl font-black text-primary-600">{r.score.total}</div>
                          <div className="text-xs text-gray-400">/ 100</div>
                        </div>
                      </div>
                    </div>

                    {/* Needs */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="badge bg-primary-50 text-primary-700 font-semibold">{r.disasterType}</span>
                      {r.needs.slice(0, 4).map(n => <span key={n} className="badge-gray">{n}</span>)}
                    </div>

                    {/* Score bars */}
                    <div className="space-y-1.5 mb-3">
                      <ScoreBar label="Urgensi ×40%" value={r.score.urgency} max={40} color="#DC2626" />
                      <ScoreBar label="Jiwa ×35%" value={r.score.people} max={35} color="#D97706" />
                      <ScoreBar label="Tunggu ×25%" value={r.score.wait} max={25} color="#2563EB" />
                    </div>

                    {/* Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {r.peopleAffected?.toLocaleString('id-ID')} jiwa</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {hrs}j yang lalu</span>
                        <span className={`badge text-xs ${r.status === 'pending' ? 'badge-red' : 'badge-yellow'}`}>
                          {r.status === 'pending' ? 'Belum Ditangani' : 'Dalam Proses'}
                        </span>
                      </div>
                      {r.status === 'pending' && (
                        <button onClick={() => handleTangani(r)} className="btn-primary py-1.5 px-4 text-sm">
                          <Zap className="w-4 h-4" /> Tangani Sekarang
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Algorithm explanation */}
        <div className="card border-2 border-blue-100 bg-blue-50/50">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-gray-900">Cara Kerja Algoritma</h2>
          </div>
          <div className="bg-white rounded-xl p-4 mb-4 border border-blue-100 text-center">
            <p className="font-mono text-sm font-bold text-gray-900">
              Skor = (Urgensi × 40%) + (Jiwa Terdampak × 35%) + (Waktu Tunggu × 25%)
            </p>
            <p className="text-xs text-gray-500 mt-1">+ 10 poin bonus untuk wilayah terisolasi</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Urgensi (40%)', desc: 'Tingkat keparahan bencana yang dilaporkan pelapor (skala 1-5)', color: 'text-red-600' },
              { label: 'Jiwa Terdampak (35%)', desc: 'Jumlah orang yang membutuhkan bantuan (dibandingkan baseline 1000 jiwa)', color: 'text-yellow-600' },
              { label: 'Waktu Tunggu (25%)', desc: 'Semakin lama belum ditangani, skor semakin tinggi (baseline 48 jam)', color: 'text-blue-600' },
            ].map(f => (
              <div key={f.label} className="bg-white rounded-lg p-3 border border-gray-100">
                <p className={`font-bold mb-1 ${f.color}`}>{f.label}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
