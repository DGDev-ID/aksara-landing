<script setup lang="ts">
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const services = [
  { name: 'Social Media Management', path: '/services' },
  { name: 'Meta & Google Ads', path: '/services' },
  { name: 'Branding & Desain', path: '/services' },
  { name: 'Website Development', path: '/services' },
  { name: 'Billboard Advertising', path: '/services' },
  { name: 'Videotron Advertising', path: '/services' },
]

const quickLinks = [
  { name: 'Tentang Kami', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Lokasi Billboard', path: '/billboards' },
  { name: 'Kontak', path: '/contact' },
]
</script>

<template>
  <footer class="bg-gray-950 text-white">
    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <RouterLink to="/" class="flex items-center gap-2 mb-5">
            <img
              src="/logo-aksara.svg"
              alt="Aksara Media Promosi"
              class="h-10 w-auto object-contain"
            />
          </RouterLink>
          <p class="text-gray-400 text-sm leading-relaxed mb-5">
            Agency periklanan dan digital marketing terpercaya di Jawa Tengah & DIY. Kami hadir
            untuk mewujudkan visi promosi bisnis Anda.
          </p>
          <div class="flex gap-3">
            <a
              href="#"
              class="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram :size="16" />
            </a>
            <a
              href="#"
              class="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook :size="16" />
            </a>
            <a
              href="#"
              class="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all duration-300"
              aria-label="Youtube"
            >
              <Youtube :size="16" />
            </a>
          </div>
        </div>

        <!-- Layanan -->
        <div>
          <h4 class="font-bold text-white mb-5 text-sm uppercase tracking-wider">Layanan Kami</h4>
          <ul class="space-y-3">
            <li v-for="service in services" :key="service.name">
              <RouterLink
                :to="service.path"
                class="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2 group"
              >
                <ArrowRight
                  :size="12"
                  class="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0"
                />
                {{ service.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-bold text-white mb-5 text-sm uppercase tracking-wider">Navigasi</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.name">
              <RouterLink
                :to="link.path"
                class="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2 group"
              >
                <ArrowRight
                  :size="12"
                  class="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0"
                />
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-bold text-white mb-5 text-sm uppercase tracking-wider">Hubungi Kami</h4>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div
                class="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5"
              >
                <MapPin :size="14" class="text-blue-400" />
              </div>
              <p class="text-gray-400 text-sm leading-relaxed">
                Gang kelapa gading, RT.02/RW.01, Wates, Kec. Ngaliyan, Kota Semarang, Jawa Tengah
                50188
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0"
              >
                <Phone :size="14" class="text-blue-400" />
              </div>
              <a
                href="tel:+628988758080"
                class="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                +62 898-8758-080
              </a>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0"
              >
                <Mail :size="14" class="text-blue-400" />
              </div>
              <a
                href="mailto:hello@aksaramedia.id"
                class="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                hello@aksaramedia.id
              </a>
            </div>
          </div>

          <div class="mt-6 p-4 rounded-xl bg-blue-600/10 border border-blue-600/20">
            <p class="text-xs text-blue-300 font-semibold mb-2">Jam Operasional</p>
            <p class="text-gray-400 text-xs">Senin – Jumat: 08.00 – 17.00</p>
            <p class="text-gray-400 text-xs">Sabtu: 08.00 – 13.00</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/5">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p class="text-gray-500 text-xs">
          © {{ currentYear }} Aksara Media Promosi. All rights reserved.
        </p>
        <p class="text-gray-500 text-xs">Dibuat dengan ❤️ untuk kemajuan bisnis Indonesia</p>
      </div>
    </div>
  </footer>
</template>
