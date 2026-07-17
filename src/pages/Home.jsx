import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Map, Users, Heart, ArrowRight, FileText, CheckCircle, Bell, Shield, Zap, Globe, TrendingUp, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const timer = setInterval(() => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress >= 1) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString('id-ID')}{suffix}</span>;
}

const steps = [
  { icon: <FileText className="w-8 h-8 text-primary-600" />, title: 'Laporkan Bencana', desc: 'Kirim laporan bencana dengan foto, lokasi GPS, dan kebutuhan mendesak langsung dari HP Anda.', num: '01' },
  { icon: <Zap className="w-8 h-8 text-primary-600" />, title: 'AI Analisis & Prioritas', desc: 'Sistem AI kami menganalisis semua laporan dan memprioritaskan respons berdasarkan tingkat urgensi.', num: '02' },
  { icon: <Users className="w-8 h-8 text-primary-600" />, title: 'Koordinasi & Bantuan', desc: 'Tim relawan dan logistik dikoordinasikan secara real-time untuk pengiriman bantuan yang tepat sasaran.', num: '03' },
];

const features = [
  { icon: <Globe className="w-6 h-6" />, title: 'Peta Real-Time', desc: 'Pantau seluruh situasi bencana di Indonesia dalam satu peta interaktif.' },
  { icon: <Bell className="w-6 h-6" />, title: 'Notifikasi Darurat', desc: 'Sistem peringatan dini dan notifikasi untuk wilayah terdampak.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Terverifikasi BPBD', desc: 'Semua data diverifikasi oleh koordinator BPBD resmi pemerintah.' },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'Laporan Transparan', desc: 'Donasi dan distribusi bantuan terdokumentasi secara transparan.' },
];

export default function Home() {
  const { reports, volunteers, donations } = useApp();

  const totalPeople = reports.reduce((s, r) => s + (r.peopleAffected || 0), 0);
  const totalDonations = donations.filter(d => d.status === 'Diterima').length;

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        {/* Urgent badges */}
        <div className="absolute top-6 right-6 hidden sm:block">
          <div className="flex items-center gap-2 bg-red-600/90 text-white px-4 py-2 rounded-full text-sm font-semibold pulse-urgent shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            {reports.filter(r => r.status === 'pending').length} Laporan Aktif
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 rounded-full px-4 py-1.5 text-sm text-primary-300 mb-6">
              <AlertTriangle className="w-4 h-4" />
              Platform Resmi Koordinasi Bencana Nasional
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Koordinasi Bantuan Bencana,{' '}
              <span className="text-primary-400">Lebih Cepat & Tepat</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed">
              DisasterConnect menghubungkan korban bencana, relawan, donatur, dan koordinator BPBD
              dalam satu platform terintegrasi untuk respons yang lebih efektif di seluruh Indonesia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/lapor" className="btn-primary text-base px-6 py-3">
                <AlertTriangle className="w-5 h-5" /> Laporkan Bencana
              </Link>
              <Link to="/peta" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 text-base">
                <Map className="w-5 h-5" /> Lihat Peta
              </Link>
              <Link to="/relawan" className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 text-base">
                <Users className="w-5 h-5" /> Jadi Relawan
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 28C840 36 960 40 1080 35C1200 30 1320 15 1380 8L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Laporan', value: reports.length, suffix: '+', icon: <FileText className="w-6 h-6 text-primary-600" />, color: 'text-primary-600' },
              { label: 'Relawan Aktif', value: volunteers.filter(v => v.availability !== 'inactive').length, suffix: '', icon: <Users className="w-6 h-6 text-blue-600" />, color: 'text-blue-600' },
              { label: 'Jiwa Dibantu', value: totalPeople, suffix: '+', icon: <Heart className="w-6 h-6 text-green-600" />, color: 'text-green-600' },
              { label: 'Donasi Diterima', value: totalDonations, suffix: '', icon: <CheckCircle className="w-6 h-6 text-yellow-600" />, color: 'text-yellow-600' },
            ].map((s, i) => (
              <div key={i} className="card text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-3">{s.icon}</div>
                <div className={`text-3xl lg:text-4xl font-extrabold ${s.color} mb-1`}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-gray-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Bagaimana DisasterConnect Bekerja?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">Tiga langkah sederhana untuk koordinasi bantuan bencana yang efektif</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200"></div>
            {steps.map((s, i) => (
              <div key={i} className="relative text-center group">
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary-50 border-2 border-primary-100 flex items-center justify-center group-hover:border-primary-400 group-hover:bg-primary-100 transition-all duration-300 group-hover:-translate-y-1">
                    {s.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">{s.num}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">Fitur Unggulan Platform</h2>
            <p className="section-subtitle">Teknologi terdepan untuk koordinasi bencana yang lebih baik</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card-hover group">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent reports */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title">Laporan Terkini</h2>
              <p className="section-subtitle">Kondisi bencana yang membutuhkan perhatian segera</p>
            </div>
            <Link to="/peta" className="btn-secondary text-sm">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.filter(r => r.status === 'pending').slice(0, 3).map(r => (
              <div key={r.id} className="card border-l-4 border-l-primary-600 group hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <span className="badge-red pulse-urgent">🔴 Mendesak</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {Math.round((Date.now() - new Date(r.reportedAt)) / 3600000)}j lalu
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{r.location}</h3>
                <p className="text-sm text-primary-600 font-medium mb-2">{r.disasterType}</p>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{r.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {r.peopleAffected.toLocaleString('id-ID')} jiwa</span>
                  <span className="flex flex-wrap gap-1">
                    {r.needs.slice(0, 2).map(n => <span key={n} className="bg-gray-100 px-2 py-0.5 rounded-full">{n}</span>)}
                    {r.needs.length > 2 && <span className="bg-gray-100 px-2 py-0.5 rounded-full">+{r.needs.length - 2}</span>}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Siap Membantu Sesama?</h2>
          <p className="text-primary-100 mb-8 text-lg">Bergabunglah dengan ribuan relawan dan donatur yang telah membantu korban bencana di seluruh Indonesia.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/relawan" className="px-6 py-3 bg-white text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-colors">
              <span className="flex items-center gap-2"><Users className="w-5 h-5" /> Daftar Relawan</span>
            </Link>
            <Link to="/donatur" className="px-6 py-3 bg-primary-800 text-white font-bold rounded-lg hover:bg-primary-900 transition-colors border border-primary-500">
              <span className="flex items-center gap-2"><Heart className="w-5 h-5" /> Donasikan Sekarang</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-primary-500" />
            <span className="font-bold text-white">DisasterConnect</span>
          </div>
          <p className="text-sm">Platform Koordinasi Bantuan Bencana Indonesia · Bekerjasama dengan BPBD & BNPB</p>
          <p className="text-xs mt-2 text-gray-600">© 2024 DisasterConnect. Semua data bersifat simulasi untuk keperluan demonstrasi.</p>
        </div>
      </footer>
    </div>
  );
}
