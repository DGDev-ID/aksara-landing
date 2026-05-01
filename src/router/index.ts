import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
      meta: { title: 'Aksara Media Promosi - Agency Periklanan & Digital Marketing Terpercaya' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
      meta: { title: 'Tentang Kami - Aksara Media Promosi' },
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/pages/ServicesPage.vue'),
      meta: { title: 'Layanan - Aksara Media Promosi' },
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('@/pages/PortfolioPage.vue'),
      meta: { title: 'Portfolio - Aksara Media Promosi' },
    },
    {
      path: '/billboards',
      name: 'billboards',
      component: () => import('@/pages/BillboardsPage.vue'),
      meta: { title: 'Lokasi Billboard - Aksara Media Promosi' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/ContactPage.vue'),
      meta: { title: 'Kontak - Aksara Media Promosi' },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  const title = to.meta?.title as string
  if (title) document.title = title
})

export default router
