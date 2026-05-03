<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { Instagram, Facebook, Youtube } from 'lucide-vue-next'

const socials = [
  {
    label: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/aksaramediapromosi',
    hover: 'hover:bg-gradient-to-b hover:from-purple-500 hover:to-pink-500',
  },
  {
    label: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com/aksaramediapromosi',
    hover: 'hover:bg-blue-600',
  },
  {
    label: 'YouTube',
    icon: Youtube,
    href: 'https://youtube.com/@aksaramediapromosi',
    hover: 'hover:bg-red-600',
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <AppNavbar />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />

    <!-- Sticky Social Media Bar -->
    <div
      class="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2"
    >
      <div class="w-px h-10 bg-gray-300/60"></div>
      <a
        v-for="s in socials"
        :key="s.label"
        :href="s.href"
        :aria-label="s.label"
        target="_blank"
        rel="noopener noreferrer"
        :class="[
          'w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 shadow-sm',
          'transition-all duration-300 hover:text-white hover:scale-110 hover:shadow-md hover:border-transparent',
          s.hover,
        ]"
      >
        <component :is="s.icon" :size="16" />
      </a>
      <div class="w-px h-10 bg-gray-300/60"></div>
    </div>
  </div>
</template>

<style scoped></style>
