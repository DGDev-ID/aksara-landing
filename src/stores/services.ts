import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiClient } from '@/services/api'
import type { Service } from '@/data/content'

/** Shape of service data returned from backend API */
interface ApiService {
  id: number
  name: string
  icon: string
  badge: string | null
  description: string
  features: string[] | null
  is_active: boolean
  order: number
}

function mapService(s: ApiService): Service {
  return {
    id: s.id,
    icon: s.icon || 'Sparkles',
    title: s.name,
    description: s.description,
    features: s.features ?? [],
    category: '',
    badge: s.badge,
  }
}

export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchServices() {
    if (services.value.length > 0) return
    loading.value = true
    error.value = null
    try {
      const res = await apiClient.get<{ data: ApiService[] }>('/services')
      services.value = res.data.map(mapService)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Gagal memuat data layanan'
    } finally {
      loading.value = false
    }
  }

  return { services, loading, error, fetchServices }
})
