import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiClient } from '@/services/api'
import type { PortfolioItem } from '@/data/content'

export interface PortfolioCategory {
  id: number
  name: string
  slug: string
}

/** Shape of portfolio item returned from backend API */
interface ApiPortfolioItem {
  id: number
  title: string
  category_id: number
  category: { id: number; name: string; slug: string } | null
  client: string
  image: string | null
  image_url: string | null
  tags: string[] | null
  is_active: boolean
  order: number
  created_at: string
}

function mapPortfolioItem(p: ApiPortfolioItem): PortfolioItem {
  const year = p.created_at ? new Date(p.created_at).getFullYear() : new Date().getFullYear()
  return {
    id: p.id,
    title: p.title,
    client: p.client,
    category: (p.category?.name ?? '') as PortfolioItem['category'],
    tags: p.tags ?? [],
    image: p.image_url || p.image || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
    year,
  }
}

export const usePortfolioStore = defineStore('portfolio', () => {
  const items = ref<PortfolioItem[]>([])
  const categories = ref<PortfolioCategory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCategories() {
    if (categories.value.length > 0) return
    try {
      const res = await apiClient.get<{ data: PortfolioCategory[] }>('/portfolio-categories')
      categories.value = res.data
    } catch {
      // kategori gagal load, filter tetap bisa derive dari items
    }
  }

  async function fetchPortfolio(category?: string) {
    loading.value = true
    error.value = null
    try {
      const params = category ? { category } : undefined
      const res = await apiClient.get<{ data: ApiPortfolioItem[] }>('/portfolio', params)
      items.value = res.data.map(mapPortfolioItem)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Gagal memuat data portfolio'
    } finally {
      loading.value = false
    }
  }

  return { items, categories, loading, error, fetchCategories, fetchPortfolio }
})
