<script setup lang="ts">
import { ArrowRight, Phone } from 'lucide-vue-next'

defineProps<{
  title?: string
  subtitle?: string
  buttonText?: string
  variant?: 'blue' | 'dark'
}>()
</script>

<template>
  <section class="section-padding">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        :class="[
          'relative rounded-3xl overflow-hidden p-12 text-center',
          variant === 'dark' ? 'bg-gray-950' : 'gradient-bg',
        ]"
      >
        <!-- Background image overlay (advertising/city theme) -->
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=80"
          alt=""
          aria-hidden="true"
          class="absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-luminosity pointer-events-none select-none"
        />

        <!-- Dot grid pattern overlay -->
        <div
          class="absolute inset-0 pointer-events-none"
          style="
            background-image: radial-gradient(
              circle,
              rgba(255, 255, 255, 0.07) 1px,
              transparent 1px
            );
            background-size: 28px 28px;
          "
        ></div>

        <!-- Glow blobs -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          <div
            class="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"
          ></div>
        </div>

        <div class="relative">
          <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            {{ title ?? 'Siap Meningkatkan Bisnis Anda?' }}
          </h2>
          <p class="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            {{
              subtitle ??
              'Konsultasikan kebutuhan media promosi Anda bersama tim ahli kami. Gratis dan tanpa komitmen.'
            }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Aksara%20Media%2C%20saya%20ingin%20konsultasi"
              target="_blank"
              class="btn-white"
            >
              <Phone :size="18" />
              {{ buttonText ?? 'Konsultasi via WhatsApp' }}
            </a>
            <RouterLink to="/services" class="btn-outline-white">
              <ArrowRight :size="18" />
              Lihat Layanan Kami
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
