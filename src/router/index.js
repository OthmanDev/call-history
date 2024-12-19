import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
    },
    {
      path: '/campaign-wizard',
      name: 'campaign-wizard',
      component: () => import('@/views/CampaignWizardView.vue'),
    },
    {
      path: '/campaign-details',
      name: 'campaign-details',
      component: () => import('@/views/CampaignDetailsView.vue'),
    },
    {
      path: '/phone-numbers',
      name: 'phone-numbers',
      component: () => import('@/views/PhoneNumbersView.vue'),
    },
  ],
})

export default router
