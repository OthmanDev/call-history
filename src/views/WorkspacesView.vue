<template>
  <Topbar :title="'Workspaces Management'"></Topbar>
  <main class="min-h-screen">
    <div class="p-6">
      <div class="rounded-xl bg-white-100 border border-border-100 overflow-hidden">
        <div class="border-b border-border-100 p-4">
          <div class="flex items-center justify-between">
            <span class="text-lg font-semibold text-heading-100">Workspaces</span>
            <button
              @click="isAddOpen = true"
              class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
            >
              <Plus :size="18" :stroke-width="1.75" />
              Add Workspace
            </button>
          </div>
        </div>
        <div v-if="workspaces.length > 0" class="p-4">
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(workspace, key) in workspaces"
              :key="key"
              class="border border-border-100 rounded-xl p-4 flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <span class="text-heading-100 font-medium">{{ workspace.name }}</span>
                <span
                  v-if="workspace.default"
                  class="inline-flex items-center justify-center text-center h-8 px-2 text-[15px] rounded-md bg-opacity-10 capitalize bg-success-100 text-success-100"
                  >Default</span
                >
              </div>
              <div class="flex items-center gap-1">
                <span
                  v-if="!workspace.default"
                  v-tooltip="'Set as default'"
                  @click="setWorkspaceAsDefault(workspace.uid)"
                  class="cursor-pointer hover:text-success-100"
                  ><CircleCheck :size="20" :stroke-width="1.75"
                /></span>
                <span
                  v-tooltip="'Delete'"
                  @click="deleteWorkspace(workspace.uid)"
                  class="cursor-pointer hover:text-danger-100"
                  ><Trash2 :size="20" :stroke-width="1.75"
                /></span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="h-[300px] flex items-center justify-center flex-col text-center">
          <div class="w-[180px] mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 647.63626 632.17383"
              class="w-full"
            >
              <path
                d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
                transform="translate(-276.18187 -133.91309)"
                fill="hsl(249.64deg 70.98% 37.84% / 10%)"
              ></path>
              <path
                d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
                transform="translate(-276.18187 -133.91309)"
                fill="hsl(249.64deg 70.98% 37.84% / 10%)"
              ></path>
              <path
                d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
                transform="translate(-276.18187 -133.91309)"
                fill="#321CA4"
              ></path>
              <circle cx="190.15351" cy="24.95465" r="20" fill="#321CA4"></circle>
              <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#FFF"></circle>
              <path
                d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z"
                transform="translate(-276.18187 -133.91309)"
                fill="hsl(249.64deg 70.98% 37.84% / 10%)"
              ></path>
              <path
                d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z"
                transform="translate(-276.18187 -133.91309)"
                fill="hsl(249.64deg 70.98% 37.84% / 10%)"
              ></path>
              <path
                d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z"
                transform="translate(-276.18187 -133.91309)"
                fill="#321CA4"
              ></path>
              <circle cx="433.63626" cy="105.17383" r="20" fill="#321CA4"></circle>
              <circle cx="433.63626" cy="105.17383" r="12.18187" fill="#FFF"></circle>
            </svg>
          </div>
          <span class="text-heading-100 text-[17px] block mb-2 capitalize"
            >No Workspaces Found.</span
          >
          <span
            @click="isAddOpen = true"
            class="text-heading-100 text-[17px] capitalize font-medium hover:text-primary-100 cursor-pointer"
            >Add Workspace</span
          >
        </div>
      </div>
    </div>
  </main>
  <CreateWorkspace v-if="isAddOpen" @closeAddWorkspace="closeAddWorkspace" />
</template>

<script>
import { Plus, Trash2, CircleCheck } from 'lucide-vue-next'
import Topbar from '@/components/Topbar.vue'
import CreateWorkspace from '@/components/CreateWorkspace.vue'
import { useWorkspacesStore } from '@/stores/workspaces'
import { useLoaderStore } from '@/stores/loader'
import { useToastStore } from '@/stores/toast'
import ApiRequest from '@/libs/ApiRequest'

export default {
  components: {
    Topbar,
    Plus,
    CreateWorkspace,
    Trash2,
    CircleCheck,
  },
  setup() {
    const workspacesStore = useWorkspacesStore()
    const loaderStore = useLoaderStore()
    const toastStore = useToastStore()
    return { workspacesStore, loaderStore, toastStore }
  },
  data() {
    return {
      isAddOpen: false,
      workspaces: [],
    }
  },
  mounted() {
    this.getWorkspaces()
    window.addEventListener('workspaces', () => {
      this.getWorkspaces()
    })
  },
  methods: {
    closeAddWorkspace() {
      this.isAddOpen = false
    },
    async getWorkspaces() {
      this.loaderStore.setIsLoading(true)
      try {
        const { data } = await ApiRequest().get(`/api/v1/workspaces/list`)
        this.workspaces = data
        this.workspacesStore.setWorkspaces(data)
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    async deleteWorkspace(uid) {
      this.loaderStore.setIsLoading(true)
      try {
        const { data } = await ApiRequest().delete(`/api/v1/workspaces/delete/${uid}`)
        if (data) {
          this.toastStore.show('Workspace deleted successfully', 'success')
          this.getWorkspaces()
        }
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    async setWorkspaceAsDefault(uid) {
      this.loaderStore.setIsLoading(true)
      try {
        const { data } = await ApiRequest().get(`/api/v1/workspaces/default/${uid}`)
        this.toastStore.show('Workspace seted as default successfully', 'success')
        this.getWorkspaces()
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
  },
}
</script>
