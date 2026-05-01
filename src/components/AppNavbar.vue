<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, Phone } from 'lucide-vue-next'

const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tentang Kami', path: '/about' },
  { name: 'Layanan', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Billboard', path: '/billboards' },
  { name: 'Kontak', path: '/contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-blue-900/5 border-b border-gray-100'
        : 'bg-transparent',
    ]"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-18 py-3">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3 group">
          <div
            class="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all"
          >
            <span class="text-white font-black text-lg">A</span>
          </div>
          <div>
            <div
              :class="[
                'font-extrabold text-lg leading-tight transition-colors',
                isScrolled ? 'text-gray-900' : 'text-white drop-shadow',
              ]"
            >
              Aksara
            </div>
            <div
              :class="[
                'text-xs font-medium leading-tight transition-colors',
                isScrolled ? 'text-blue-600' : 'text-blue-200',
              ]"
            >
              Media Promosi
            </div>
          </div>
        </RouterLink>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
              isActive(link.path)
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : isScrolled
                  ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  : 'text-white/90 hover:bg-white/10 hover:text-white',
            ]"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <!-- CTA Button -->
        <div class="hidden lg:flex items-center gap-3">
          <a
            href="https://wa.me/6281234567890?text=Halo%20Aksara%20Media%2C%20saya%20ingin%20konsultasi"
            target="_blank"
            class="btn-primary text-sm px-5 py-2.5"
          >
            <Phone :size="16" />
            Konsultasi Gratis
          </a>
        </div>

        <!-- Mobile menu toggle -->
        <button
          class="lg:hidden p-2 rounded-lg transition-colors"
          :class="isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Menu v-if="!isMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-2xl"
      >
        <div class="max-w-7xl mx-auto px-4 py-4 space-y-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all"
            :class="
              isActive(link.path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            "
            @click="isMenuOpen = false"
          >
            {{ link.name }}
          </RouterLink>
          <div class="pt-3 pb-2 border-t border-gray-100 mt-3">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Aksara%20Media%2C%20saya%20ingin%20konsultasi"
              target="_blank"
              class="btn-primary w-full justify-center text-sm"
            >
              <Phone :size="16" />
              Konsultasi Gratis via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
