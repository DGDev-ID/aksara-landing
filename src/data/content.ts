export interface Service {
  id: number
  icon: string
  title: string
  description: string
  features: string[]
  category: string
  popular?: boolean
}

export const services: Service[] = [
  {
    id: 1,
    icon: 'Share2',
    title: 'Social Media Management',
    description:
      'Kelola dan kembangkan akun media sosial bisnis Anda secara profesional. Konten kreatif, engagement aktif, dan strategi terukur.',
    features: ['Content Planning & Scheduling', 'Community Management', 'Analytics & Reporting', 'Story & Reels Creation'],
    category: 'Digital',
    popular: true,
  },
  {
    id: 2,
    icon: 'Target',
    title: 'Meta Ads (Facebook & Instagram)',
    description:
      'Iklan berbayar yang tepat sasaran di platform Meta. Jangkau audiens yang relevan dan maksimalkan ROI campaign Anda.',
    features: ['Audience Targeting', 'A/B Testing', 'Retargeting Campaign', 'Performance Optimization'],
    category: 'Advertising',
    popular: true,
  },
  {
    id: 3,
    icon: 'Search',
    title: 'Google Ads (SEM)',
    description:
      'Tampil di halaman pertama Google saat calon pelanggan mencari produk/jasa Anda. Search, Display, dan YouTube Ads.',
    features: ['Keyword Research', 'Search Network Ads', 'Display Ads', 'YouTube Advertising'],
    category: 'Advertising',
  },
  {
    id: 4,
    icon: 'Palette',
    title: 'Branding & Desain',
    description:
      'Bangun identitas brand yang kuat dan berkesan. Dari logo, brand guidelines, hingga seluruh materi visual bisnis Anda.',
    features: ['Logo Design', 'Brand Identity System', 'Visual Guidelines', 'Desain Materi Promosi'],
    category: 'Creative',
    popular: true,
  },
  {
    id: 5,
    icon: 'Globe',
    title: 'Website Development',
    description:
      'Website profesional yang cepat, responsif, dan SEO-friendly. Company profile, e-commerce, hingga platform custom.',
    features: ['UI/UX Design', 'Frontend & Backend Dev', 'CMS Integration', 'Maintenance & Support'],
    category: 'Digital',
  },
  {
    id: 6,
    icon: 'TrendingUp',
    title: 'SEO (Search Engine Optimization)',
    description:
      'Tingkatkan peringkat website Anda di Google secara organik. Traffic berkualitas yang konsisten dan berkelanjutan.',
    features: ['Technical SEO Audit', 'On-Page Optimization', 'Link Building', 'Content Strategy'],
    category: 'Digital',
  },
  {
    id: 7,
    icon: 'Video',
    title: 'Content Creator',
    description:
      'Produksi konten berkualitas tinggi: foto produk, video profil perusahaan, short video, dan konten viral kreatif.',
    features: ['Photography Produk', 'Video Production', 'Short Form Content', 'Motion Graphics'],
    category: 'Creative',
  },
  {
    id: 8,
    icon: 'MapPin',
    title: 'Billboard & Outdoor Advertising',
    description:
      'Media luar ruang strategis di lokasi-lokasi premium. Billboard, baliho, neon box di kota-kota besar Jawa Tengah & DIY.',
    features: ['Konsultasi Lokasi', 'Desain Kreatif', 'Pemasangan Profesional', 'Monitoring Kondisi'],
    category: 'Outdoor',
    popular: true,
  },
  {
    id: 9,
    icon: 'Monitor',
    title: 'Videotron Advertising',
    description:
      'Tayangkan iklan digital dinamis di layar videotron strategis. Format video full color dengan visibilitas maksimal.',
    features: ['Lokasi Premium', 'Slot Tayang Fleksibel', 'Produksi Konten Video', 'Laporan Tayang'],
    category: 'Outdoor',
  },
]

export interface PortfolioItem {
  id: number
  title: string
  client: string
  category: 'Website' | 'Branding' | 'Social Media' | 'Advertising' | 'Outdoor Media'
  description: string
  tags: string[]
  image: string
  year: number
}

export const portfolioItems: PortfolioItem[] = [
  { id: 1, title: 'Website Company Profile PT Maju Bersama', client: 'PT Maju Bersama', category: 'Website', description: 'Website perusahaan manufaktur modern dengan animasi smooth dan CMS terintegrasi.', tags: ['Vue.js', 'Tailwind', 'Laravel'], image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80', year: 2025 },
  { id: 2, title: 'Rebranding Kopi Nusantara', client: 'Kopi Nusantara', category: 'Branding', description: 'Transformasi brand kopi lokal menjadi premium modern dengan identitas visual baru.', tags: ['Logo Design', 'Brand Identity', 'Packaging'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', year: 2025 },
  { id: 3, title: 'Meta Ads Hotel Alam Asri', client: 'Hotel Alam Asri', category: 'Advertising', description: 'Campaign iklan Meta Ads dengan ROAS 4.2x untuk hotel bintang 3 di Yogyakarta.', tags: ['Meta Ads', 'Facebook', 'Instagram'], image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', year: 2024 },
  { id: 4, title: 'Billboard Kampanye Pemilukada', client: 'Tim Sukses A', category: 'Outdoor Media', description: '50+ titik billboard strategis se-Jawa Tengah untuk kampanye Pemilukada 2024.', tags: ['Billboard', 'Outdoor', 'Design'], image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', year: 2024 },
  { id: 5, title: 'Social Media Manajemen Bakeri Artisan', client: 'Bakeri Artisan', category: 'Social Media', description: 'Pertumbuhan 300% followers Instagram dalam 6 bulan dengan konten daily kreatif.', tags: ['Instagram', 'Content', 'Reels'], image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', year: 2025 },
  { id: 6, title: 'E-Commerce Platform Batik Larasati', client: 'Batik Larasati', category: 'Website', description: 'Platform e-commerce batik dengan fitur custom order, tracking, dan payment gateway.', tags: ['Vue.js', 'Node.js', 'Midtrans'], image: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=600&q=80', year: 2025 },
  { id: 7, title: 'Branding Klinik Sehat Prima', client: 'Klinik Sehat Prima', category: 'Branding', description: 'Identitas visual klinik kesehatan: logo, seragam, signage, dan materi digital.', tags: ['Logo', 'Medical', 'Signage'], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80', year: 2024 },
  { id: 8, title: 'Videotron Promosi Festival Kuliner', client: 'Pemkot Semarang', category: 'Outdoor Media', description: 'Tayangan videotron untuk event Festival Kuliner Nusantara di 5 titik kota Semarang.', tags: ['Videotron', 'Event', 'Motion Design'], image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', year: 2025 },
  { id: 9, title: 'Google Ads Properti Grand Residence', client: 'Grand Residence', category: 'Advertising', description: 'Lead generation properti dengan Google Ads, CPC efisien dan konversi tinggi.', tags: ['Google Ads', 'Property', 'SEM'], image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80', year: 2024 },
]

export const testimonials = [
  { id: 1, name: 'Budi Santoso', position: 'CEO, PT Maju Bersama', content: 'Aksara Media Promosi benar-benar mengubah presence digital kami. Website baru kami mendapat pujian banyak klien dan traffic meningkat 250%.', avatar: 'BS', rating: 5 },
  { id: 2, name: 'Rina Wahyuningsih', position: 'Owner, Kopi Nusantara', content: 'Rebranding yang dilakukan tim Aksara sungguh luar biasa. Brand kami kini jauh lebih premium dan dikenal luas di media sosial.', avatar: 'RW', rating: 5 },
  { id: 3, name: 'Hendro Wijaya', position: 'Marketing Manager, Hotel Alam Asri', content: 'ROAS campaign Meta Ads kami mencapai 4.2x! Tim Aksara sangat profesional dan responsif. Recommended!', avatar: 'HW', rating: 5 },
  { id: 4, name: 'Dewi Kartika', position: 'Direktur, Klinik Sehat Prima', content: 'Layanan branding komprehensif dari logo hingga signage. Hasilnya memuaskan dan sesuai visi kami sebagai klinik profesional.', avatar: 'DK', rating: 5 },
]

export const stats = [
  { number: '250+', label: 'Project Selesai' },
  { number: '180+', label: 'Klien Puas' },
  { number: '50+', label: 'Titik Billboard' },
  { number: '8+', label: 'Tahun Pengalaman' },
]

export const teamMembers = [
  { id: 1, name: 'Ahmad Farhan', position: 'CEO & Founder', bio: '10+ tahun pengalaman di industri media dan periklanan Indonesia.', avatar: 'AF' },
  { id: 2, name: 'Sari Dewi', position: 'Creative Director', bio: 'Spesialis branding dan desain visual dengan portofolio internasional.', avatar: 'SD' },
  { id: 3, name: 'Rizky Pratama', position: 'Digital Marketing Lead', bio: 'Performance marketer berpengalaman dengan sertifikasi Google & Meta.', avatar: 'RP' },
  { id: 4, name: 'Anisa Rahmawati', position: 'Web Development Lead', bio: 'Full-stack developer dengan expertise Vue.js, React, dan Laravel.', avatar: 'AR' },
]
