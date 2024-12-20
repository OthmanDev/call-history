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
      path: '/campaigns',
      name: 'campaigns',
      component: () => import('@/views/CampaignsView.vue'),
    },
    {
      path: '/campaign-wizard',
      name: 'campaign-wizard',
      component: () => import('@/views/CampaignWizardView.vue'),
    },
    {
      path: '/campaigns/:id',
      name: 'campaign-details',
      component: () => import('@/views/CampaignDetailsView.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/views/ContactsView.vue'),
    },
    {
      path: '/phone-numbers',
      name: 'phone-numbers',
      component: () => import('@/views/PhoneNumbersView.vue'),
    },
    {
      path: '/call-logs',
      name: 'call-logs',
      component: () => import('@/views/CallLogsView.vue'),
    },
  ],
})

export default router
