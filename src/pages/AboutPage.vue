<script setup lang="ts">
import { onMounted } from 'vue'
import { Target, Eye, CheckCircle } from 'lucide-vue-next'
import CTASection from '@/components/CTASection.vue'
import { stats, teamMembers } from '@/data/content'

const timeline = [
  {
    year: '2016',
    title: 'Berdiri',
    desc: 'Aksara Media Promosi didirikan di Yogyakarta sebagai agency kreatif lokal.',
  },
  {
    year: '2018',
    title: 'Ekspansi Digital',
    desc: 'Merambah layanan digital marketing: social media, SEO, dan paid ads.',
  },
  {
    year: '2020',
    title: 'Outdoor Network',
    desc: 'Membangun jaringan billboard dan videotron di Jawa Tengah & DIY.',
  },
  {
    year: '2022',
    title: 'Web Development',
    desc: 'Menambahkan divisi pengembangan website dan aplikasi digital.',
  },
  {
    year: '2024',
    title: '180+ Klien',
    desc: 'Melayani lebih dari 180 klien dari berbagai sektor industri.',
  },
  {
    year: '2025',
    title: 'Platform Digital',
    desc: 'Meluncurkan platform digital terintegrasi untuk pemesanan media.',
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el))
})
</script>

<template>
  <div>
    <!-- Page Hero -->
    <section class="gradient-bg pt-32 pb-20 relative overflow-hidden">
      <!-- Background image: professional team/office -->
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-luminosity pointer-events-none select-none"
      />
      <div
        class="absolute inset-0 pointer-events-none"
        style="
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        "
      ></div>
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <span class="text-blue-200 font-bold text-sm uppercase tracking-widest">Tentang Kami</span>
        <h1 class="text-4xl md:text-5xl font-black text-white mt-3 mb-5">
          Mengenal Aksara Media Promosi
        </h1>
        <p class="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
          Lebih dari sekadar agency — kami adalah partner pertumbuhan bisnis Anda yang terpercaya
          sejak 2019.
        </p>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-0.75 bg-white/20"></div>
    </section>

    <!-- Company Intro -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-up">
        <!-- Top: Heading + desc kiri + Stats kanan -->
        <div class="grid lg:grid-cols-2 gap-12 items-start mb-10">
          <div>
            <span class="text-blue-600 font-bold text-sm uppercase tracking-widest"
              >Tentang Kami</span
            >
            <h2 class="text-4xl font-extrabold text-gray-900 mt-2 mb-5">
              Muda, Kreatif, <span class="gradient-text">dan Penuh Energi</span>
            </h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              Berdiri sejak 2019 di Semarang, Aksara Media Promosi hadir sebagai mitra terpercaya
              dalam industri reklame. Kami mengedepankan profesionalisme dan integritas tinggi dalam
              setiap detail pengerjaan. Bagi kami, ketelitian dan ketepatan waktu bukan sekadar
              janji, melainkan standar kualitas untuk memberikan hasil terbaik bagi representasi
              bisnis Anda.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Aksara Media Promosi adalah wadah kolaborasi kreatif yang digerakkan oleh energi muda
              berbakat. Didukung oleh desainer inovatif dan tim lapangan yang kompeten, kami
              berkomitmen mentransformasikan setiap visi konsumen menjadi nyata dengan hasil yang
              presisi dan adaptif terhadap perkembangan tren.
            </p>
          </div>
          <!-- Stats -->
          <div class="grid grid-cols-2 gap-5">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="bg-linear-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 text-center border border-blue-100 card-hover"
            >
              <div class="text-4xl font-black gradient-text mb-2">{{ stat.number }}</div>
              <div class="text-gray-700 font-semibold text-sm">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Bottom: Deskripsi lanjutan 2 kolom -->
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <p class="text-gray-600 leading-relaxed">
              Aksara Media Promosi hadir sebagai mitra strategis solusi periklanan terpadu,
              spesialis dalam layanan <strong>OOH (Out-of-Home)</strong> dan
              <strong>Digital Printing</strong> berkualitas tinggi. Dengan jangkauan luas yang
              mencakup wilayah <strong>Semarang, Jawa Tengah, DIY dan sekitarnya</strong>. Kami
              berkomitmen menghadirkan visibilitas brand yang maksimal melalui eksekusi materi
              promosi yang presisi dan berdampak luas.
            </p>
          </div>
          <div>
            <p class="text-gray-600 leading-relaxed mb-5">
              Ubah audiens menjadi pelanggan dengan visibilitas tanpa batas. Aksara Media Promosi
              menawarkan titik-titik iklan paling strategis dengan
              <strong>high-traffic exposure</strong> yang menjamin <em>brand</em> Anda selalu
              menjadi pusat perhatian melalui jaringan <strong>Billboard</strong> dan
              <strong>Videotron</strong> di titik-titik lokasi premium. Dari kejauhan Billboard
              hingga dinamisnya Videotron, kami memastikan pesan <em>brand</em> Anda tersampaikan
              secara masif dan meninggalkan impresi mendalam bagi setiap mata yang memandang.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Kami tidak hanya mencetak ide, kami menghidupkannya. Jelajahi portofolio kami dan
              lihat bagaimana kami mengubah konsep menjadi visual yang mendominasi ruang publik.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section-padding gradient-bg-light">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14 fade-in-up">
          <span class="text-blue-600 font-bold text-sm uppercase tracking-widest"
            >Perjalanan Kami</span
          >
          <h2 class="text-4xl font-extrabold text-gray-900 mt-2">Milestone Aksara</h2>
        </div>
        <div class="relative fade-in-up">
          <!-- Line -->
          <div
            class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2 hidden md:block"
          ></div>
          <div class="space-y-8">
            <div
              v-for="(item, i) in timeline"
              :key="item.year"
              class="relative grid md:grid-cols-2 gap-6 items-center"
            >
              <!-- Year dot -->
              <div
                class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full gradient-bg items-center justify-center text-white font-black text-xs z-10 shadow-lg shadow-blue-500/30"
              >
                {{ item.year }}
              </div>
              <!-- Content -->
              <div :class="i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:col-start-2 md:pl-10'">
                <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm card-hover">
                  <span class="text-blue-600 font-black text-sm md:hidden">{{ item.year }} — </span>
                  <h4 class="font-bold text-gray-900 mb-1 inline md:block">{{ item.title }}</h4>
                  <p class="text-gray-500 text-sm mt-1">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Visi Misi -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-6 fade-in-up">
          <div class="gradient-bg rounded-2xl p-8 text-white">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <Eye :size="24" class="text-white" />
            </div>
            <h3 class="text-xl font-bold mb-3">Visi</h3>
            <p class="text-blue-100 leading-relaxed text-sm">
              "Menjadi katalisator utama dalam transformasi ide kreatif menjadi dampak nyata yang
              menghubungkan brand dengan audiens secara bermakna di era digital."
            </p>
          </div>
          <div class="bg-gray-950 rounded-2xl p-8 text-white">
            <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <Target :size="24" class="text-white" />
            </div>
            <h3 class="text-xl font-bold mb-3">Misi</h3>
            <ul class="text-gray-300 text-sm space-y-2">
              <li class="flex items-start gap-2">
                <CheckCircle :size="14" class="text-blue-400 mt-0.5 shrink-0" />
                Menciptakan strategi promosi yang unik, relevan, dan <em>out-of-the-box</em>.
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle :size="14" class="text-blue-400 mt-0.5 shrink-0" />
                Memanfaatkan data dan teknologi terkini untuk mengoptimalkan jangkauan kampanye dan
                nilai jual brand.
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle :size="14" class="text-blue-400 mt-0.5 shrink-0" />
                Memberikan layanan konsultasi pemasaran yang berbasis data dan riset pasar mendalam.
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle :size="14" class="text-blue-400 mt-0.5 shrink-0" />
                Memastikan setiap investasi iklan klien menghasilkan dampak pertumbuhan bisnis yang
                signifikan.
              </li>
              <li class="flex items-start gap-2">
                <CheckCircle :size="14" class="text-blue-400 mt-0.5 shrink-0" />
                Mengutamakan kualitas produksi dan ketepatan waktu dalam setiap proyek.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section-padding gradient-bg-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 fade-in-up">
          <span class="text-blue-600 font-bold text-sm uppercase tracking-widest">Tim Kami</span>
          <h2 class="text-4xl font-extrabold text-gray-900 mt-2">Orang-Orang di Balik Aksara</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-up">
          <div
            v-for="member in teamMembers"
            :key="member.id"
            class="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm card-hover"
          >
            <div
              class="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 text-white font-black text-xl shadow-lg shadow-blue-500/30"
            >
              {{ member.avatar }}
            </div>
            <h4 class="font-bold text-gray-900 mb-1">{{ member.name }}</h4>
            <p class="text-blue-600 text-sm font-semibold mb-3">{{ member.position }}</p>
            <p class="text-gray-500 text-xs leading-relaxed">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </div>
</template>
