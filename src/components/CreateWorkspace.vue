<template>
  <div
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
            placeholder="Enter Retellai Key"
            v-model="retellaiKey"
            class="border border-border-100 w-full h-11 outline-none px-4 text-heading-100 rounded-md"
          />
          <input
            type="text"
            placeholder="Enter Workspace Name"
            v-model="newWorkspaceName"
            class="border border-border-100 w-full h-11 outline-none px-4 text-heading-100 rounded-md"
          />
          <button
            @click="createWorkspace"
            class="flex items-center justify-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
            :class="!newWorkspaceName || !retellaiKey ? 'opacity-50 pointer-events-none' : ''"
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
import { Plus, X } from 'lucide-vue-next'
import { useToastStore } from '@/stores/toast'
import { useLoaderStore } from '@/stores/loader'
import ApiRequest from '@/libs/ApiRequest'
export default {
  setup() {
    const toastStore = useToastStore()
    const loaderStore = useLoaderStore()
    return { toastStore, loaderStore }
  },
  components: {
    Plus,
    X,
  },
  data() {
    return {
      newWorkspaceName: '',
      retellaiKey: '',
    }
  },
  methods: {
    async createWorkspace() {
      this.loaderStore.setIsLoading(true)
      try {
        if (!this.newWorkspaceName || !this.retellaiKey) {
          this.toastStore.show('Please fill all the fields', 'error')
          return
        }
        const payload = {
          name: this.newWorkspaceName,
          retellaiKey: this.retellaiKey,
        }
        await ApiRequest().post(`/api/v1/workspaces/create`, payload)
        this.closeAddWorkspace()
        window.dispatchEvent(new CustomEvent('workspaces'))
        this.toastStore.show('Workspace created successfully', 'success')
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    closeAddWorkspace() {
      this.newWorkspaceName = ''
      this.retellaiKey = ''
      this.$emit('closeAddWorkspace')
    },
  },
}
</script>
