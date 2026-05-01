<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import type { Billboard } from '@/data/billboards'

const props = defineProps<{
  billboards: Billboard[]
  selectedId: number | null
}>()

const emit = defineEmits<{
  select: [id: number]
}>()

const mapRef = ref<HTMLElement | null>(null)
let map: L.Map | null = null
const markers: Map<number, L.Marker> = new Map()

const statusColor: Record<string, string> = {
  Available: '#22c55e',
  Booked: '#f59e0b',
  Maintenance: '#ef4444',
}

const createIcon = (status: string, isActive: boolean) => {
  const color = isActive ? '#f59e0b' : '#2563EB'
  const size = isActive ? 42 : 36
  return L.divIcon({
    html: `
      <div style="
        width:${size}px;
        height:${size}px;
        border-radius:50% 50% 50% 0;
        background:linear-gradient(135deg,${color},${isActive ? '#d97706' : '#1e3a8a'});
        border:3px solid white;
        box-shadow:0 4px 12px ${color}60;
        transform:rotate(-45deg);
        transition:all 0.3s ease;
        display:flex;
        align-items:center;
        justify-content:center;
      ">
        <div style="transform:rotate(45deg);width:8px;height:8px;border-radius:50%;background:${statusColor[status] || 'white'};"></div>
      </div>
    `,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  })
}

const createPopupHtml = (b: Billboard) => `
  <div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:260px;">
    <div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:16px;color:white;">
      <div style="font-size:11px;font-weight:600;opacity:0.7;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">${b.type}</div>
      <div style="font-size:15px;font-weight:700;line-height:1.3;">${b.name}</div>
      <div style="font-size:12px;opacity:0.8;margin-top:2px;">📍 ${b.district}, ${b.city}</div>
    </div>
    <div style="padding:14px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
        <div style="background:#f8fafc;padding:10px;border-radius:10px;">
          <div style="font-size:10px;color:#64748b;font-weight:600;text-transform:uppercase;margin-bottom:2px;">Ukuran</div>
          <div style="font-size:13px;font-weight:700;color:#0f172a;">${b.size}</div>
        </div>
        <div style="background:#f8fafc;padding:10px;border-radius:10px;">
          <div style="font-size:10px;color:#64748b;font-weight:600;text-transform:uppercase;margin-bottom:2px;">Status</div>
          <div style="font-size:13px;font-weight:700;color:${statusColor[b.status] || '#2563eb'};">${b.status}</div>
        </div>
      </div>
      <div style="background:#eff6ff;padding:10px;border-radius:10px;margin-bottom:12px;">
        <div style="font-size:10px;color:#2563eb;font-weight:600;text-transform:uppercase;margin-bottom:2px;">Estimasi Harga</div>
        <div style="font-size:15px;font-weight:800;color:#1e3a8a;">${b.price}</div>
      </div>
      <div style="font-size:11px;color:#64748b;margin-bottom:12px;">
        🚗 ${b.traffic}
      </div>
      <a href="/contact" style="
        display:block;
        text-align:center;
        background:linear-gradient(135deg,#2563eb,#1d4ed8);
        color:white;
        padding:10px 16px;
        border-radius:10px;
        font-size:13px;
        font-weight:700;
        text-decoration:none;
        box-shadow:0 4px 12px #2563eb40;
      ">📞 Tanya Ketersediaan</a>
    </div>
  </div>
`

const initMap = () => {
  if (!mapRef.value) return
  map = L.map(mapRef.value, {
    center: [-7.5, 110.4],
    zoom: 8,
    zoomControl: false,
  })

  L.control.zoom({ position: 'bottomright' }).addTo(map)

  // Tile layer - OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map)

  props.billboards.forEach((b) => {
    const marker = L.marker([b.lat, b.lng], {
      icon: createIcon(b.status, false),
    })

    marker.on('click', () => {
      emit('select', b.id)
    })

    const popup = L.popup({ closeButton: false, maxWidth: 300 }).setContent(createPopupHtml(b))
    marker.bindPopup(popup)
    marker.addTo(map!)
    markers.set(b.id, marker)
  })
}

watch(
  () => props.selectedId,
  (newId, oldId) => {
    if (oldId) {
      const oldMarker = markers.get(oldId)
      const oldB = props.billboards.find((b) => b.id === oldId)
      if (oldMarker && oldB) oldMarker.setIcon(createIcon(oldB.status, false))
    }
    if (newId) {
      const marker = markers.get(newId)
      const b = props.billboards.find((b) => b.id === newId)
      if (marker && b) {
        marker.setIcon(createIcon(b.status, true))
        marker.openPopup()
        map?.flyTo([b.lat, b.lng], 12, { duration: 1.2 })
      }
    }
  },
)

onMounted(() => initMap())
onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <div ref="mapRef" class="w-full h-full rounded-2xl overflow-hidden z-0"></div>
</template>
