<template>
  <Topbar :title="'Dashboard'"></Topbar>
  <main class="min-h-screen">
    <div class="p-6 flex flex-col gap-6">
      <div class="border border-border-100 rounded-xl bg-white-100 p-6">
        <h2 class="capitalize text-heading-100 font-bold text-3xl">
          Welcome back {{ useStore.user?.fullName }}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="inline-flex h-8 w-8">
            <path
              fill="#fac036"
              d="M39.11 79.56c-1.1 1.03-2.21-.2-2.21-.2S18.42 59.78 17.22 58.9c-1.69-1.23-5.31-3.16-8.93.57-1.51 1.55-3.97 5 .6 10.56.99 1.2 29.78 31.54 31.46 33.18 0 0 13.3 12.94 21.35 17.81 2.23 1.35 4.74 2.78 7.67 3.78 2.92 1 6.22 1.69 9.7 1.69 3.48.04 7.09-.63 10.5-1.88 3.41-1.26 6.59-3.09 9.48-5.2.71-.54 1.43-1.08 2.1-1.66l1.94-1.6a58.67 58.67 0 0 0 3.82-3.53c2.43-2.42 4.62-5.01 6.55-7.66 1.92-2.66 3.55-5.41 4.85-8.15 1.3-2.74 2.21-5.49 2.76-8.09.58-2.59.74-5.04.65-7.18-.02-2.14-.45-3.97-.8-5.43-.4-1.46-.83-2.55-1.17-3.27-.33-.72-.51-1.1-.51-1.1-.46-1.29-.9-2.52-1.29-3.63a889.622 889.622 0 0 0-4.51-12.47l.01.03c-4.85-13.17-10.06-26.74-10.06-26.74-.79-2.39-3.7-3.22-5.84-1.68-6.18 4.44-8.07 10.92-5.89 17.83l5.59 15.32c.79 1.71-1.39 3.69-2.85 2.5-4.59-3.74-14.3-14.05-14.3-14.05-4.34-4.16-28.83-29.27-30.47-30.8-3.3-3.07-7.46-4.65-10.63-2.32-3.24 2.38-4.14 6.06-1.01 10.08.85 1.09 25.6 27.24 25.6 27.24 1.44 1.51-.26 3.65-1.85 2.18 0 0-30.79-32.12-32.18-33.62-3.15-3.42-8.21-4.17-11.21-1.35-2.93 2.75-2.86 7.26.34 10.8 1.02 1.12 22.71 24.02 31.39 33.4.58.63 1.03 1.47.17 2.26-.01.01-.88.95-2-.25-2.36-2.52-25.93-27.08-27.24-28.41-3.01-3.06-7.05-4.51-10.3-1.53-2.96 2.71-3.44 7.44-.04 10.78l28.55 30.18s.93 1.1-.11 2.07z"
            ></path>
            <path
              fill="#e48c15"
              d="m85.46 54.4 2.41 2.58s-13.79 13.31-4.39 33.75c0 0 1.22 2.59-.38 3.02 0 0-1.4.78-3-3.2 0-.01-9.49-19.42 5.36-36.15z"
            ></path>
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="4"
              opacity="0.5"
              d="M63.28 10.2s5.81.88 11.19 6.64c5.38 5.77 7.87 13.18 7.87 13.18M77.44 3.5s4.87 2.45 8.63 8.5c3.76 6.05 4.67 13.05 4.67 13.05m-55.03 85.68s-5.86.39-12.35-4.09-10.52-11.18-10.52-11.18m18.69 25.1s-5.44.23-11.68-3.22-10.44-9.12-10.44-9.12"
            ></path>
          </svg>
        </h2>
        <p class="text-[17px] mt-4">
          Here’s What happening on your dashboard today. See the insights at once.
        </p>
        <div class="mt-4 flex items-center gap-2">
          <button
            @click="isAddOpen = true"
            class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
          >
            <Plus :size="18" :stroke-width="1.75" />
            Create Workspace
          </button>
          <RouterLink
            v-if="workspacesStore.workspaces.length > 0"
            :to="{ name: 'campaign-wizard' }"
            class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
          >
            <Plus :size="18" :stroke-width="1.75" />
            Create Outbound Calling Campaign
          </RouterLink>
          <button
            v-if="workspacesStore.workspaces.length > 0"
            @click="showUploadContactsModal = true"
            class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
          >
            <Upload :size="18" :stroke-width="1.75" />
            Import Contacts
          </button>
        </div>
      </div>
      <div
        v-if="workspacesStore.workspaces.length > 0"
        class="border border-border-100 rounded-xl bg-white-100"
      >
        <div class="border-b border-border-100 p-4">
          <span class="text-lg font-semibold text-heading-100">Outbound calling performance</span>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-5 gap-4">
            <div class="border border-border-100 rounded-xl bg-white-100 p-4">
              <div class="text-2xl font-bold text-heading-100 mb-1 uppercase">4200</div>
              <div class="text-[17px] capitalize">Total Calls Made</div>
            </div>
            <div class="border border-border-100 rounded-xl bg-white-100 p-4">
              <div class="text-2xl font-bold text-heading-100 mb-1 uppercase">32%</div>
              <div class="text-[17px] capitalize">Call Answer Rate</div>
            </div>
            <div class="border border-border-100 rounded-xl bg-white-100 p-4">
              <div class="text-2xl font-bold text-heading-100 mb-1 uppercase">10%</div>
              <div class="text-[17px] capitalize">Action Rate</div>
            </div>
            <div class="border border-border-100 rounded-xl bg-white-100 p-4">
              <div class="text-2xl font-bold text-heading-100 mb-1 uppercase">6%</div>
              <div class="text-[17px] capitalize">Follow-Up Conversion</div>
            </div>
            <div class="border border-border-100 rounded-xl bg-white-100 p-4">
              <div class="text-2xl font-bold text-heading-100 mb-1 uppercase">96%</div>
              <div class="text-[17px] capitalize">Compliance Rate</div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="workspacesStore.workspaces.length > 0"
        class="flex items-start justify-between gap-6"
      >
        <div class="w-[400px] h-[340px]">
          <div
            class="border border-border-100 rounded-xl bg-white-100 h-full flex flex-col justify-between"
          >
            <div class="border-b border-border-100 p-4">
              <span class="text-lg font-semibold text-heading-100">Contacts</span>
            </div>
            <div class="p-6 flex-1 flex items-center justify-center flex-col">
              <div class="text-center">
                <div class="text-2xl font-bold text-heading-100 mb-1 uppercase">
                  {{ contacts.totalElements }}
                </div>
                <div class="text-[17px] capitalize">Current Contatcs</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="border border-border-100 rounded-xl bg-white-100">
            <div class="border-b border-border-100 p-4">
              <div class="flex items-center justify-between">
                <span class="text-lg font-semibold text-heading-100">Recent campaigns</span>
                <RouterLink
                  to="/campaigns"
                  class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                >
                  <Aperture :size="18" :stroke-width="1.75" />
                  See All Campaigns
                </RouterLink>
              </div>
            </div>
            <div class="overflow-hidden">
              <div v-if="campaigns.length > 0" class="max-w-full overflow-x-auto without-scrollbar">
                <table class="w-full">
                  <thead>
                    <tr class="bg-[#F8F7FA] border-b border-border-100">
                      <th
                        class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                      >
                        Name
                      </th>
                      <th
                        class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                      >
                        Created Date
                      </th>
                      <th
                        class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                      >
                        Recipients
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border-100">
                    <tr
                      v-for="campaign in campaigns.slice(0, 5)"
                      :key="campaign.uid"
                      @click="viewCampaign(campaign.uid)"
                      class="hover:bg-[#F8F7FA] hover:bg-opacity-20 cursor-pointer"
                    >
                      <td class="p-3 text-left font-medium text-[15px]">
                        {{ campaign.name }}
                      </td>
                      <td class="p-3 text-left font-medium text-[15px]">
                        {{ formatDate(campaign.created) }}
                      </td>
                      <td class="p-3 text-left font-medium text-[15px]">
                        {{ campaign.contactNumber }}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                  >No Recent Campaigns.</span
                >
                <RouterLink
                  :to="{ name: 'campaign-wizard' }"
                  class="text-heading-100 text-[17px] capitalize font-medium hover:text-primary-100 cursor-pointer"
                  >Start New Campaign</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <UploadContacts
    v-if="showUploadContactsModal"
    @closeUploadContactsModal="closeUploadContactsModal"
    @loadContacts="loadContacts"
  />
  <CreateWorkspace v-if="isAddOpen" @closeAddWorkspace="closeAddWorkspace" />
</template>

<script>
import { Plus, Upload, Aperture, Trash2 } from 'lucide-vue-next'
import Topbar from '@/components/Topbar.vue'
import CreateWorkspace from '@/components/CreateWorkspace.vue'
import UploadContacts from '@/components/UploadContacts.vue'
import { useUserStore } from '@/stores/user'
import { useLoaderStore } from '@/stores/loader'
import { useToastStore } from '@/stores/toast'
import { useWorkspacesStore } from '@/stores/workspaces'
import ApiRequest from '@/libs/ApiRequest'
import moment from 'moment'

export default {
  components: {
    Topbar,
    Plus,
    Upload,
    Aperture,
    Trash2,
    CreateWorkspace,
    UploadContacts,
  },
  setup() {
    const useStore = useUserStore()
    const workspacesStore = useWorkspacesStore()
    const loaderStore = useLoaderStore()
    const toastStore = useToastStore()
    return { useStore, workspacesStore, loaderStore, toastStore }
  },
  data() {
    return {
      isAddOpen: false,
      showUploadContactsModal: false,
      contacts: {
        totalElements: 0,
      },
      campaigns: [],
    }
  },
  mounted() {
    this.loadContacts()
    this.getCampaigns()
  },
  methods: {
    async loadContacts() {
      this.loaderStore.setIsLoading(true)
      try {
        const { data } = await ApiRequest().get(`/api/v1/contacts/list`)
        this.contacts = data
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    closeAddWorkspace() {
      this.isAddOpen = false
    },
    closeUploadContactsModal() {
      this.showUploadContactsModal = false
    },
    async getCampaigns() {
      this.loaderStore.setIsLoading(true)
      try {
        const { data } = await ApiRequest().get(`/api/v1/compaigns/list`)
        this.campaigns = data
      } catch (e) {
        this.toastStore.show(e, 'error')
      } finally {
        this.loaderStore.setIsLoading(false)
      }
    },
    viewCampaign(uid) {
      this.$router.push({ name: 'campaign-details', params: { uid: uid } })
    },
    formatDate(value) {
      if (!value) return '-'
      return moment(value).format('MM/DD/YYYY HH:mm')
    },
  },
}
</script>
