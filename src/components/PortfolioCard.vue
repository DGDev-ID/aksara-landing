<script setup lang="ts">
import type { PortfolioItem } from '@/data/content'
import { ExternalLink } from 'lucide-vue-next'

defineProps<{
  item: PortfolioItem
}>()

const categoryColor: Record<string, string> = {
  Website: 'bg-blue-500',
  Branding: 'bg-purple-500',
  'Social Media': 'bg-pink-500',
  Advertising: 'bg-orange-500',
  'Outdoor Media': 'bg-green-500',
}
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 card-hover cursor-pointer"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-[4/3]">
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end"
      >
        <div class="p-5 w-full">
          <p class="text-white text-sm leading-relaxed mb-3">{{ item.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full backdrop-blur-sm"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <span
          class="text-xs text-white font-semibold px-3 py-1.5 rounded-full"
          :class="categoryColor[item.category] || 'bg-gray-500'"
        >
          {{ item.category }}
        </span>
      </div>

      <!-- External link icon -->
      <div
        class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
      >
        <ExternalLink :size="16" class="text-gray-700" />
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs text-gray-400 font-medium">{{ item.client }}</p>
        <p class="text-xs text-gray-400">{{ item.year }}</p>
      </div>
      <h3 class="font-bold text-gray-900 text-base leading-snug">{{ item.title }}</h3>
    </div>
  </div>
</template>
