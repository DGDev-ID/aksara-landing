<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Send, CheckCircle, Loader } from 'lucide-vue-next'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const services = [
  'Social Media Management',
  'Meta Ads',
  'Google Ads',
  'Branding & Desain',
  'Website Development',
  'SEO',
  'Content Creator',
  'Billboard Advertising',
  'Videotron Advertising',
  'Lainnya',
]

const handleSubmit = async () => {
  isSubmitting.value = true
  // Simulate API call — replace with real fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
  await new Promise((r) => setTimeout(r, 1500))
  isSubmitting.value = false
  isSubmitted.value = true
}

const resetForm = () => {
  isSubmitted.value = false
  Object.assign(form, { name: '', phone: '', email: '', service: '', message: '' })
}
</script>

<template>
  <div class="bg-white rounded-2xl p-8 shadow-xl shadow-blue-900/5 border border-gray-100">
    <!-- Success State -->
    <Transition name="page" mode="out-in">
      <div v-if="isSubmitted" class="text-center py-8">
        <div
          class="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle :size="36" class="text-green-500" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Pesan Terkirim!</h3>
        <p class="text-gray-500 text-sm mb-6">
          Tim kami akan menghubungi Anda dalam 1x24 jam. Terima kasih!
        </p>
        <button class="btn-primary mx-auto" @click="resetForm">Kirim Pesan Baru</button>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">
              Nama Lengkap <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="Masukkan nama Anda"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">
              No. WhatsApp <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.phone"
              type="tel"
              required
              placeholder="08xx-xxxx-xxxx"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="nama@perusahaan.com"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5">
            Layanan yang Diminati <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.service"
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">-- Pilih Layanan --</option>
            <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1.5"
            >Pesan / Detail Kebutuhan</label
          >
          <textarea
            v-model="form.message"
            rows="4"
            placeholder="Ceritakan kebutuhan promosi bisnis Anda..."
            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn-primary w-full justify-center py-3.5 disabled:opacity-70"
        >
          <Loader v-if="isSubmitting" :size="18" class="animate-spin" />
          <Send v-else :size="18" />
          {{ isSubmitting ? 'Mengirim...' : 'Kirim Pesan Konsultasi' }}
        </button>
      </form>
    </Transition>
  </div>
</template>
