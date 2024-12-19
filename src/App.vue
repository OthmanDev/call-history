<template>
  <main class="min-h-screen bg-[#F8F7FA] bg-opacity-80">
    <aside
      v-if="!$route.meta.isHideSidebar"
      class="fixed top-0 left-0 z-[9999] h-full w-[260px] bg-white-100 border-r border-border-100 transition-all duration-100"
      :class="[isCollapsed ? 'xl:left-0' : 'xl:-left-[260px]']"
    >
      <div class="h-[60px] flex items-center justify-between px-6">
        <RouterLink to="dashboard">Calls History</RouterLink>
        <span class="cursor-pointer text-heading-100 sm:flex hidden" @click="closeSidebar">
          <menu-left-icon class="w-[23px] h-[23px]" />
        </span>
      </div>
      <div class="without-scrollbar overflow-y-auto">
        <div class="px-3">
          <div class="grid gap-1.5">
            <RouterLink
              @click="closeSidebar"
              :to="{ name: 'dashboard' }"
              class="text-heading-100 px-3 py-2 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md"
            >
              <LayoutDashboard :size="22" :stroke-width="1.75" />
              <span class="flex-1 pt-[1px]">Dashboard</span>
            </RouterLink>
            <RouterLink
              @click="closeSidebar"
              :to="{ name: 'campaign-wizard' }"
              class="text-heading-100 px-3 py-2 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md"
            >
              <Aperture :size="22" :stroke-width="1.75" />
              <span class="flex-1 pt-[1px]">Campaign Wizard</span>
            </RouterLink>
            <RouterLink
              @click="closeSidebar"
              :to="{ name: 'campaign-details' }"
              class="text-heading-100 px-3 py-2 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md"
            >
              <Target :size="22" :stroke-width="1.75" />
              <span class="flex-1 pt-[1px]">Campaign Details</span>
            </RouterLink>
            <RouterLink
              @click="closeSidebar"
              :to="{ name: 'phone-numbers' }"
              class="text-heading-100 px-3 py-2 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md"
            >
              <Phone :size="22" :stroke-width="1.75" />
              <span class="flex-1 pt-[1px]">Phone Numbers</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </aside>
    <div class="ml-[260px]">
      <RouterView />
    </div>
  </main>
</template>

<script>
import { LayoutDashboard, Aperture, Target, Phone } from 'lucide-vue-next'
export default {
  components: {
    LayoutDashboard,
    Aperture,
    Target,
    Phone,
  },
  data() {
    return {
      isCollapse: false,
      isCollapsed: false,
    }
  },
  mounted() {
    window.addEventListener('collapseSidebar', (event) => {
      this.isCollapsed = event.detail.isCollapsed
    })
  },
  methods: {
    closeSidebar() {
      this.isCollapsed = false
      window.dispatchEvent(
        new CustomEvent('isCollapsed', {
          detail: {
            isCollapsed: this.isCollapsed,
          },
        }),
      )
    },
  },
}
</script>
