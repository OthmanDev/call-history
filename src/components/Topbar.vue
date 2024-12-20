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
                src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/images/avatars/avatar-1.png"
                loading="lazy"
                alt="Greg"
                class="w-[40px] h-[40px] rounded-full"
              />
              <span
                class="w-[12px] h-[12px] bg-white-100 absolute rounded-full bottom-0 right-0 flex items-center justify-center"
              >
                <span class="w-[6px] h-[6px] bg-success-100 rounded-full"></span>
              </span>
            </div>
            <div class="pt-[6px]">
              <span class="font-medium block text-heading-100 leading-none">Talkforce AI</span>
              <span class="text-sm">Owner</span>
            </div>
          </div>
          <div
            v-if="isMenuOpen"
            class="absolute right-0 border border-border-100 rounded-md bg-white-100 z-10 top-full mt-1 w-[260px]"
          >
            <div class="p-4 grid gap-3">
              <div class="font-medium text-heading-100">Your Workspaces</div>
              <div class="border-t border-border-100"></div>
              <div class="grid gap-3">
                <div v-for="workspace in workspaces" :key="workspace.id" class="cursor-pointer">
                  <div class="flex flex-col w-full">
                    <div class="flex justify-between items-center">
                      <span class="font-medium text-heading-100 text-[15px]">{{
                        workspace.name
                      }}</span>
                      <span v-if="workspace.isOwner" class="text-sm">Owner</span>
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
              <div
                class="text-heading-100 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md cursor-pointer"
              >
                <span><Network :size="20" :stroke-width="1.75" /></span>
                <span class="flex-1 pt-[1px]">See Workspaces</span>
              </div>
              <div
                class="text-heading-100 flex items-center gap-2 transition-all hover:text-primary-100 rounded-md cursor-pointer"
              >
                <span><LogOut :size="20" :stroke-width="1.75" /></span>
                <span class="flex-1 pt-[1px]">Sign Out</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isMenuOpen" class="fixed inset-0 z-[9998]" @click="isMenuOpen = false"></div>
      </div>
    </div>
  </header>
  <div
    v-if="isAddOpen"
    class="bg-opacity-40 fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-heading-100"
  >
    <div class="max-w-xl rounded-xl w-full mx-auto bg-white-100">
      <div class="flex items-center justify-between p-4 border-b border-border-100">
        <h5 class="font-semibold leading-none text-lg text-heading-100">Create New Workspace</h5>
        <span
          @click="closeAddWorkspace"
          class="cursor-pointer transition-colors duration-100 hover:text-heading-100"
        >
          <X :size="24" :stroke-width="1.75" />
        </span>
      </div>
      <div class="without-scrollbar max-h-modal overflow-y-auto p-4">
        <div class="grid gap-4">
          <input
            type="text"
            placeholder="Enter Workspace Name"
            v-model="newWorkspaceName"
            class="border border-border-100 w-full h-11 outline-none px-4 text-heading-100 rounded-md"
          />
          <button
            @click="createWorkspace"
            class="flex items-center justify-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
          >
            <Plus :size="18" :stroke-width="1.75" />
            Create Workspace
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserCircle, LogOut, Users, Building, Plus, Network, X } from 'lucide-vue-next'
export default {
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
  },
  data() {
    return {
      isMenuOpen: false,
      isCollapsed: false,
      isAddOpen: false,
      newWorkspaceName: '',
      workspaces: [
        {
          id: 1,
          name: 'Talkforce AI',
          accounts: 3,
          seats: 10,
          isOwner: true,
        },
        {
          id: 2,
          name: 'Sales Team',
          accounts: 5,
          seats: 15,
          isOwner: false,
        },
        {
          id: 3,
          name: 'Support Division',
          accounts: 2,
          seats: 5,
          isOwner: false,
        },
      ],
    }
  },
  directives: {
    clickOutside: {
      bind(el, binding) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event)
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unbind(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      },
    },
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
      this.newWorkspaceName = ''
    },

    createWorkspace() {
      // Implement workspace creation logic here
      console.log('Creating workspace:', this.newWorkspaceName)
      this.closeAddWorkspace()
    },
  },
}
</script>
