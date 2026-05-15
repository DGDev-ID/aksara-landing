<script setup lang="ts">
import { onMounted } from 'vue'
import {
  ArrowRight,
  Play,
  MapPin,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  Star,
  ChevronRight,
} from 'lucide-vue-next'
import CTASection from '@/components/CTASection.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import HeroCanvas from '@/components/HeroCanvas.vue'
import { services, stats, testimonials } from '@/data/content'

const highlightServices = services.slice(0, 6)

const whyUs = [
  {
    icon: 'Award',
    title: 'Berpengalaman 8+ Tahun',
    desc: 'Portofolio luas di berbagai industri, dari UMKM hingga korporasi besar.',
  },
  {
    icon: 'TrendingUp',
    title: 'Hasil Terukur & Transparan',
    desc: 'Setiap campaign dimonitor dengan data real-time dan laporan berkala.',
  },
  {
    icon: 'Users',
    title: 'Tim Profesional & Kreatif',
    desc: 'Spesialis berpengalaman di bidang digital marketing, desain, dan outdoor media.',
  },
  {
    icon: 'MapPin',
    title: '50+ Titik Billboard Premium',
    desc: 'Jaringan media outdoor terluas di Jawa Tengah dan DIY.',
  },
]

const clients = [
  { name: 'AQUA', logo: '/logo-klien/AQUA.svg' },
  { name: 'BNI', logo: '/logo-klien/BNI.svg' },
  { name: 'BRI', logo: '/logo-klien/BRI.svg' },
  { name: 'Ciputra', logo: '/logo-klien/CIPUTRA.svg' },
  { name: 'Esse', logo: '/logo-klien/ESSE.svg' },
  { name: 'G-Media', logo: '/logo-klien/GMEDIA.svg' },
  { name: 'Indofood', logo: '/logo-klien/INDOFOOD.svg' },
  { name: 'JAPFA', logo: '/logo-klien/JAPFA.svg' },
  { name: 'Mandiri', logo: '/logo-klien/MANDIRI.svg' },
  { name: 'Olympic', logo: '/logo-klien/OLYMPIC.svg' },
  { name: 'Pegadaian', logo: '/logo-klien/PEGADAIAN.svg' },
  { name: 'Traveloka', logo: '/logo-klien/TRAVELOKA.svg' },
  { name: 'Undip', logo: '/logo-klien/UNDIP.svg' },
]

// Intersection Observer for fade-in
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 },
  )
  document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el))
})
</script>

<template>
  <div>
    <!-- ===== HERO ===== -->
    <section
      class="relative min-h-screen flex items-center overflow-hidden"
      style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #2563eb 100%)"
    >
      <!-- Background SVG utama -->
      <img
        src="/bg-utama.svg"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style="z-index: 0; opacity: 0.55; mix-blend-mode: luminosity"
      />

      <!-- Blue gradient overlay agar warna biru tetap terasa tapi SVG masih terlihat -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="
          background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.72) 0%,
            rgba(30, 58, 138, 0.55) 40%,
            rgba(37, 99, 235, 0.45) 100%
          );
          z-index: 1;
        "
      ></div>

      <!-- Three.js 3D Canvas -->
      <HeroCanvas />

      <!-- Radial vignette over canvas so text stays readable -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="
          background: radial-gradient(
            ellipse 80% 80% at 50% 50%,
            transparent 30%,
            rgba(15, 23, 42, 0.5) 100%
          );
          z-index: 2;
        "
      ></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20" style="z-index: 3">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left content -->
          <div>
            <div
              class="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 text-sm font-semibold px-4 py-2 rounded-full border border-blue-400/30 mb-6"
            >
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Agency Media Promosi #1 Jawa Tengah & DIY
            </div>

            <h1 class="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Promosikan Bisnis Anda
              <span class="gradient-text-white"> Lebih Jauh, </span>
              Lebih Kuat.
            </h1>

            <p class="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg">
              Platform media promosi lengkap — dari digital marketing, branding, website, hingga
              billboard & videotron outdoor. Satu partner, semua solusi promosi bisnis Anda.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 mb-10">
              <RouterLink
                to="/contact"
                class="btn-white text-base px-7 py-3.5 w-full sm:w-auto justify-center"
              >
                <ArrowRight :size="20" />
                Mulai Konsultasi Gratis
              </RouterLink>
              <RouterLink
                to="/portfolio"
                class="flex items-center justify-center gap-2 text-white font-semibold text-base px-7 py-3.5 rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                <Play :size="18" />
                Lihat Portfolio
              </RouterLink>
            </div>

            <!-- Stats row -->
            <div class="grid grid-cols-4 gap-4">
              <div v-for="stat in stats" :key="stat.label">
                <div class="text-2xl sm:text-3xl font-black text-white">{{ stat.number }}</div>
                <div class="text-blue-300 text-xs sm:text-sm font-medium">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Right — Feature Cards -->
          <div class="hidden lg:block relative">
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(item, i) in whyUs"
                :key="item.title"
                class="glass rounded-2xl p-5 hover:bg-white/90 transition-all cursor-default"
                :class="i % 2 === 1 ? 'mt-6' : ''"
              >
                <div
                  class="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-3 shadow-lg shadow-blue-500/30"
                >
                  <component
                    :is="
                      item.icon === 'Award'
                        ? Award
                        : item.icon === 'TrendingUp'
                          ? TrendingUp
                          : item.icon === 'Users'
                            ? Users
                            : MapPin
                    "
                    :size="20"
                    class="text-white"
                  />
                </div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">{{ item.title }}</h4>
                <p class="text-gray-500 text-xs leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Straight bottom border -->
      <div class="absolute bottom-0 left-0 right-0 h-0.75 bg-white/20"></div>
    </section>

    <!-- ===== LAYANAN HIGHLIGHT ===== -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14 fade-in-up">
          <span class="text-blue-600 font-bold text-sm uppercase tracking-widest"
            >Layanan Kami</span
          >
          <h2 class="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Solusi Promosi <span class="gradient-text">Lengkap & Terintegrasi</span>
          </h2>
          <p class="text-gray-500 text-lg">
            Dari media digital hingga outdoor, kami siap menjadi partner promosi terpercaya bisnis
            Anda.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up">
          <ServiceCard v-for="service in highlightServices" :key="service.id" :service="service" />
        </div>

        <div class="text-center mt-10 fade-in-up">
          <RouterLink to="/services" class="btn-primary text-base px-8 py-3.5">
            <ArrowRight :size="20" />
            Lihat Semua Layanan
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ===== WHY US ===== -->
    <section class="section-padding gradient-bg-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="fade-in-up">
            <span class="text-blue-600 font-bold text-sm uppercase tracking-widest"
              >Mengapa Kami</span
            >
            <h2 class="text-4xl font-extrabold text-gray-900 mt-2 mb-6">
              Partner Promosi yang Anda <span class="gradient-text">Bisa Percaya</span>
            </h2>
            <p class="text-gray-500 text-lg mb-8">
              Dengan pengalaman lebih dari 8 tahun dan ratusan project sukses, kami memahami apa
              yang dibutuhkan bisnis Anda untuk berkembang.
            </p>
            <div class="space-y-4">
              <div
                v-for="item in whyUs"
                :key="item.title"
                class="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div
                  class="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20"
                >
                  <CheckCircle :size="20" class="text-white" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">{{ item.title }}</h4>
                  <p class="text-gray-500 text-sm">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Testimonials -->
          <div class="fade-in-up space-y-4">
            <h3 class="font-bold text-gray-900 text-xl mb-6">Apa Kata Klien Kami</h3>
            <div
              v-for="t in testimonials"
              :key="t.id"
              class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 card-hover"
            >
              <div class="flex gap-1 mb-3">
                <Star
                  v-for="n in t.rating"
                  :key="n"
                  :size="14"
                  class="text-amber-400 fill-amber-400"
                />
              </div>
              <p class="text-gray-700 text-sm leading-relaxed mb-4 italic">"{{ t.content }}"</p>
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xs shrink-0"
                >
                  {{ t.avatar }}
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm">{{ t.name }}</p>
                  <p class="text-gray-400 text-xs">{{ t.position }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== BILLBOARD PREVIEW ===== -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center fade-in-up">
          <div>
            <span class="text-blue-600 font-bold text-sm uppercase tracking-widest"
              >Media Outdoor</span
            >
            <h2 class="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              50+ Titik <span class="gradient-text">Billboard Strategis</span>
            </h2>
            <p class="text-gray-500 text-lg mb-6">
              Jangkau jutaan calon pelanggan setiap harinya melalui jaringan media outdoor premium
              kami di seluruh Jawa Tengah dan DIY.
            </p>
            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="bg-blue-50 rounded-xl p-4 text-center">
                <p class="text-2xl font-black text-blue-600">50+</p>
                <p class="text-gray-600 text-sm">Titik Billboard</p>
              </div>
              <div class="bg-blue-50 rounded-xl p-4 text-center">
                <p class="text-2xl font-black text-blue-600">5 Kota</p>
                <p class="text-gray-600 text-sm">Coverage Area</p>
              </div>
              <div class="bg-blue-50 rounded-xl p-4 text-center">
                <p class="text-2xl font-black text-blue-600">5 Jenis</p>
                <p class="text-gray-600 text-sm">Tipe Media</p>
              </div>
              <div class="bg-blue-50 rounded-xl p-4 text-center">
                <p class="text-2xl font-black text-blue-600">Real-time</p>
                <p class="text-gray-600 text-sm">Status Update</p>
              </div>
            </div>
            <RouterLink to="/billboards" class="btn-primary text-base px-7 py-3.5">
              <MapPin :size="20" />
              Lihat Interactive Map
            </RouterLink>
          </div>
          <div class="relative">
            <div
              class="aspect-video rounded-2xl gradient-bg flex items-center justify-center relative overflow-hidden shadow-2xl shadow-blue-900/20"
            >
              <div
                class="absolute inset-0 opacity-20"
                style="
                  background: repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 20px,
                    rgba(255, 255, 255, 0.05) 20px,
                    rgba(255, 255, 255, 0.05) 40px
                  );
                "
              ></div>
              <div class="text-center text-white relative">
                <MapPin :size="48" class="mx-auto mb-3 opacity-80" />
                <p class="font-bold text-xl">Interactive Billboard Map</p>
                <p class="text-blue-200 text-sm mt-1">Klik untuk melihat peta interaktif</p>
                <RouterLink to="/billboards" class="mt-4 inline-flex btn-white text-sm px-5 py-2.5">
                  Buka Peta
                  <ChevronRight :size="16" />
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CLIENT LOGOS ===== -->
    <section class="py-14 bg-gray-50 border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-400 text-sm font-semibold uppercase tracking-widest mb-8">
          Dipercaya oleh Berbagai Brand Ternama
        </p>
        <div class="flex flex-wrap items-center justify-center gap-6">
          <div
            v-for="client in clients"
            :key="client.name"
            class="bg-white px-5 py-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-default flex items-center justify-center"
            style="min-width: 110px; height: 64px"
          >
            <img
              :src="client.logo"
              :alt="client.name"
              class="max-h-8 max-w-24 object-contain transition-all duration-300 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <CTASection />
  </div>
</template>
