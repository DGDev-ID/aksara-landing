<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CTASection from '@/components/CTASection.vue'
import PortfolioCard from '@/components/PortfolioCard.vue'
import { usePortfolioStore } from '@/stores/portfolio'

const portfolioStore = usePortfolioStore()

const activeCategory = ref('Semua')

// Kategori dari API, fallback derive dari items jika API gagal
const categories = computed(() => {
  if (portfolioStore.categories.length > 0) {
    return ['Semua', ...portfolioStore.categories.map((c) => c.name)]
  }
  const unique = [...new Set(portfolioStore.items.map((p) => p.category))].sort()
  return ['Semua', ...unique]
})

const filtered = computed(() => {
  if (activeCategory.value === 'Semua') return portfolioStore.items
  return portfolioStore.items.filter((p) => p.category === activeCategory.value)
})

onMounted(async () => {
  // Fetch paralel: categories & items
  await Promise.all([
    portfolioStore.fetchCategories(),
    portfolioStore.fetchPortfolio(),
  ])

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
      <!-- Background image: creative/design workspace -->
      <img
        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80"
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
        <span class="text-blue-200 font-bold text-sm uppercase tracking-widest">Portfolio</span>
        <h1 class="text-4xl md:text-5xl font-black text-white mt-3 mb-5">Karya Terbaik Kami</h1>
        <p class="text-blue-100 text-lg max-w-2xl mx-auto">
          Setiap project adalah bukti nyata komitmen kami terhadap kualitas dan hasil yang terukur.
        </p>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-0.75 bg-white/20"></div>
    </section>

    <!-- Portfolio -->
    <section class="section-padding bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-3 justify-center mb-12 fade-in-up">
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
            :class="
              activeCategory === cat
                ? 'gradient-bg text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            "
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Grid -->
        <Transition name="page" mode="out-in">
          <div :key="activeCategory" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Loading skeleton -->
            <template v-if="portfolioStore.loading">
              <div v-for="n in 6" :key="n" class="bg-gray-100 rounded-2xl aspect-4/3 animate-pulse" />
            </template>
            <!-- Error state -->
            <div v-else-if="portfolioStore.error" class="col-span-3 text-center py-10 text-red-500">
              {{ portfolioStore.error }}
            </div>
            <!-- Data -->
            <PortfolioCard v-else v-for="item in filtered" :key="item.id" :item="item" />
          </div>
        </Transition>
      </div>
    </section>

    <CTASection
      title="Ingin Project Anda Masuk Portfolio Kami?"
      subtitle="Mari kolaborasi dan wujudkan campaign promosi yang berkesan dan berdampak."
    />
  </div>
</template>
