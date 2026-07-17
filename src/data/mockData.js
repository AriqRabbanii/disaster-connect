export const DISASTER_TYPES = ['Gempa Bumi', 'Banjir', 'Tsunami', 'Longsor', 'Kebakaran', 'Lainnya'];
export const NEEDS = ['Makanan', 'Air Bersih', 'Obat-obatan', 'Tempat Evakuasi', 'Tim SAR', 'Penanganan Jenazah', 'Pakaian', 'Listrik'];
export const PROVINCES = ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi', 'Sumatera Selatan', 'Bengkulu', 'Lampung', 'Bangka Belitung', 'Kepulauan Riau', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Banten', 'Bali', 'NTB', 'NTT', 'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat', 'Maluku', 'Maluku Utara', 'Papua Barat', 'Papua'];
export const SKILLS = ['Medis/Dokter', 'SAR', 'Psikolog', 'Pengemudi', 'Logistik', 'Dapur Umum', 'IT/Komunikasi', 'Lainnya'];

export const mockReports = [
  { id: 'RPT-001', name: 'Budi Santoso', anonymous: false, location: 'Desa Petobo, Palu, Sulawesi Tengah', lat: -0.9108, lng: 119.8718, disasterType: 'Gempa Bumi', needs: ['Makanan', 'Air Bersih', 'Obat-obatan', 'Tim SAR'], peopleAffected: 250, description: 'Gempa 7.5 SR merobohkan ratusan rumah warga. Banyak korban tertimbun reruntuhan.', status: 'pending', urgency: 5, province: 'Sulawesi Tengah', reportedAt: new Date(Date.now() - 3 * 3600000).toISOString(), assignedVolunteer: null, photoUrl: null, isolated: true },
  { id: 'RPT-002', name: 'Siti Rahayu', anonymous: false, location: 'Kecamatan Baiturrahman, Banda Aceh', lat: 5.5483, lng: 95.3238, disasterType: 'Banjir', needs: ['Makanan', 'Air Bersih', 'Tempat Evakuasi', 'Pakaian'], peopleAffected: 180, description: 'Banjir bandang setinggi 2 meter menggenangi permukiman. Warga terjebak di atap rumah.', status: 'pending', urgency: 5, province: 'Aceh', reportedAt: new Date(Date.now() - 5 * 3600000).toISOString(), assignedVolunteer: null, photoUrl: null, isolated: false },
  { id: 'RPT-003', name: 'Ahmad Fauzi', anonymous: true, location: 'Lombok Utara, NTB', lat: -8.3699, lng: 116.1863, disasterType: 'Gempa Bumi', needs: ['Tim SAR', 'Obat-obatan', 'Penanganan Jenazah', 'Makanan'], peopleAffected: 320, description: 'Gempa susulan 6.4 SR. Ribuan rumah rusak berat. Akses jalan terputus.', status: 'in-progress', urgency: 5, province: 'NTB', reportedAt: new Date(Date.now() - 8 * 3600000).toISOString(), assignedVolunteer: 'VOL-001', photoUrl: null, isolated: false },
  { id: 'RPT-004', name: 'Maria Goretti', anonymous: false, location: 'Flores Timur, NTT', lat: -8.2347, lng: 122.8736, disasterType: 'Tsunami', needs: ['Makanan', 'Air Bersih', 'Obat-obatan', 'Tempat Evakuasi', 'Tim SAR'], peopleAffected: 415, description: 'Gelombang tsunami 4 meter menghantam pesisir. Desa nelayan hancur total.', status: 'pending', urgency: 5, province: 'NTT', reportedAt: new Date(Date.now() - 2 * 3600000).toISOString(), assignedVolunteer: null, photoUrl: null, isolated: true },
  { id: 'RPT-005', name: 'Rudi Hartono', anonymous: false, location: 'Mamuju, Sulawesi Barat', lat: -2.6761, lng: 118.8876, disasterType: 'Gempa Bumi', needs: ['Makanan', 'Pakaian', 'Listrik', 'Obat-obatan'], peopleAffected: 190, description: 'Gempa 6.2 SR. RS rujukan rusak. Pasien dievakuasi ke tenda darurat.', status: 'in-progress', urgency: 4, province: 'Sulawesi Barat', reportedAt: new Date(Date.now() - 12 * 3600000).toISOString(), assignedVolunteer: 'VOL-003', photoUrl: null, isolated: false },
  { id: 'RPT-006', name: 'Dewi Sartika', anonymous: false, location: 'Agam, Sumatera Barat', lat: -0.1340, lng: 100.3748, disasterType: 'Longsor', needs: ['Tim SAR', 'Obat-obatan', 'Makanan'], peopleAffected: 85, description: 'Longsor menutup jalan provinsi. 15 orang dilaporkan hilang.', status: 'pending', urgency: 5, province: 'Sumatera Barat', reportedAt: new Date(Date.now() - 4 * 3600000).toISOString(), assignedVolunteer: null, photoUrl: null, isolated: false },
  { id: 'RPT-007', name: 'Joko Widodo', anonymous: true, location: 'Demak, Jawa Tengah', lat: -6.8942, lng: 110.6421, disasterType: 'Banjir', needs: ['Makanan', 'Air Bersih', 'Tempat Evakuasi'], peopleAffected: 1200, description: 'Tanggul jebol. Ribuan rumah terendam. Warga mengungsi ke sekolah dan masjid.', status: 'in-progress', urgency: 4, province: 'Jawa Tengah', reportedAt: new Date(Date.now() - 24 * 3600000).toISOString(), assignedVolunteer: 'VOL-002', photoUrl: null, isolated: false },
  { id: 'RPT-008', name: 'Fatimah', anonymous: false, location: 'Garut, Jawa Barat', lat: -7.2107, lng: 107.9067, disasterType: 'Longsor', needs: ['Tim SAR', 'Makanan', 'Obat-obatan'], peopleAffected: 65, description: 'Tebing longsor menimpa 12 rumah warga. Korban masih dalam pencarian.', status: 'pending', urgency: 5, province: 'Jawa Barat', reportedAt: new Date(Date.now() - 1.5 * 3600000).toISOString(), assignedVolunteer: null, photoUrl: null, isolated: false },
  { id: 'RPT-009', name: 'Andi Prasetyo', anonymous: false, location: 'Donggala, Sulawesi Tengah', lat: -0.6761, lng: 119.7414, disasterType: 'Gempa Bumi', needs: ['Listrik', 'Air Bersih', 'Obat-obatan'], peopleAffected: 140, description: 'Jaringan listrik dan air bersih putus pasca gempa. Warga butuh genset.', status: 'pending', urgency: 4, province: 'Sulawesi Tengah', reportedAt: new Date(Date.now() - 6 * 3600000).toISOString(), assignedVolunteer: null, photoUrl: null, isolated: false },
  { id: 'RPT-010', name: 'Yuni Astuti', anonymous: false, location: 'Lebak, Banten', lat: -6.5598, lng: 106.2492, disasterType: 'Banjir', needs: ['Makanan', 'Pakaian', 'Tempat Evakuasi', 'Air Bersih'], peopleAffected: 530, description: 'Sungai meluap akibat hujan lebat 3 hari. Ribuan jiwa mengungsi.', status: 'in-progress', urgency: 3, province: 'Banten', reportedAt: new Date(Date.now() - 36 * 3600000).toISOString(), assignedVolunteer: 'VOL-004', photoUrl: null, isolated: false },
  { id: 'RPT-011', name: 'Bintang Ramadhan', anonymous: false, location: 'Karangasem, Bali', lat: -8.4537, lng: 115.6095, disasterType: 'Lainnya', needs: ['Makanan', 'Air Bersih'], peopleAffected: 45, description: 'Abu vulkanik Gunung Agung ganggu pernafasan warga. Butuh masker dan air bersih.', status: 'resolved', urgency: 2, province: 'Bali', reportedAt: new Date(Date.now() - 72 * 3600000).toISOString(), assignedVolunteer: 'VOL-005', photoUrl: null, isolated: false },
  { id: 'RPT-012', name: 'Lena Marlina', anonymous: true, location: 'Luwu Utara, Sulawesi Selatan', lat: -2.5537, lng: 120.1947, disasterType: 'Banjir', needs: ['Tim SAR', 'Makanan', 'Penanganan Jenazah'], peopleAffected: 280, description: 'Banjir bandang dan longsor di Masamba. Puluhan jiwa meninggal.', status: 'resolved', urgency: 5, province: 'Sulawesi Selatan', reportedAt: new Date(Date.now() - 96 * 3600000).toISOString(), assignedVolunteer: 'VOL-001', photoUrl: null, isolated: false },
  { id: 'RPT-013', name: 'Dian Permata', anonymous: false, location: 'Sorong, Papua Barat', lat: -0.8762, lng: 131.2625, disasterType: 'Banjir', needs: ['Makanan', 'Air Bersih', 'Obat-obatan', 'Pakaian'], peopleAffected: 95, description: 'Banjir rob dan hujan deras rendam kawasan padat penduduk.', status: 'pending', urgency: 3, province: 'Papua Barat', reportedAt: new Date(Date.now() - 10 * 3600000).toISOString(), assignedVolunteer: null, photoUrl: null, isolated: false },
  { id: 'RPT-014', name: 'Hendra Gunawan', anonymous: false, location: 'Banggai, Sulawesi Tengah', lat: -1.5853, lng: 123.4869, disasterType: 'Gempa Bumi', needs: ['Obat-obatan', 'Makanan', 'Tempat Evakuasi'], peopleAffected: 160, description: 'Gempa 5.9 SR. Bangunan SD dan puskesmas rusak parah.', status: 'in-progress', urgency: 4, province: 'Sulawesi Tengah', reportedAt: new Date(Date.now() - 18 * 3600000).toISOString(), assignedVolunteer: 'VOL-006', photoUrl: null, isolated: false },
  { id: 'RPT-015', name: 'Rina Susanti', anonymous: false, location: 'Pasuruan, Jawa Timur', lat: -7.6451, lng: 112.9075, disasterType: 'Kebakaran', needs: ['Makanan', 'Pakaian', 'Tempat Evakuasi'], peopleAffected: 78, description: 'Kebakaran gudang kimia menyebar ke pemukiman. 30 KK kehilangan tempat tinggal.', status: 'resolved', urgency: 3, province: 'Jawa Timur', reportedAt: new Date(Date.now() - 120 * 3600000).toISOString(), assignedVolunteer: 'VOL-007', photoUrl: null, isolated: false },
  { id: 'RPT-016', name: 'Eko Prasetya', anonymous: true, location: 'Kepulauan Aru, Maluku', lat: -6.1524, lng: 134.5093, disasterType: 'Banjir', needs: ['Makanan', 'Air Bersih', 'Obat-obatan'], peopleAffected: 112, description: 'Pulau terpencil terendam banjir. Akses transportasi sangat terbatas.', status: 'pending', urgency: 5, province: 'Maluku', reportedAt: new Date(Date.now() - 7 * 3600000).toISOString(), assignedVolunteer: null, photoUrl: null, isolated: true },
  { id: 'RPT-017', name: 'Sri Wahyuni', anonymous: false, location: 'Malinau, Kalimantan Utara', lat: 3.5854, lng: 116.6266, disasterType: 'Banjir', needs: ['Makanan', 'Air Bersih', 'Pakaian'], peopleAffected: 67, description: 'Sungai Sesayap meluap. Kampung-kampung di hulu terisolasi.', status: 'resolved', urgency: 2, province: 'Kalimantan Utara', reportedAt: new Date(Date.now() - 144 * 3600000).toISOString(), assignedVolunteer: 'VOL-008', photoUrl: null, isolated: false },
  { id: 'RPT-018', name: 'Bagas Nugroho', anonymous: false, location: 'Jayapura, Papua', lat: -2.5337, lng: 140.7181, disasterType: 'Banjir', needs: ['Tim SAR', 'Makanan', 'Obat-obatan'], peopleAffected: 145, description: 'Banjir dan tanah longsor di lereng Cyclops. Jalan nasional terputus.', status: 'pending', urgency: 4, province: 'Papua', reportedAt: new Date(Date.now() - 9 * 3600000).toISOString(), assignedVolunteer: null, photoUrl: null, isolated: false },
  { id: 'RPT-019', name: 'Nita Anggraini', anonymous: false, location: 'Bengkulu Tengah, Bengkulu', lat: -3.7928, lng: 102.2609, disasterType: 'Longsor', needs: ['Tim SAR', 'Obat-obatan'], peopleAffected: 38, description: 'Longsor menimpa jalan lintas Sumatera. 5 kendaraan tertimbun.', status: 'in-progress', urgency: 3, province: 'Bengkulu', reportedAt: new Date(Date.now() - 14 * 3600000).toISOString(), assignedVolunteer: 'VOL-009', photoUrl: null, isolated: false },
  { id: 'RPT-020', name: 'Wahyu Kurniawan', anonymous: true, location: 'Kepulauan Mentawai, Sumatera Barat', lat: -2.0765, lng: 99.5765, disasterType: 'Tsunami', needs: ['Makanan', 'Air Bersih', 'Obat-obatan', 'Tim SAR', 'Tempat Evakuasi'], peopleAffected: 890, description: 'Tsunami akibat gempa tektonik. Seluruh desa pesisir hancur. Darurat bencana nasional.', status: 'pending', urgency: 5, province: 'Sumatera Barat', reportedAt: new Date(Date.now() - 1 * 3600000).toISOString(), assignedVolunteer: null, photoUrl: null, isolated: true },
];

export const mockVolunteers = [
  { id: 'VOL-001', name: 'Dr. Arief Budiman', phone: '081234567890', email: 'arief@relawan.id', skills: ['Medis/Dokter', 'SAR'], location: 'Jakarta Selatan', availability: 'available', avatar: 'AB', joinedAt: '2024-01-15', tasksCompleted: 12 },
  { id: 'VOL-002', name: 'Sari Dewi Putri', phone: '082345678901', email: 'sari@relawan.id', skills: ['Logistik', 'Dapur Umum'], location: 'Surabaya', availability: 'on-duty', avatar: 'SD', joinedAt: '2024-02-20', tasksCompleted: 8 },
  { id: 'VOL-003', name: 'Bambang Hermanto', phone: '083456789012', email: 'bambang@relawan.id', skills: ['SAR', 'Pengemudi'], location: 'Bandung', availability: 'on-duty', avatar: 'BH', joinedAt: '2024-01-10', tasksCompleted: 15 },
  { id: 'VOL-004', name: 'Maya Kusuma', phone: '084567890123', email: 'maya@relawan.id', skills: ['Psikolog', 'Medis/Dokter'], location: 'Yogyakarta', availability: 'on-duty', avatar: 'MK', joinedAt: '2024-03-05', tasksCompleted: 6 },
  { id: 'VOL-005', name: 'Rizal Fadhilah', phone: '085678901234', email: 'rizal@relawan.id', skills: ['IT/Komunikasi', 'Logistik'], location: 'Makassar', availability: 'available', avatar: 'RF', joinedAt: '2024-02-14', tasksCompleted: 10 },
  { id: 'VOL-006', name: 'Indah Permatasari', phone: '086789012345', email: 'indah@relawan.id', skills: ['Dapur Umum', 'Logistik'], location: 'Semarang', availability: 'on-duty', avatar: 'IP', joinedAt: '2024-01-25', tasksCompleted: 9 },
  { id: 'VOL-007', name: 'Teguh Santoso', phone: '087890123456', email: 'teguh@relawan.id', skills: ['SAR', 'Pengemudi'], location: 'Medan', availability: 'available', avatar: 'TS', joinedAt: '2024-03-12', tasksCompleted: 4 },
  { id: 'VOL-008', name: 'Novita Sari', phone: '088901234567', email: 'novita@relawan.id', skills: ['Medis/Dokter', 'Psikolog'], location: 'Palembang', availability: 'inactive', avatar: 'NS', joinedAt: '2024-02-08', tasksCompleted: 7 },
  { id: 'VOL-009', name: 'Doni Firmansyah', phone: '089012345678', email: 'doni@relawan.id', skills: ['Pengemudi', 'Logistik'], location: 'Pontianak', availability: 'on-duty', avatar: 'DF', joinedAt: '2024-01-30', tasksCompleted: 11 },
  { id: 'VOL-010', name: 'Kartika Wulandari', phone: '081123456789', email: 'kartika@relawan.id', skills: ['IT/Komunikasi', 'SAR'], location: 'Manado', availability: 'available', avatar: 'KW', joinedAt: '2024-03-20', tasksCompleted: 3 },
  { id: 'VOL-011', name: 'Agus Setiawan', phone: '082234567890', email: 'agus@relawan.id', skills: ['Dapur Umum', 'Lainnya'], location: 'Samarinda', availability: 'available', avatar: 'AS', joinedAt: '2024-04-01', tasksCompleted: 2 },
  { id: 'VOL-012', name: 'Putri Handayani', phone: '083345678901', email: 'putri@relawan.id', skills: ['Medis/Dokter', 'Logistik'], location: 'Denpasar', availability: 'available', avatar: 'PH', joinedAt: '2024-04-10', tasksCompleted: 1 },
];

export const mockDonations = [
  { id: 'DON-001', donorName: 'PT Astra International', contact: 'csr@astra.co.id', type: 'Uang Tunai', amount: 'Rp 50.000.000', targetReport: 'RPT-001', status: 'Diterima', date: '2024-05-10', proofUrl: '#' },
  { id: 'DON-002', donorName: 'Keluarga Budiman', contact: '081299887766', type: 'Barang', amount: '500 paket sembako', targetReport: 'RPT-007', status: 'Diterima', date: '2024-05-09', proofUrl: '#' },
  { id: 'DON-003', donorName: 'Yayasan Peduli Alam', contact: 'info@ypa.org', type: 'Uang Tunai', amount: 'Rp 25.000.000', targetReport: 'RPT-004', status: 'Pending', date: '2024-05-11', proofUrl: '#' },
  { id: 'DON-004', donorName: 'Komunitas Biker Jakarta', contact: 'biker.jkt@gmail.com', type: 'Jasa', amount: 'Pengiriman logistik', targetReport: 'RPT-003', status: 'Diterima', date: '2024-05-08', proofUrl: '#' },
  { id: 'DON-005', donorName: 'Anonim', contact: '-', type: 'Uang Tunai', amount: 'Rp 5.000.000', targetReport: 'RPT-002', status: 'Diterima', date: '2024-05-11', proofUrl: '#' },
  { id: 'DON-006', donorName: 'Dinas Sosial DKI Jakarta', contact: 'dinsos@jakarta.go.id', type: 'Barang', amount: '200 tenda darurat', targetReport: 'RPT-010', status: 'Diterima', date: '2024-05-07', proofUrl: '#' },
  { id: 'DON-007', donorName: 'Harfan Nugroho', contact: '085712345678', type: 'Uang Tunai', amount: 'Rp 2.500.000', targetReport: 'RPT-020', status: 'Pending', date: '2024-05-11', proofUrl: '#' },
  { id: 'DON-008', donorName: 'RS Siloam Group', contact: 'csr@siloam.id', type: 'Jasa', amount: 'Tim medis 10 dokter', targetReport: 'RPT-020', status: 'Diterima', date: '2024-05-10', proofUrl: '#' },
];

export const mockLogistics = [
  { id: 'LOG-001', item: 'Beras', category: 'Makanan', quantity: 1500, unit: 'kg', warehouse: 'Gudang Palu', lowStock: false, updatedAt: '2024-05-11T08:00:00Z' },
  { id: 'LOG-002', item: 'Air Mineral Botol', category: 'Air Bersih', quantity: 200, unit: 'dus', warehouse: 'Gudang Jakarta', lowStock: true, updatedAt: '2024-05-11T09:30:00Z' },
  { id: 'LOG-003', item: 'Obat P3K', category: 'Obat-obatan', quantity: 80, unit: 'paket', warehouse: 'Gudang Makassar', lowStock: true, updatedAt: '2024-05-10T15:00:00Z' },
  { id: 'LOG-004', item: 'Tenda Darurat', category: 'Tempat Evakuasi', quantity: 350, unit: 'unit', warehouse: 'Gudang Surabaya', lowStock: false, updatedAt: '2024-05-11T07:00:00Z' },
  { id: 'LOG-005', item: 'Pakaian Layak Pakai', category: 'Pakaian', quantity: 2500, unit: 'pcs', warehouse: 'Gudang Bandung', lowStock: false, updatedAt: '2024-05-09T11:00:00Z' },
  { id: 'LOG-006', item: 'Genset 5000W', category: 'Listrik', quantity: 12, unit: 'unit', warehouse: 'Gudang Medan', lowStock: true, updatedAt: '2024-05-11T06:00:00Z' },
];

export const mockChartData = {
  reportsByProvince: [
    { province: 'Sulawesi Tengah', count: 3 },
    { province: 'NTT', count: 2 },
    { province: 'Jawa Tengah', count: 2 },
    { province: 'NTB', count: 1 },
    { province: 'Aceh', count: 1 },
    { province: 'Jawa Barat', count: 1 },
    { province: 'Sulawesi Barat', count: 1 },
    { province: 'Banten', count: 1 },
  ],
  reportsByDay: [
    { day: '5 Mei', count: 2 },
    { day: '6 Mei', count: 3 },
    { day: '7 Mei', count: 1 },
    { day: '8 Mei', count: 4 },
    { day: '9 Mei', count: 2 },
    { day: '10 Mei', count: 5 },
    { day: '11 Mei', count: 6 },
  ],
};

export const mockPosko = [
  { id: 'PSK-001', name: 'Posko Induk Palu', lat: -0.9, lng: 119.87, type: 'posko' },
  { id: 'PSK-002', name: 'Posko Lombok Utara', lat: -8.35, lng: 116.2, type: 'posko' },
  { id: 'PSK-003', name: 'Posko Aceh', lat: 5.52, lng: 95.3, type: 'posko' },
  { id: 'PSK-004', name: 'Posko NTT', lat: -8.2, lng: 122.9, type: 'posko' },
];

export const mockGudang = [
  { id: 'GDG-001', name: 'Gudang Logistik Palu', lat: -0.88, lng: 119.85, type: 'gudang' },
  { id: 'GDG-002', name: 'Gudang Surabaya', lat: -7.25, lng: 112.74, type: 'gudang' },
  { id: 'GDG-003', name: 'Gudang Jakarta', lat: -6.2, lng: 106.8, type: 'gudang' },
];

export const mockEvakuasiRoutes = [
  { id: 'EVK-001', coords: [[-0.9, 119.87], [-0.85, 119.9], [-0.8, 119.95]], name: 'Jalur Evakuasi Palu Barat' },
  { id: 'EVK-002', coords: [[-8.35, 116.18], [-8.32, 116.12], [-8.28, 116.08]], name: 'Jalur Evakuasi Lombok' },
];
