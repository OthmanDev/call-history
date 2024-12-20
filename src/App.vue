<template>
  <main class="min-h-screen bg-[#F8F7FA] bg-opacity-80">
    <aside
      v-if="!$route.meta.isHideSidebar"
      class="fixed top-0 left-0 z-[9999] h-full w-[260px] bg-white-100 border-r border-border-100 transition-all duration-100"
      :class="[isCollapsed ? 'xl:left-0' : 'xl:-left-[260px]']"
    >
      <div class="h-[60px] flex items-center justify-between px-6">
        <RouterLink to="/">Calls History</RouterLink>
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
            <div>
              <div
                @click="isMenu = !isMenu"
                class="text-heading-100 px-3 py-2 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md cursor-pointer"
              >
                <Aperture :size="22" :stroke-width="1.75" />
                <span class="flex-1 pt-[1px]">Campaigns</span
                ><span
                  class="transition-all duration-100 transform"
                  :class="isMenu ? 'rotate-90' : ''"
                  ><ChevronRight :size="18" :stroke-width="1.75"
                /></span>
              </div>
              <div v-if="isMenu">
                <RouterLink
                  @click="closeSidebar"
                  :to="{ name: 'campaigns' }"
                  class="text-heading-100 px-3 py-2 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md"
                  ><span
                    class="ml-2 mr-2 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"
                  ></span
                  ><span class="flex-1">List</span></RouterLink
                ><RouterLink
                  @click="closeSidebar"
                  :to="{ name: 'campaign-wizard' }"
                  class="text-heading-100 px-3 py-2 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md"
                  ><span
                    class="ml-2 mr-2 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200 opacity-40"
                  ></span
                  ><span class="flex-1">Start New</span></RouterLink
                >
              </div>
            </div>
            <RouterLink
              @click="closeSidebar"
              :to="{ name: 'contacts' }"
              class="text-heading-100 px-3 py-2 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md"
            >
              <Contact :size="22" :stroke-width="1.75" />
              <span class="flex-1 pt-[1px]">Contacts</span>
            </RouterLink>
            <RouterLink
              @click="closeSidebar"
              :to="{ name: 'phone-numbers' }"
              class="text-heading-100 px-3 py-2 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md"
            >
              <NotebookTabs :size="22" :stroke-width="1.75" />
              <span class="flex-1 pt-[1px]">Phone Numbers</span>
            </RouterLink>
            <RouterLink
              @click="closeSidebar"
              :to="{ name: 'call-logs' }"
              class="text-heading-100 px-3 py-2 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md"
            >
              <PhoneCall :size="22" :stroke-width="1.75" />
              <span class="flex-1 pt-[1px]">Call Logs</span>
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
import {
  LayoutDashboard,
  Aperture,
  Target,
  NotebookTabs,
  ChevronRight,
  Contact,
  PhoneCall,
} from 'lucide-vue-next'
export default {
  components: {
    LayoutDashboard,
    Aperture,
    Target,
    NotebookTabs,
    ChevronRight,
    Contact,
    PhoneCall,
  },
  data() {
    return {
      isCollapse: false,
      isCollapsed: false,
      isMenu: false,
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
      this.isMenu = false
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
