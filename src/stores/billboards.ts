import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiClient } from '@/services/api'
import type { Billboard } from '@/data/billboards'

/** Shape of billboard data returned from backend API */
interface ApiBillboard {
  id: number
  name: string
  type: string
  city: string
  district: string
  address: string
  size: string
  latitude: number | null
  longitude: number | null
  status: string
  image: string | null
  image_url: string | null
  description: string | null
  is_active: boolean
}

function mapBillboard(b: ApiBillboard): Billboard {
  return {
    id: b.id,
    name: b.name,
    city: b.city,
    district: b.district,
    lat: b.latitude ?? 0,
    lng: b.longitude ?? 0,
    size: b.size,
    type: b.type as Billboard['type'],
    price: '',
    priceMonthly: 0,
    status: b.status as Billboard['status'],
    image: b.image_url || b.image || undefined,
    traffic: '',
    description: b.description ?? '',
  }
}

export const useBillboardsStore = defineStore('billboards', () => {
  const billboards = ref<Billboard[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const cities = computed(() => [...new Set(billboards.value.map((b) => b.city))])
  const types = computed(() => [...new Set(billboards.value.map((b) => b.type))])

  async function fetchBillboards(params?: { city?: string; type?: string; status?: string }) {
    loading.value = true
    error.value = null
    try {
      const query = params
        ? Object.fromEntries(Object.entries(params).filter(([, v]) => !!v)) as Record<string, string>
        : undefined
      const res = await apiClient.get<{ data: ApiBillboard[] }>('/billboards', query)
      billboards.value = res.data.map(mapBillboard)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Gagal memuat data billboard'
    } finally {
      loading.value = false
    }
  }

  return { billboards, cities, types, loading, error, fetchBillboards }
})
