import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SigninView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: () => import('@/views/CampaignsView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/campaign-wizard',
      name: 'campaign-wizard',
      component: () => import('@/views/CampaignWizardView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/campaigns/:id',
      name: 'campaign-details',
      component: () => import('@/views/CampaignDetailsView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/views/ContactsView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/phone-numbers',
      name: 'phone-numbers',
      component: () => import('@/views/PhoneNumbersView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/call-logs',
      name: 'call-logs',
      component: () => import('@/views/CallLogsView.vue'),
      meta: {
        requireAuth: true,
      },
    },
  ],
})
router.beforeEach(async (to) => {
  try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false
    const { meta: { requireAuth = false } = {} } = to
    if (requireAuth && !user) {
      throw new Error('Not loggedin.')
    }
  } catch (error) {
    return '/signin'
  }
})

export default router
