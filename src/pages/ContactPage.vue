<script setup lang="ts">
import { onMounted } from 'vue'
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from 'lucide-vue-next'
import ContactForm from '@/components/ContactForm.vue'

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el))
})

const contactInfo = [
  {
    icon: 'MapPin',
    label: 'Alamat Kantor',
    value:
      'Gang kelapa gading, RT.02/RW.01, Wates, Kec. Ngaliyan, Kota Semarang, Jawa Tengah 50188',
    link: 'https://maps.app.goo.gl/aksara',
    linkLabel: 'Lihat di Maps',
  },
  {
    icon: 'Phone',
    label: 'WhatsApp / Telepon',
    value: '+62 898-8758-080',
    link: 'https://wa.me/628988758080',
    linkLabel: 'Chat WhatsApp',
  },
  {
    icon: 'Mail',
    label: 'Email',
    value: 'hello@aksaramedia.id',
    link: 'mailto:hello@aksaramedia.id',
    linkLabel: 'Kirim Email',
  },
  {
    icon: 'Clock',
    label: 'Jam Operasional',
    value: 'Senin – Jumat: 08.00 – 17.00 WIB\nSabtu: 08.00 – 13.00 WIB',
    link: null,
    linkLabel: null,
  },
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Page Header -->
    <section class="gradient-bg pt-28 pb-16 relative overflow-hidden">
      <!-- Background image: communication/contact -->
      <img
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80"
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
        <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
        <div
          class="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"
        ></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative fade-in-up visible">
        <div
          class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white mb-5"
        >
          <MessageCircle :size="14" class="text-blue-300" />
          Siap Membantu Anda
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          Hubungi <span class="gradient-text-white">Kami</span>
        </h1>
        <p class="text-blue-100 text-lg max-w-xl mx-auto">
          Konsultasikan kebutuhan media promosi Anda bersama tim ahli kami. Kami siap memberikan
          solusi terbaik untuk bisnis Anda.
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <!-- Left: Info & Map -->
          <div class="lg:col-span-2 space-y-6">
            <!-- WhatsApp CTA -->
            <div class="fade-in-up visible bg-green-50 border border-green-200 rounded-2xl p-6">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center">
                  <MessageCircle :size="22" class="text-white" />
                </div>
                <div>
                  <div class="font-bold text-gray-900">Chat WhatsApp</div>
                  <div class="text-xs text-green-600 font-medium">Respon cepat, online 24/7</div>
                </div>
              </div>
              <p class="text-gray-600 text-sm mb-4">
                Konsultasi langsung dengan tim kami via WhatsApp. Biasanya kami membalas dalam
                hitungan menit.
              </p>
              <a
                href="https://wa.me/628988758080?text=Halo%20Aksara%20Media%2C%20saya%20ingin%20konsultasi%20promosi%20bisnis%20saya"
                target="_blank"
                class="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 text-sm"
              >
                <MessageCircle :size="18" />
                Mulai Chat WhatsApp
              </a>
            </div>

            <!-- Contact Info Cards -->
            <div class="space-y-4 fade-in-up visible">
              <div
                v-for="info in contactInfo"
                :key="info.label"
                class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0"
                  >
                    <MapPin v-if="info.icon === 'MapPin'" :size="18" class="text-white" />
                    <Phone v-else-if="info.icon === 'Phone'" :size="18" class="text-white" />
                    <Mail v-else-if="info.icon === 'Mail'" :size="18" class="text-white" />
                    <Clock v-else-if="info.icon === 'Clock'" :size="18" class="text-white" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      {{ info.label }}
                    </p>
                    <p class="text-gray-800 text-sm font-medium whitespace-pre-line">
                      {{ info.value }}
                    </p>
                    <a
                      v-if="info.link"
                      :href="info.link"
                      target="_blank"
                      class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-semibold mt-2 group"
                    >
                      {{ info.linkLabel }}
                      <ArrowRight
                        :size="12"
                        class="transition-transform group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Google Maps Embed -->
            <div
              class="fade-in-up visible rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
              style="height: 220px"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.9792969201253!2d110.33533380000002!3d-7.019575099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b0007249dd3%3A0x65866bef7f46b4d1!2sAKSARA%20MEDIA%20PROMOSI!5e1!3m2!1sen!2sid!4v1777612694259!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style="border: 0"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Lokasi Kantor Aksara Media Promosi"
              ></iframe>
            </div>
          </div>

          <!-- Right: Consultation Form -->
          <div class="lg:col-span-3 fade-in-up visible">
            <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div class="mb-7">
                <h2 class="text-2xl font-extrabold text-gray-900 mb-2">Form Konsultasi</h2>
                <p class="text-gray-500 text-sm">
                  Isi formulir berikut dan tim kami akan menghubungi Anda dalam 1x24 jam kerja.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 fade-in-up">
          <h2 class="text-2xl font-extrabold text-gray-900 mb-2">Pertanyaan Umum</h2>
          <p class="text-gray-500 text-sm">Jawaban untuk pertanyaan yang sering kami terima</p>
        </div>
        <div class="space-y-4">
          <details
            v-for="faq in [
              {
                q: 'Berapa lama proses pembuatan website?',
                a: 'Tergantung kompleksitas, umumnya 2–4 minggu untuk company profile standar. E-commerce atau platform khusus bisa memakan waktu lebih lama.',
              },
              {
                q: 'Apakah ada minimum kontrak untuk billboard?',
                a: 'Minimum sewa billboard adalah 1 bulan. Kami menawarkan diskon menarik untuk kontrak 3, 6, atau 12 bulan.',
              },
              {
                q: 'Apakah ada garansi untuk layanan digital marketing?',
                a: 'Kami berkomitmen memberikan laporan berkala dan transparansi penuh. Target dan KPI disepakati bersama di awal kontrak.',
              },
              {
                q: 'Bagaimana cara memulai kerja sama?',
                a: 'Cukup hubungi kami via WhatsApp atau isi form konsultasi. Tim kami akan menjadwalkan meeting untuk memahami kebutuhan bisnis Anda.',
              },
            ]"
            :key="faq.q"
            class="fade-in-up group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
          >
            <summary
              class="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-800 text-sm list-none hover:text-blue-600 transition-colors"
            >
              {{ faq.q }}
              <span class="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div
              class="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3"
            >
              {{ faq.a }}
            </div>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>
