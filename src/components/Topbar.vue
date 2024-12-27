<template>
  <header class="border-b border-border-100 bg-white-100">
    <div class="flex items-center justify-between h-[56px] px-6">
      <div class="flex items-center gap-4">
        <span class="cursor-pointer text-heading-100 xl:flex hidden" @click="collapseSidebar">
          <menu-right-icon class="w-[23px] h-[23px]" />
        </span>
        <h1 class="text-xl font-bold text-heading-100 leading-none mt-[2.5px]">{{ title }}</h1>
        <slot></slot>
      </div>
      <div class="flex items-center gap-2">
        <div class="relative z-[9999]">
          <div class="flex items-center gap-2 cursor-pointer" @click="isMenuOpen = !isMenuOpen">
            <div class="relative">
              <img
                :src="userStore.user?.imageUrl"
                loading="lazy"
                :alt="userStore.user?.fullName"
                class="w-[40px] h-[40px] rounded-full"
              />
              <span
                class="w-[12px] h-[12px] bg-white-100 absolute rounded-full bottom-0 right-0 flex items-center justify-center"
              >
                <span class="w-[6px] h-[6px] bg-success-100 rounded-full"></span>
              </span>
            </div>
            <div class="pt-[6px]">
              <span class="font-medium block text-heading-100 leading-none">{{
                userStore.user?.fullName
              }}</span>
              <span class="text-sm">Owner</span>
            </div>
          </div>
          <div
            v-if="isMenuOpen"
            class="absolute right-0 border border-border-100 rounded-md bg-white-100 z-10 top-full mt-1 w-[260px]"
          >
            <div class="p-4 grid gap-3">
              <div class="font-medium text-heading-100">
                {{ workspacesStore.workspaces.length > 0 ? 'Your Workspaces' : 'No Workspaces' }}
              </div>
              <div
                v-if="workspacesStore.workspaces.length > 0"
                class="border-t border-border-100"
              ></div>
              <div
                v-if="workspacesStore.workspaces.length > 0"
                class="grid gap-3 max-h-[100px] overflow-y-auto without-scrollbar"
              >
                <div
                  v-for="workspace in workspacesStore.workspaces"
                  :key="workspace.id"
                  :class="workspace.default ? '' : 'cursor-pointer'"
                  @click="setWorkspaceAsDefault(workspace.uid)"
                >
                  <div class="flex flex-col w-full">
                    <div class="flex justify-between items-center">
                      <span class="font-medium text-heading-100 text-[15px]">{{
                        workspace.name
                      }}</span>
                      <span v-if="workspace.default" class="text-sm">Default</span>
                    </div>
                    <div class="flex items-center gap-4 mt-1.5">
                      <span class="text-sm flex items-center gap-1">
                        <Building :size="18" :stroke-width="1.75" />
                        {{ workspace.accounts }} accounts
                      </span>
                      <span class="text-sm flex items-center gap-1">
                        <Users :size="18" :stroke-width="1.75" />
                        {{ workspace.seats }} seats
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border-t border-border-100"></div>
              <div
                class="text-heading-100 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md cursor-pointer"
                @click="openAddWorkspace"
              >
                <span><Plus :size="20" :stroke-width="1.75" /></span>
                <span class="flex-1 pt-[1px]">Add Workspace</span>
              </div>
              <RouterLink
                to="/workspaces"
                class="text-heading-100 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md cursor-pointer"
              >
                <span><Network :size="20" :stroke-width="1.75" /></span>
                <span class="flex-1 pt-[1px]">See Workspaces</span>
              </RouterLink>
              <SignOutButton>
                <div
                  class="text-heading-100 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md cursor-pointer"
                >
                  <span><LogOut :size="20" :stroke-width="1.75" /></span>
                  <span class="flex-1 pt-[1px]">Sign Out</span>
                </div>
              </SignOutButton>
            </div>
          </div>
        </div>
        <div v-if="isMenuOpen" class="fixed inset-0 z-[9998]" @click="isMenuOpen = false"></div>
      </div>
    </div>
  </header>
  <CreateWorkspace v-if="isAddOpen" @closeAddWorkspace="closeAddWorkspace" />
</template>

<script>
import { UserCircle, LogOut, Users, Building, Plus, Network, X } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useWorkspacesStore } from '@/stores/workspaces'
import { useLoaderStore } from '@/stores/loader'
import { useToastStore } from '@/stores/toast'
import { SignOutButton } from '@clerk/vue'
import CreateWorkspace from '@/components/CreateWorkspace.vue'
import ApiRequest from '@/libs/ApiRequest'
export default {
  setup() {
    const userStore = useUserStore()
    const workspacesStore = useWorkspacesStore()
    const loaderStore = useLoaderStore()
    const toastStore = useToastStore()
    return { userStore, workspacesStore, loaderStore, toastStore }
  },
  props: {
    title: {
      type: String,
    },
  },
  components: {
    UserCircle,
    LogOut,
    Users,
    Building,
    Plus,
    Network,
    X,
    SignOutButton,
    CreateWorkspace,
  },
  data() {
    return {
      isMenuOpen: false,
      isCollapsed: false,
      isAddOpen: false,
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
    openAddWorkspace() {
      this.isAddOpen = true
      this.isMenuOpen = false
    },
    closeAddWorkspace() {
      this.isAddOpen = false
    },
    async setWorkspaceAsDefault(uid) {
      this.loaderStore.setIsLoading(true)
      try {
        const { data } = await ApiRequest().get(`/api/v1/workspaces/default/${uid}`)
        this.toastStore.show('Workspace seted as default successfully', 'success')
        window.location.reload()
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
  },
}
</script>
