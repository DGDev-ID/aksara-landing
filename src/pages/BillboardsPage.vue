<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, MapPin, X } from 'lucide-vue-next'
import BillboardMap from '@/components/BillboardMap.vue'
import BillboardSidebar from '@/components/BillboardSidebar.vue'
import { billboards, billboardCities, billboardTypes } from '@/data/billboards'

// Future-ready: swap this for an API call
// const billboards = ref<Billboard[]>([])
// onMounted(async () => { billboards.value = await fetch('/api/billboards').then(r => r.json()) })

const selectedId = ref<number | null>(null)
const searchQuery = ref('')
const selectedCity = ref('')
const selectedType = ref('')

const filteredBillboards = computed(() => {
  return billboards.filter((b) => {
    const matchSearch =
      !searchQuery.value ||
      b.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      b.district.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCity = !selectedCity.value || b.city === selectedCity.value
    const matchType = !selectedType.value || b.type === selectedType.value
    return matchSearch && matchCity && matchType
  })
})

const activeFiltersCount = computed(() => {
  return [selectedCity.value, selectedType.value, searchQuery.value].filter(Boolean).length
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCity.value = ''
  selectedType.value = ''
}

const stats = computed(() => ({
  total: filteredBillboards.value.length,
  available: filteredBillboards.value.filter((b) => b.status === 'Available').length,
  booked: filteredBillboards.value.filter((b) => b.status === 'Booked').length,
}))

// Scroll animation
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <section class="gradient-bg pt-28 pb-12 relative overflow-hidden">
      <!-- Background image: billboard/outdoor advertising city -->
      <img
        src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1400&q=80"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 w-full h-full object-cover opacity-[0.1] mix-blend-luminosity pointer-events-none select-none"
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
          class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl"
        ></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center text-white mb-8 fade-in-up visible">
          <div
            class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-4"
          >
            <MapPin :size="14" class="text-blue-300" />
            Jaringan Media Outdoor Terluas
          </div>
          <h1 class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Peta Lokasi
            <span class="gradient-text-white"> Billboard & Outdoor</span>
          </h1>
          <p class="text-blue-100 text-lg max-w-2xl mx-auto">
            Temukan titik strategis media promosi outdoor kami di seluruh Jawa Tengah & DIY. Klik
            marker untuk melihat detail dan harga.
          </p>
        </div>

        <!-- Stats Bar -->
        <div class="grid grid-cols-3 gap-4 max-w-lg mx-auto fade-in-up visible">
          <div class="text-center bg-white/10 border border-white/20 rounded-2xl p-4">
            <div class="text-2xl font-extrabold text-white">{{ stats.total }}</div>
            <div class="text-blue-100 text-xs font-semibold mt-0.5">Total Titik</div>
          </div>
          <div class="text-center bg-white/10 border border-white/20 rounded-2xl p-4">
            <div class="text-2xl font-extrabold text-green-400">{{ stats.available }}</div>
            <div class="text-blue-100 text-xs font-semibold mt-0.5">Tersedia</div>
          </div>
          <div class="text-center bg-white/10 border border-white/20 rounded-2xl p-4">
            <div class="text-2xl font-extrabold text-amber-400">{{ stats.booked }}</div>
            <div class="text-blue-100 text-xs font-semibold mt-0.5">Terpesan</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Bar -->
    <div class="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <!-- Search -->
          <div class="relative flex-1 max-w-sm">
            <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari lokasi, kota, atau area..."
              class="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
            <button
              v-if="searchQuery"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              @click="searchQuery = ''"
            >
              <X :size="14" />
            </button>
          </div>

          <!-- Filters -->
          <div class="flex gap-2 flex-wrap">
            <select
              v-model="selectedCity"
              class="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium text-gray-700"
            >
              <option value="">Semua Kota</option>
              <option v-for="city in billboardCities" :key="city" :value="city">{{ city }}</option>
            </select>

            <select
              v-model="selectedType"
              class="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium text-gray-700"
            >
              <option value="">Semua Jenis</option>
              <option v-for="type in billboardTypes" :key="type" :value="type">{{ type }}</option>
            </select>

            <button
              v-if="activeFiltersCount > 0"
              class="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-2.5 rounded-xl hover:bg-red-50 border border-red-200 transition-colors"
              @click="clearFilters"
            >
              <X :size="14" />
              Reset ({{ activeFiltersCount }})
            </button>
          </div>

          <div class="text-sm text-gray-500 shrink-0 font-medium">
            <span class="text-blue-600 font-bold">{{ filteredBillboards.length }}</span> lokasi
            ditemukan
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content: Map + Sidebar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Mobile: stack vertically (map first, then list) -->
      <!-- Desktop: side-by-side with fixed viewport height -->
      <div class="flex flex-col lg:flex-row lg:gap-6 lg:h-[calc(100vh-220px)] lg:min-h-150">
        <!-- Map — mobile: fixed height 320px, desktop: flex-1 -->
        <div
          class="w-full h-80 lg:h-auto lg:flex-1 rounded-2xl overflow-hidden shadow-xl border border-gray-200 mb-4 lg:mb-0 order-1 lg:order-2"
        >
          <BillboardMap
            :billboards="filteredBillboards"
            :selected-id="selectedId"
            @select="selectedId = $event"
          />
        </div>

        <!-- Sidebar — mobile: max-height scrollable, desktop: fixed width scrollable -->
        <div class="lg:w-96 shrink-0 overflow-y-auto max-h-[70vh] lg:max-h-none order-2 lg:order-1">
          <BillboardSidebar
            :billboards="filteredBillboards"
            :selected-id="selectedId"
            @select="selectedId = $event"
            @deselect="selectedId = null"
          />
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="gradient-bg rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <!-- Background image overlay -->
          <img
            src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80"
            alt=""
            aria-hidden="true"
            class="absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-luminosity pointer-events-none select-none"
          />
          <!-- Dot grid -->
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
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              class="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5 blur-2xl"
            ></div>
            <div
              class="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-400/10 blur-2xl"
            ></div>
          </div>
          <div class="relative">
            <h2 class="text-2xl md:text-3xl font-extrabold mb-3">
              Tidak Menemukan Lokasi yang Tepat?
            </h2>
            <p class="text-blue-100 mb-6 max-w-xl mx-auto">
              Tim kami siap membantu Anda menemukan lokasi strategis terbaik sesuai target audiens
              dan anggaran bisnis Anda.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/628988758080?text=Halo%2C%20saya%20ingin%20konsultasi%20lokasi%20billboard"
                target="_blank"
                class="btn-white"
              >
                Konsultasi Lokasi
              </a>
              <RouterLink to="/contact" class="btn-outline-white"> Hubungi Kami </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
