<template>
  <Topbar :title="'Campaigns Management'">
    <RouterLink
      class="flex items-center gap-2 h-10 px-3 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
      :to="{ name: 'campaign-wizard' }"
    >
      <Plus :size="18" :stroke-width="1.75" />
      New Campaign
    </RouterLink>
  </Topbar>
  <main class="min-h-screen">
    <div class="p-6">
      <div class="rounded-xl bg-white-100 border border-border-100 overflow-hidden">
        <div class="border-b border-border-100 flex items-center p-4 space-x-8">
          <div
            v-for="tab in tabs"
            :key="tab.value"
            class="flex items-center gap-2"
            :class="[currentTab === tab.value ? 'text-primary-100 font-medium' : 'cursor-pointer']"
            @click="currentTab = tab.value"
          >
            {{ tab.label }}
          </div>
        </div>
        <div v-if="currentTab === 'active'">
          <div class="border-b border-border-100 flex items-center p-4 gap-2">
            <div class="relative flex-1">
              <i class="search-icon text-gray-400"></i>
              <input
                v-model="searchQuery"
                placeholder="Search campaigns..."
                class="border border-border-100 w-full h-11 outline-none px-4 text-heading-100 rounded-md"
              />
            </div>
            <button
              class="flex items-center h-11 gap-5 px-4 bg-primary-100 text-white-100 rounded-md leading-none transition-all duration-150 hover:brightness-125 font-medium"
              @click="toggleFilters"
            >
              <span class="flex items-center gap-2 flex-1"
                ><Filter :size="18" :stroke-width="1.75" class="mt-[1px]" /> Filters</span
              >
              <ChevronDown
                :size="18"
                :stroke-width="1.75"
                class="-mx-1 mt-[2px] transform transition-transform"
                :class="[moreFilters ? 'rotate-180' : '']"
              />
            </button>
          </div>
          <div class="p-4 grid gap-4">
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="stat in statsCards"
                :key="stat.title"
                class="border border-border-100 rounded-xl bg-white-100 p-4"
              >
                <div class="text-2xl font-bold text-heading-100 mb-1 uppercase">
                  {{ stat.value }}
                </div>
                <div class="text-[17px] capitalize">{{ stat.title }}</div>
              </div>
            </div>
            <div class="border border-border-100 rounded-xl overflow-hidden">
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
                    <tr
                      v-for="campaign in campaigns"
                      :key="campaign.id"
                      @click="viewCampaign(campaign)"
                      class="cursor-pointer hover:bg-[#F8F7FA] hover:bg-opacity-20"
                    >
                      <td class="p-3 text-left font-medium text-[15px]">{{ campaign.name }}</td>
                      <td class="p-3 text-left font-medium text-[15px]">
                        {{ formatDate(campaign.dateSent) }}
                      </td>
                      <td class="p-3 text-left font-medium text-[15px]">
                        {{ formatNumber(campaign.totalRecipients) }}
                      </td>
                      <td class="p-3 text-left font-medium text-[15px]">
                        {{ formatNumber(campaign.pickups) }}
                      </td>
                      <td class="p-3 text-left font-medium text-[15px]">
                        {{ formatNumber(campaign.successful) }}
                      </td>
                      <td class="p-3 text-left font-medium text-[15px]">
                        {{ formatNumber(campaign.totalProspects) }}
                      </td>
                      <td class="p-3 text-left font-medium text-[15px]">
                        <span
                          class="inline-flex items-center text-center h-8 px-2 text-[15px] rounded-md bg-opacity-10 capitalize text-success-100 bg-success-100"
                          >Active</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="h-[300px] flex items-center justify-center flex-col text-center">
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
              >No archived campaigns.</span
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Plus, Filter, ChevronDown } from 'lucide-vue-next'
import Topbar from '@/components/Topbar.vue'
export default {
  name: 'CampaignDashboard',
  components: {
    Topbar,
    Plus,
    Filter,
    ChevronDown,
  },
  data() {
    return {
      currentTab: 'active',
      searchQuery: '',
      tabs: [
        { value: 'active', label: 'Active' },
        { value: 'archived', label: 'Archived' },
      ],
      tableHeaders: [
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date Sent' },
        { key: 'recipients', label: 'Recipients' },
        { key: 'pickups', label: 'Pickups' },
        { key: 'successful', label: 'Successful' },
        { key: 'prospects', label: 'Prospects' },
        { key: 'status', label: 'Status' },
      ],
      campaigns: [
        {
          id: 1,
          name: 'Q1 Seller Outreach',
          dateSent: '2024-03-15',
          totalRecipients: 2500,
          pickups: 1200,
          successful: 450,
          totalProspects: 180,
        },
        {
          id: 2,
          name: 'February Buyer Follow-up',
          dateSent: '2024-02-20',
          totalRecipients: 1800,
          pickups: 950,
          successful: 320,
          totalProspects: 145,
        },
      ],
      statsCards: [
        {
          title: "Today's Calls",
          value: '247',
          iconClass: 'phone-icon text-blue-600',
        },
        {
          title: 'Lead Conversion Rate',
          value: '18.5%',
          iconClass: 'user-check-icon text-green-600',
        },
        {
          title: 'Scheduled Appointments',
          value: '12',
          iconClass: 'calendar-icon text-purple-600',
        },
      ],
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    formatNumber(number) {
      return number.toLocaleString()
    },
    toggleFilters() {
      console.log('Toggling filters')
    },
    viewCampaign(campaign) {
      this.$router.push({ name: 'campaign-details', params: { id: campaign.id } })
    },
  },
}
</script>
