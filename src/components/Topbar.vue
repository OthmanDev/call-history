<template>
  <header class="border-b border-border-100 bg-white-100">
    <div class="flex items-center justify-between h-[56px] px-6">
      <div class="flex items-center gap-3">
        <span class="cursor-pointer text-heading-100 xl:flex hidden" @click="collapseSidebar">
          <menu-right-icon class="w-[23px] h-[23px]" />
        </span>
        <h1 class="text-xl font-bold text-heading-100 leading-none mt-[2.5px]">{{ title }}</h1>
      </div>
      <div class="flex items-center gap-2">
        <div class="relative z-[1001]">
          <img
            @click="isMenuOpen = !isMenuOpen"
            src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/images/avatars/avatar-1.png"
            loading="lazy"
            alt="Greg"
            class="w-[40px] h-[40px] rounded-full cursor-pointer"
          />
          <span
            class="w-[12px] h-[12px] bg-white-100 absolute rounded-full bottom-0 right-0 flex items-center justify-center"
          >
            <span class="w-[6px] h-[6px] bg-success-100 rounded-full"></span>
          </span>
          <div
            v-if="isMenuOpen"
            class="absolute right-0 border border-border-100 rounded-md bg-white-100 z-10 top-full mt-1 w-[200px]"
          >
            <div class="p-3 grid gap-4">
              <RouterLink
                :to="{ name: 'dashboard' }"
                class="text-heading-100 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md"
              >
                <span>
                  <UserCircle :size="20" :stroke-width="1.75" />
                </span>
                <span class="flex-1 pt-[1px] font-medium">My Profile</span>
              </RouterLink>
              <div
                class="text-heading-100 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md cursor-pointer"
              >
                <span><LogOut :size="20" :stroke-width="1.75" /></span>
                <span class="flex-1 pt-[1px] font-medium">Sign Out</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isMenuOpen" class="fixed inset-0 z-[1000]" @click="isMenuOpen = false"></div>
      </div>
    </div>
  </header>
</template>

<script>
import { UserCircle, LogOut } from 'lucide-vue-next'
export default {
  props: {
    title: {
      type: String,
    },
  },
  components: {
    UserCircle,
    LogOut,
  },
  data() {
    return {
      isMenuOpen: false,
      isCollapsed: false,
    }
  },
  mounted() {
    window.addEventListener('isCollapsed', (event) => {
      this.isCollapsed = event.detail.isCollapsed
    })
  },
  methods: {
    collapseSidebar() {
      this.isCollapsed = !this.isCollapsed
      window.dispatchEvent(
        new CustomEvent('collapseSidebar', {
          detail: {
            isCollapsed: this.isCollapsed,
          },
        }),
      )
    },
  },
}
</script>
