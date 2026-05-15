<script setup lang="ts">
import type { Service } from '@/data/content'
import * as LucideIcons from 'lucide-vue-next'
import { type Component } from 'vue'
import { Sparkles } from 'lucide-vue-next'

defineProps<{
  service: Service
}>()

const getIcon = (iconName: string): Component => {
  return (LucideIcons as unknown as Record<string, Component>)[iconName] || Sparkles
}

const categoryColor: Record<string, string> = {
  Digital: 'bg-blue-50 text-blue-600',
  Advertising: 'bg-purple-50 text-purple-600',
  Creative: 'bg-orange-50 text-orange-600',
  Outdoor: 'bg-green-50 text-green-600',
}
</script>

<template>
  <div
    class="group relative bg-white rounded-2xl p-6 border border-gray-100 card-hover shadow-sm hover:border-blue-200"
  >
    <!-- Badge (dari API) -->
    <div
      v-if="service.badge"
      class="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-500/30"
    >
      {{ service.badge }}
    </div>

    <!-- Icon -->
    <div
      class="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110"
    >
      <component :is="getIcon(service.icon)" :size="26" class="text-white" />
    </div>

    <!-- Category Badge -->
    <span
      class="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
      :class="categoryColor[service.category] || 'bg-gray-50 text-gray-600'"
    >
      {{ service.category }}
    </span>

    <!-- Title & Desc -->
    <h3 class="font-bold text-gray-900 text-lg mb-2 leading-tight">{{ service.title }}</h3>
    <p class="text-gray-500 text-sm leading-relaxed mb-5">{{ service.description }}</p>

    <!-- Features -->
    <ul class="space-y-2">
      <li
        v-for="feature in service.features"
        :key="feature"
        class="flex items-center gap-2 text-sm text-gray-600"
      >
        <div class="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
        {{ feature }}
      </li>
    </ul>

    <!-- CTA -->
    <div class="mt-6 pt-5 border-t border-gray-100">
      <RouterLink
        to="/contact"
        class="text-blue-600 font-semibold text-sm hover:text-blue-800 flex items-center gap-1.5 group/link"
      >
        Konsultasi Sekarang
        <svg
          class="w-4 h-4 transition-transform group-hover/link:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </RouterLink>
    </div>
  </div>
</template>
