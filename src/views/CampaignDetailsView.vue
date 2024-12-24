<template>
  <Topbar :title="'Campaign Details'"></Topbar>
  <main class="min-h-screen">
    <div class="p-6">
      <div class="rounded-xl bg-white-100 border border-border-100 overflow-hidden">
        <div class="border-b border-border-100 p-4">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-lg font-semibold text-heading-100 block">Q1 Seller Outreach</span>
              <p class="">Campaign started March 15, 2024</p>
            </div>
            <button
              class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
              @click="goBackToCampaigns"
            >
              <ArrowLeft :size="18" :stroke-width="1.75" class="mt-[2px]" />
              Back to Campaigns
            </button>
          </div>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-4 gap-4">
            <div
              class="border border-border-100 rounded-xl bg-white-100 p-4"
              v-for="stat in campaignStats"
              :key="stat.label"
            >
              <div class="text-2xl font-bold text-heading-100 mb-1 uppercase">
                {{ stat.value }}
              </div>
              <div class="text-[17px] capitalize">{{ stat.label }}</div>
            </div>
          </div>
          <div class="mt-4">
            <div class="border border-border-100 rounded-xl overflow-hidden">
              <div class="border-b border-border-100 p-4">
                <div class="flex items-center gap-2">
                  <div class="relative flex-1">
                    <input
                      v-model="searchQuery"
                      placeholder="Search contacts..."
                      class="border border-border-100 w-full h-11 outline-none px-4 text-heading-100 rounded-md"
                    />
                  </div>

                  <div class="flex-1">
                    <div class="relative flex items-center border border-border-100 rounded-md">
                      <select
                        v-model="selectedStatus"
                        class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
                      >
                        <option value="all">All Statuses</option>
                        <option value="successful">Successful</option>
                        <option value="voicemail">Voicemail</option>
                        <option value="no-answer">No Answer</option>
                        <option value="busy">Busy</option>
                      </select>
                      <span
                        class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
                      >
                        <ChevronDown :size="18" :stroke-width="1.75" />
                      </span>
                    </div>
                  </div>

                  <div class="flex-1">
                    <div class="relative flex items-center border border-border-100 rounded-md">
                      <select
                        v-model="selectedState"
                        class="w-full h-11 outline-none px-4 appearance-none cursor-pointer text-heading-100 rounded-md"
                      >
                        <option value="all">All States</option>
                        <option value="ca">California</option>
                        <option value="ny">New York</option>
                        <option value="tx">Texas</option>
                      </select>
                      <span
                        class="absolute top-0 right-0 bottom-0 w-[40px] bg-white-100 pointer-events-none flex items-center justify-center rounded-tr-md rounded-br-md"
                      >
                        <ChevronDown :size="18" :stroke-width="1.75" />
                      </span>
                    </div>
                  </div>

                  <button
                    class="flex items-center gap-2 h-11 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
                    @click="exportData"
                  >
                    <Download :size="18" :stroke-width="1.75" />
                    Export
                  </button>
                </div>
              </div>
              <div class="max-w-full overflow-x-auto without-scrollbar">
                <table class="w-full">
                  <thead>
                    <tr class="bg-[#F8F7FA] border-b border-border-100">
                      <th
                        v-for="header in tableHeaders"
                        :key="header.key"
                        class="p-3 text-left text-heading-100 text-[15px] capitalize font-semibold"
                      >
                        {{ header.label }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border-100">
                    <tr v-for="call in callHistory" :key="call.id">
                      <td class="p-3 text-left font-medium text-[15px]">
                        {{ formatTime(call.timeCalled) }}
                      </td>
                      <td class="p-3 text-left font-medium text-[15px]">{{ call.name }}</td>
                      <td class="p-3 text-left font-medium text-[15px]">{{ call.business }}</td>
                      <td class="p-3 text-left font-medium text-[15px]">{{ call.phone }}</td>
                      <td class="p-3 text-left font-medium text-[15px]">{{ call.state }}</td>
                      <td class="p-3 text-left font-medium text-[15px]">{{ call.duration }}</td>
                      <td class="p-3 text-left font-medium text-[15px]">
                        <span
                          class="inline-flex items-center text-center h-8 px-2 text-[15px] rounded-md bg-opacity-10 capitalize"
                          :class="[
                            call.status === 'Successful'
                              ? 'bg-success-100 text-success-100'
                              : 'bg-warning-100 text-warning-100',
                          ]"
                        >
                          {{ call.status }}
                        </span>
                      </td>
                      <td class="p-3 text-left font-medium text-[15px]">
                        {{ call.disconnectionReason }}
                      </td>
                      <td class="p-3 text-left font-medium text-[15px]">{{ call.callCount }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ArrowLeft, Download } from 'lucide-vue-next'
import Topbar from '@/components/Topbar.vue'
export default {
  name: 'CampaignDetails',
  components: {
    ArrowLeft,
    Download,
    Topbar,
  },
  data() {
    return {
      searchQuery: '',
      selectedStatus: 'all',
      selectedState: 'all',

      campaignStats: [
        { label: 'Total Contacts', value: '2,500' },
        { label: 'Called', value: '1,875' },
        { label: 'Successful', value: '450' },
        { label: 'Average Duration', value: '2:15' },
      ],

      tableHeaders: [
        { key: 'time', label: 'Time Called', align: 'left' },
        { key: 'name', label: 'Name', align: 'left' },
        { key: 'business', label: 'Business', align: 'left' },
        { key: 'phone', label: 'Phone', align: 'left' },
        { key: 'state', label: 'State', align: 'left' },
        { key: 'duration', label: 'Duration', align: 'center' },
        { key: 'status', label: 'Status', align: 'left' },
        { key: 'disconnection', label: 'Disconnection', align: 'left' },
        { key: 'callCount', label: 'Call Count', align: 'center' },
      ],

      callHistory: [
        {
          id: 1,
          timeCalled: '2024-03-18T14:30:00',
          name: 'John Smith',
          business: 'Smith Properties',
          phone: '(555) 123-4567',
          state: 'CA',
          duration: '2:45',
          status: 'Successful',
          disconnectionReason: 'Call Completed',
          callCount: 1,
        },
        {
          id: 2,
          timeCalled: '2024-03-18T14:35:00',
          name: 'Sarah Johnson',
          business: 'Johnson Real Estate',
          phone: '(555) 234-5678',
          state: 'NY',
          duration: '0:45',
          status: 'Voicemail',
          disconnectionReason: 'No Answer',
          callCount: 2,
        },
      ],
    }
  },

  methods: {
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString()
    },

    goBackToCampaigns() {
      // Implement navigation logic
      console.log('Navigating back to campaigns')
    },

    exportData() {
      // Implement export logic
      console.log('Exporting data')
    },
  },
}
</script>
