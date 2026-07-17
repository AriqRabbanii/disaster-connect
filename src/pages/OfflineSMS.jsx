import { WifiOff, MessageSquare, CheckCircle, AlertTriangle, Smartphone, Signal } from 'lucide-react';

const steps = [
  { num: '01', title: 'Tulis pesan SMS', desc: 'Buka aplikasi SMS/pesan di HP Anda. Ketik pesan sesuai format di bawah ini.' },
  { num: '02', title: 'Kirim ke nomor darurat', desc: 'Kirim SMS ke nomor 1500-XXX yang tersedia 24 jam tanpa biaya (gratis).' },
  { num: '03', title: 'Tunggu konfirmasi', desc: 'Anda akan menerima SMS balasan dalam 5-10 menit sebagai konfirmasi laporan diterima.' },
  { num: '04', title: 'Bantuan dikoordinasikan', desc: 'Tim BPBD akan memproses dan mengirim bantuan berdasarkan laporan SMS Anda.' },
];

export default function OfflineSMS() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        {/* Offline banner */}
        <div className="bg-orange-500 text-white rounded-xl p-4 mb-8 flex items-center gap-3 shadow-md">
          <WifiOff className="w-6 h-6 shrink-0" />
          <div>
            <p className="font-bold">Mode Offline Aktif (Simulasi)</p>
            <p className="text-sm text-orange-100">Koneksi internet terputus. Gunakan SMS untuk melaporkan bencana.</p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Mode Offline & SMS Darurat</h1>
          </div>
          <p className="text-gray-500">Panduan penggunaan DisasterConnect saat tidak ada koneksi internet.</p>
        </div>

        {/* SMS Format - Main display */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 mb-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-transparent"></div>
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageSquare className="w-6 h-6 text-primary-400" />
              <p className="text-primary-300 font-semibold text-sm uppercase tracking-widest">Format SMS Darurat</p>
            </div>
            <div className="bg-gray-800 border border-gray-600 rounded-2xl p-6 mb-4 inline-block w-full max-w-md">
              <p className="font-mono text-2xl sm:text-3xl font-bold text-yellow-300 leading-relaxed">
                BUTUH <span className="text-green-400">[LOKASI]</span> <span className="text-blue-400">[KEBUTUHAN]</span> <span className="text-red-400">[JUMLAH]</span>
              </p>
            </div>
            <div className="bg-gray-800/80 rounded-xl p-4 inline-block w-full max-w-md">
              <p className="text-gray-400 text-sm mb-1.5">Contoh pesan:</p>
              <p className="font-mono text-lg text-white font-semibold">BUTUH Desa Maju Banjir 45</p>
              <p className="font-mono text-lg text-white font-semibold">BUTUH Lombok Gempa 200</p>
              <p className="font-mono text-lg text-white font-semibold">BUTUH Palu SAR 30</p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-primary-600/30 border border-primary-500/30 rounded-full px-4 py-2">
                <Signal className="w-4 h-4 text-primary-300" />
                <span className="text-primary-200 font-semibold">Kirim ke: 1500-XXX</span>
              </div>
              <div className="badge bg-green-800/50 border border-green-600/30 text-green-300 px-4 py-2 text-sm">
                ✅ Gratis 24 Jam
              </div>
            </div>
          </div>
        </div>

        {/* Format explanation */}
        <div className="card mb-8">
          <h2 className="font-bold text-gray-900 mb-4">Penjelasan Format</h2>
          <div className="space-y-3">
            {[
              { part: '[LOKASI]', color: 'text-green-600 bg-green-50 border-green-200', desc: 'Nama desa, kelurahan, kecamatan, atau kota tempat bencana terjadi', ex: 'Desa Maju, Kec. Palu Barat' },
              { part: '[KEBUTUHAN]', color: 'text-blue-600 bg-blue-50 border-blue-200', desc: 'Jenis bencana atau kebutuhan utama yang paling mendesak', ex: 'Banjir, Gempa, SAR, Makanan, Obat' },
              { part: '[JUMLAH]', color: 'text-red-600 bg-red-50 border-red-200', desc: 'Perkiraan jumlah orang yang membutuhkan bantuan', ex: '45, 200, 1000' },
            ].map(f => (
              <div key={f.part} className={`border rounded-xl p-4 ${f.color}`}>
                <div className="flex items-start gap-3">
                  <code className={`font-mono font-bold text-sm px-2 py-0.5 rounded border ${f.color}`}>{f.part}</code>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{f.desc}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Contoh: {f.ex}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="card mb-8">
          <h2 className="font-bold text-gray-900 mb-6">Langkah-langkah Penggunaan SMS</h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-600 text-white font-bold text-sm flex items-center justify-center">{s.num}</div>
                <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                  <p className="font-bold text-gray-900 mb-1">{s.title}</p>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Tips SMS Efektif</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>✓ Gunakan kata singkat tapi jelas</li>
              <li>✓ Cantumkan nama tempat spesifik</li>
              <li>✓ Sebutkan angka perkiraan jiwa</li>
              <li>✓ Kirim dari HP siapa saja</li>
              <li>✓ Bisa dikirim berkali-kali</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Penting Diketahui</h3>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>⚠ Sinyal minimal diperlukan</li>
              <li>⚠ Tidak perlu smartphone</li>
              <li>⚠ HP mati/low battery — minta tolong orang lain</li>
              <li>⚠ Konfirmasi SMS dikirim otomatis</li>
              <li>⚠ Nomor 1500-XXX aktif 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
