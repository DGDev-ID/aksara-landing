<script setup lang="ts">
import type { Billboard } from '@/data/billboards'
import { MapPin, Ruler, DollarSign, ChevronRight } from 'lucide-vue-next'

defineProps<{
  billboards: Billboard[]
  selectedId: number | null
}>()

const emit = defineEmits<{
  select: [id: number]
  deselect: []
}>()

const statusStyle: Record<string, { dot: string; text: string; bg: string }> = {
  Available: { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  Booked: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  Maintenance: { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
}
</script>

<template>
  <div
    class="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
  >
    <!-- Header -->
    <div class="p-5 border-b border-gray-100 gradient-bg">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold text-white text-lg">Daftar Lokasi</h3>
          <p class="text-blue-200 text-xs mt-0.5">{{ billboards.length }} titik tersedia</p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <MapPin :size="20" class="text-white" />
        </div>
      </div>
    </div>

    <!-- List -->
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="b in billboards"
        :key="b.id"
        class="group p-4 border-b border-gray-50 cursor-pointer transition-all duration-200 hover:bg-blue-50/60"
        :class="selectedId === b.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''"
        @click="emit('select', b.id)"
      >
        <div class="flex items-start gap-3">
          <!-- Marker Icon -->
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all"
            :class="
              selectedId === b.id
                ? 'gradient-bg shadow-lg shadow-blue-500/30'
                : 'bg-blue-50 group-hover:bg-blue-100'
            "
          >
            <MapPin :size="16" :class="selectedId === b.id ? 'text-white' : 'text-blue-600'" />
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h4 class="font-bold text-gray-900 text-sm leading-tight truncate">{{ b.name }}</h4>
                <p class="text-xs text-gray-500 mt-0.5">{{ b.district }}, {{ b.city }}</p>
              </div>
              <ChevronRight
                :size="16"
                class="text-gray-400 shrink-0 transition-transform group-hover:translate-x-0.5 mt-0.5"
              />
            </div>

            <div class="flex items-center gap-3 mt-2">
              <span
                class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                :class="statusStyle[b.status]?.bg + ' ' + statusStyle[b.status]?.text"
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="statusStyle[b.status]?.dot"></span>
                {{ b.status }}
              </span>
              <span class="text-xs text-gray-400">{{ b.type }}</span>
            </div>

            <div class="flex items-center gap-4 mt-2">
              <div class="flex items-center gap-1 text-xs text-gray-500">
                <Ruler :size="11" />
                {{ b.size }}
              </div>
              <div class="flex items-center gap-1 text-xs font-semibold text-blue-600">
                <DollarSign :size="11" />
                {{ b.price }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="billboards.length === 0" class="p-8 text-center">
        <div
          class="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3"
        >
          <MapPin :size="24" class="text-gray-400" />
        </div>
        <p class="text-gray-500 text-sm font-medium">Tidak ada lokasi ditemukan</p>
        <p class="text-gray-400 text-xs mt-1">Coba ubah filter pencarian</p>
      </div>
    </div>

    <!-- Footer stats -->
    <div class="p-4 border-t border-gray-100 bg-gray-50 grid grid-cols-3 gap-3">
      <div class="text-center">
        <p class="text-lg font-bold text-green-600">
          {{ billboards.filter((b) => b.status === 'Available').length }}
        </p>
        <p class="text-xs text-gray-500">Available</p>
      </div>
      <div class="text-center border-x border-gray-200">
        <p class="text-lg font-bold text-amber-500">
          {{ billboards.filter((b) => b.status === 'Booked').length }}
        </p>
        <p class="text-xs text-gray-500">Booked</p>
      </div>
      <div class="text-center">
        <p class="text-lg font-bold text-red-500">
          {{ billboards.filter((b) => b.status === 'Maintenance').length }}
        </p>
        <p class="text-xs text-gray-500">Maintenance</p>
      </div>
    </div>
  </div>
</template>
