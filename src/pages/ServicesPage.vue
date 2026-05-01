<script setup lang="ts">
import { onMounted } from 'vue'
import CTASection from '@/components/CTASection.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import { services } from '@/data/content'

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
    <!-- Hero -->
    <section class="gradient-bg pt-32 pb-20 relative overflow-hidden">
      <!-- Background image: digital marketing/advertising -->
      <img
        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=80"
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
        <span class="text-blue-200 font-bold text-sm uppercase tracking-widest">Layanan Kami</span>
        <h1 class="text-4xl md:text-5xl font-black text-white mt-3 mb-5">
          Semua Solusi Promosi <br class="hidden md:block" />dalam Satu Platform
        </h1>
        <p class="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
          9 layanan terintegrasi untuk memastikan brand Anda hadir di setiap touchpoint — online
          maupun offline.
        </p>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-0.75 bg-white/20"></div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up">
          <ServiceCard v-for="service in services" :key="service.id" :service="service" />
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section-padding gradient-bg-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14 fade-in-up">
          <span class="text-blue-600 font-bold text-sm uppercase tracking-widest"
            >Cara Kerja Kami</span
          >
          <h2 class="text-4xl font-extrabold text-gray-900 mt-2">
            Proses Sederhana, Hasil Maksimal
          </h2>
        </div>
        <div class="grid md:grid-cols-4 gap-6 fade-in-up">
          <div
            v-for="(step, i) in ['Konsultasi', 'Strategi', 'Eksekusi', 'Evaluasi']"
            :key="step"
            class="text-center relative"
          >
            <div
              class="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 text-white font-black text-xl shadow-lg shadow-blue-500/30"
            >
              {{ i + 1 }}
            </div>
            <div
              v-if="i < 3"
              class="hidden md:block absolute top-8 left-3/4 w-1/2 h-0.5 bg-blue-200"
            ></div>
            <h4 class="font-bold text-gray-900 mb-2">{{ step }}</h4>
            <p class="text-gray-500 text-sm">
              {{
                [
                  'Diskusi mendalam tentang kebutuhan dan target bisnis Anda',
                  'Merancang strategi yang tepat sesuai anggaran dan tujuan',
                  'Implementasi kreatif dengan standar kualitas premium',
                  'Monitoring hasil dan optimasi berkelanjutan',
                ][i]
              }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </div>
</template>
